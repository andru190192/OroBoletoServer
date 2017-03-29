--INDEX--


--TIPOS--

DROP TYPE IF EXISTS oroticket.tipo_ciudad_origen_destino CASCADE;
DROP TYPE IF EXISTS oroticket.tipo_turno CASCADE;

CREATE TYPE oroticket.tipo_ciudad_origen_destino AS
  (nombre oroticket.nombre);

CREATE TYPE oroticket.tipo_turno AS
  (coodigo      oroticket.codigo,
   cooperativa  oroticket.nombre,
   origen       oroticket.nombre,
   destino      oroticket.nombre,
   hora_salida  oroticket.hora,
   hora_llegada oroticket.hora,
   tiempo_viaje oroticket.hora,
   paradas      oroticket.nombre,
   valor        oroticket.dinero);

ALTER TYPE oroticket.tipo_ciudad_origen_destino OWNER TO orocodigo;
ALTER TYPE oroticket.tipo_turno OWNER TO orocodigo;


--FUNCIONES--

-- DROP FUNCTION oroticket.fun_ciudad_origen();
-- DROP FUNCTION oroticket.fun_ciudad_destino(text);
-- DROP FUNCTION oroticket.fun_turno(text, text, date);

CREATE OR REPLACE FUNCTION oroticket.fun_ciudad_origen()
  RETURNS SETOF oroticket.tipo_ciudad_origen_destino AS
$BODY$
DECLARE
  cursor_ciudad_origen oroticket.tipo_ciudad_origen_destino%ROWTYPE;
BEGIN
  FOR cursor_ciudad_origen IN EXECUTE $$SELECT DISTINCT origen FROM oroticket.ruta$$
  LOOP
      RETURN NEXT cursor_ciudad_origen;
  END LOOP;
  RETURN;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION oroticket.fun_ciudad_origen() OWNER TO orocodigo;

-- SELECT * FROM oroticket.fun_ciudad_origen()


CREATE OR REPLACE FUNCTION oroticket.fun_ciudad_destino(text)
  RETURNS SETOF oroticket.tipo_ciudad_origen_destino AS
$BODY$
DECLARE
  p_origen ALIAS FOR $1;

  cursor_ciudad_destino oroticket.tipo_ciudad_origen_destino%ROWTYPE;
  sql text;
BEGIN
  sql := $$SELECT DISTINCT destino FROM oroticket.ruta WHERE origen ='$$ || p_origen || $$'$$;
  FOR cursor_ciudad_destino IN EXECUTE sql
  LOOP
      RETURN NEXT cursor_ciudad_destino;
  END LOOP;
  RETURN;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION oroticket.fun_ciudad_destino(text) OWNER TO orocodigo;

-- SELECT * FROM oroticket.fun_ciudad_destino('MACHALA')


CREATE OR REPLACE FUNCTION oroticket.fun_turno(text, text, date)
  RETURNS SETOF oroticket.tipo_turno AS
$BODY$
DECLARE
  p_origen ALIAS FOR $1;
  p_destino ALIAS FOR $2;
  p_fecha ALIAS FOR $3;

  cursor_turno oroticket.tipo_turno%ROWTYPE;
  sql text;
BEGIN
  sql := $$SELECT t.codigo, c.nombre, t.origen, t.destino,
  LPAD(EXTRACT(hour FROM t.hora_salida)::text, 2, '0') || ':' || LPAD(EXTRACT(minute FROM t.hora_salida)::text, 2, '0') as hora_salida,
  LPAD(EXTRACT(hour FROM t.hora_llegada)::text, 2, '0') || ':' || LPAD(EXTRACT(minute FROM t.hora_llegada)::text, 2, '0') as hora_llegada,
  LPAD(EXTRACT(hour FROM r.tiempo_viaje)::text, 2, '0') || ':' || LPAD(EXTRACT(minute FROM r.tiempo_viaje)::text, 2, '0') as tiempo_viaje,
  paradas, valor
  FROM oroticket.turno t
  INNER JOIN oroticket.ruta r on (t.cooperativa = r.cooperativa and t.origen = r.origen and t.destino = r.destino)
  INNER JOIN oroticket.cooperativa c on (c.codigo = t.cooperativa)
  WHERE r.origen='$$ || p_origen || $$' and r.destino='$$ || p_destino || $$'$$ ||
  CASE WHEN p_fecha = CURRENT_DATE THEN 'and t.hora_salida::time > CURRENT_TIME ' ELSE ' ' END ||
  $$ORDER BY hora_salida, tiempo_viaje;$$;
  RAISE NOTICE '%',sql;

  FOR cursor_turno IN EXECUTE sql
  LOOP
      RETURN NEXT cursor_turno;
  END LOOP;
  RETURN;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION oroticket.fun_turno(text, text, date) OWNER TO orocodigo;

-- SELECT * FROM oroticket.fun_turno('MACHALA', 'GUAYAQUIL', '2017-03-29')


--TRIGGERS--

DROP TRIGGER IF EXISTS tri_turno_llenar_codigo_hora_llegada ON oroticket.turno;
DROP TRIGGER IF EXISTS tri_ruta_actualizar_hora_llegada_turno ON oroticket.ruta;


CREATE OR REPLACE FUNCTION oroticket.tri_turno_llenar_codigo_hora_llegada()
  RETURNS trigger AS
$BODY$
DECLARE
  secuencia integer;
  tiempo_viaje timestamp without time zone;
BEGIN
  secuencia := COUNT(codigo) + 1 FROM oroticket.turno WHERE cooperativa = NEW.cooperativa AND origen = NEW.origen AND destino = NEW.destino;
  NEW.codigo := SUBSTRING(NEW.cooperativa FROM 1 FOR 1) ||
                SUBSTRING(NEW.origen FROM 1 FOR 1) ||
                SUBSTRING(NEW.destino FROM 1 FOR 1) ||
                secuencia;
  tiempo_viaje := r.tiempo_viaje FROM oroticket.ruta r WHERE r.cooperativa = NEW.cooperativa AND r.origen = NEW.origen AND r.destino = NEW.destino;
  NEW.hora_llegada := NEW.hora_salida + CAST(EXTRACT(hour FROM tiempo_viaje) || ' hour' AS interval) + CAST(EXTRACT(minute FROM tiempo_viaje) || ' minute' AS interval);
	RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
CREATE TRIGGER tri_turno_llenar_codigo_hora_llegada
  BEFORE INSERT
  ON oroticket.turno
  FOR EACH ROW
  EXECUTE PROCEDURE oroticket.tri_turno_llenar_codigo_hora_llegada();


CREATE OR REPLACE FUNCTION oroticket.tri_ruta_actualizar_hora_llegada_turno()
  RETURNS trigger AS
$BODY$
DECLARE
  secuencia integer;
  tiempo_viaje timestamp without time zone;
BEGIN
  UPDATE oroticket.turno
  SET hora_llegada = hora_salida + CAST(EXTRACT(hour FROM NEW.tiempo_viaje) || ' hour' AS interval) + CAST(EXTRACT(minute FROM NEW.tiempo_viaje) || ' minute' AS interval)
  WHERE cooperativa = NEW.cooperativa AND origen = NEW.origen AND destino = NEW.destino;
  RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
CREATE TRIGGER tri_ruta_actualizar_hora_llegada_turno
  AFTER UPDATE
  ON oroticket.ruta
  FOR EACH ROW
  EXECUTE PROCEDURE oroticket.tri_ruta_actualizar_hora_llegada_turno();
