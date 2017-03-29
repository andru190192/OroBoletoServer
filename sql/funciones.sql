--INDEX--


--TIPOS--

DROP TYPE IF EXISTS oroticket.tipo_ciudad_origen_destino CASCADE;

CREATE TYPE oroticket.tipo_ciudad_origen_destino AS
  (nombre oroticket.nombre);

ALTER TYPE oroticket.tipo_ciudad_origen_destino OWNER TO orocodigo;


--FUNCIONES--

-- DROP FUNCTION oroticket.fun_ciudad_origen();
-- DROP FUNCTION oroticket.fun_ciudad_origen();

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
