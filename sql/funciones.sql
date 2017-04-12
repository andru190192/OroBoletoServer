--INDEX--


--TIPOS--

DROP TYPE IF EXISTS oroticket.tipo_ciudad_origen_destino CASCADE;
DROP TYPE IF EXISTS oroticket.tipo_turno CASCADE;
DROP TYPE IF EXISTS oroticket.tipo_vehiculo_asientos CASCADE;

CREATE TYPE oroticket.tipo_ciudad_origen_destino AS
  (nombre oroticket.nombre);

CREATE TYPE oroticket.tipo_turno AS
  (codigo       oroticket.codigo,
   cooperativa  oroticket.nombre,
   url_logo     oroticket.nombre,
   hora_salida  oroticket.hora,
   hora_llegada oroticket.hora,
   tiempo_viaje oroticket.hora,
   paradas      oroticket.nombre,
   valor        oroticket.dinero,
   asientos     oroticket.asiento);

CREATE TYPE oroticket.tipo_vehiculo_asientos AS
  (placa                oroticket.placa,
   tipo                 oroticket.nombre,
   numero_asientos      oroticket.asiento,
   numero_disco         oroticket.numero_disco,
   chofer               oroticket.nombre,
   asientos_vendidos    oroticket.asiento_arr);

ALTER TYPE oroticket.tipo_ciudad_origen_destino OWNER TO orocodigo;
ALTER TYPE oroticket.tipo_turno OWNER TO orocodigo;
ALTER TYPE oroticket.tipo_vehiculo_asientos OWNER TO orocodigo;


--FUNCIONES--

-- DROP FUNCTION oroticket.fun_ciudad_origen();
-- DROP FUNCTION oroticket.fun_ciudad_destino(text);
-- DROP FUNCTION oroticket.fun_turno(text, text, date);
-- DROP FUNCTION oroticket.fun_vehiculo_asientos(text, date);
-- DROP FUNCTION oroticket.fun_forma_pago(text, integer);

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
  sql := $$SELECT t.codigo, c.nombre, c.logo,
  LPAD(EXTRACT(hour FROM t.hora_salida)::text, 2, '0') || ':' || LPAD(EXTRACT(minute FROM t.hora_salida)::text, 2, '0') AS hora_salida,
  LPAD(EXTRACT(hour FROM t.hora_llegada)::text, 2, '0') || ':' || LPAD(EXTRACT(minute FROM t.hora_llegada)::text, 2, '0') AS hora_llegada,
  LPAD(EXTRACT(hour FROM r.tiempo_viaje)::text, 2, '0') || ':' || LPAD(EXTRACT(minute FROM r.tiempo_viaje)::text, 2, '0') AS tiempo_viaje,
  paradas, valor, 0
  FROM oroticket.turno t
  INNER JOIN oroticket.ruta r on (t.cooperativa = r.cooperativa and t.origen = r.origen and t.destino = r.destino)
  INNER JOIN oroticket.cooperativa c on (c.codigo = t.cooperativa)
  WHERE r.origen='$$ || p_origen || $$' and r.destino='$$ || p_destino || $$'$$ ||
  CASE WHEN p_fecha = CURRENT_DATE THEN 'and t.hora_salida::time > CURRENT_TIME ' ELSE ' ' END ||
  $$ORDER BY hora_salida, tiempo_viaje;$$;
  RAISE NOTICE '%',sql;

  ALTER DOMAIN oroticket.asiento DROP CONSTRAINT chk_validar_asiento;
  FOR cursor_turno IN EXECUTE sql
  LOOP
      cursor_turno.asientos := v.numero_asientos - (SELECT COUNT(db.turno_vehiculo) FROM oroticket.detalle_boleto db WHERE db.turno_vehiculo = tv.id)
                                FROM oroticket.turno_vehiculo tv
                                INNER JOIN oroticket.vehiculo v ON (v.placa =  tv.placa)
                                WHERE tv.turno = cursor_turno.codigo and tv.dia_salida = p_fecha;
      cursor_turno.asientos := COALESCE(cursor_turno.asientos, 0);
      RETURN NEXT cursor_turno;
  END LOOP;
  ALTER DOMAIN oroticket.asiento ADD CONSTRAINT chk_validar_asiento CHECK (VALUE>=1 AND VALUE<=99);
  RETURN;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION oroticket.fun_turno(text, text, date) OWNER TO orocodigo;

-- SELECT * FROM oroticket.fun_turno('MACHALA', 'GUAYAQUIL', '2017-04-07')


CREATE OR REPLACE FUNCTION oroticket.fun_vehiculo_asientos(text, date)
  RETURNS SETOF oroticket.tipo_vehiculo_asientos AS
$BODY$
DECLARE
  p_turno     ALIAS FOR $1;
  p_fecha     ALIAS FOR $2;

  cursor_forma_pago oroticket.tipo_vehiculo_asientos%ROWTYPE;
  sql text;
BEGIN
  sql := $$SELECT v.*, array(SELECT numero_asiento::integer FROM oroticket.detalle_boleto db WHERE db.turno_vehiculo =  tv.id) as asientos_vendidos
  FROM oroticket.turno_vehiculo tv
  inner join oroticket.vehiculo v on (tv.placa = v.placa)
  where tv.turno='$$ || p_turno || $$' and tv.dia_salida = '$$ || p_fecha || $$';$$;
  RAISE NOTICE '%',sql;

  FOR cursor_forma_pago IN EXECUTE sql
  LOOP
      RETURN NEXT cursor_forma_pago;
  END LOOP;
  RETURN;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION oroticket.fun_vehiculo_asientos(text, date) OWNER TO orocodigo;

-- SELECT * FROM oroticket.fun_vehiculo_asientos('ORMG7', '2017-04-07')


CREATE OR REPLACE FUNCTION oroticket.fun_forma_pago(text, integer)
  RETURNS SETOF oroticket.forma_pago AS
$BODY$
DECLARE
  p_cliente     ALIAS FOR $1;
  p_forma_pago  ALIAS FOR $2;

  cursor_forma_pago oroticket.forma_pago%ROWTYPE;
  sql text;
BEGIN
  sql := $$SELECT id, cliente, tipo, nombre_tarjeta,
  SUBSTRING(numero_tarjeta FROM 1 FOR 4)||'XXXXXXXX'||SUBSTRING(numero_tarjeta FROM 13 FOR 16) as numero_tarjeta,
  'XXX' as codigo_seguridad, fecha_vencimiento, activo
  FROM oroticket.forma_pago WHERE$$ ||
  CASE WHEN p_cliente IS NOT NULL THEN $$ cliente = '$$ || p_cliente ||$$'$$ ELSE ' id = ' || p_forma_pago  END || $$;$$;
  RAISE NOTICE '%',sql;

  FOR cursor_forma_pago IN EXECUTE sql
  LOOP
      RETURN NEXT cursor_forma_pago;
  END LOOP;
  RETURN;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION oroticket.fun_forma_pago(text, integer) OWNER TO orocodigo;

-- SELECT * FROM oroticket.fun_forma_pago(null, 1)

--TRIGGERS--

DROP TRIGGER IF EXISTS tri_turno_llenar_codigo_hora_llegada ON oroticket.turno;
DROP TRIGGER IF EXISTS tri_ruta_actualizar_hora_llegada_turno ON oroticket.ruta;

-- DROP FUNCTION oroticket.tri_ruta_actualizar_hora_llegada_turno();
-- DROP FUNCTION oroticket.tri_turno_llenar_codigo_hora_llegada();

CREATE OR REPLACE FUNCTION oroticket.tri_turno_llenar_codigo_hora_llegada()
  RETURNS trigger AS
$BODY$
DECLARE
  secuencia integer;
  tiempo_viaje timestamp without time zone;
BEGIN
  IF TG_OP='INSERT' THEN
    secuencia := COUNT(codigo) + 1 FROM oroticket.turno WHERE cooperativa = NEW.cooperativa AND origen = NEW.origen AND destino = NEW.destino;
    NEW.codigo := SUBSTRING(NEW.cooperativa FROM 1 FOR 2) ||
                  SUBSTRING(NEW.origen FROM 1 FOR 1) ||
                  SUBSTRING(NEW.destino FROM 1 FOR 1) ||
                  secuencia;
  END IF;
  tiempo_viaje := r.tiempo_viaje FROM oroticket.ruta r WHERE r.cooperativa = NEW.cooperativa AND r.origen = NEW.origen AND r.destino = NEW.destino;
  NEW.hora_llegada := NEW.hora_salida + CAST(EXTRACT(hour FROM tiempo_viaje) || ' hour' AS interval) + CAST(EXTRACT(minute FROM tiempo_viaje) || ' minute' AS interval);
	RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
CREATE TRIGGER tri_turno_llenar_codigo_hora_llegada
  BEFORE INSERT OR UPDATE
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


--CHECK - UNIQUE CONSTRAINT--

ALTER TABLE oroticket.boleto DROP CONSTRAINT chk_validar_forma_pago;
ALTER DOMAIN oroticket.codigo_seguridad_tarjeta DROP CONSTRAINT chk_validar_codigo_seguridad_tarjeta;
ALTER DOMAIN oroticket.numero_tarjeta DROP CONSTRAINT chk_validar_numero_tarjeta;
ALTER DOMAIN oroticket.asiento DROP CONSTRAINT chk_validar_asiento;
ALTER DOMAIN oroticket.numero_disco DROP CONSTRAINT chk_validar_numero_disco;
ALTER DOMAIN oroticket.esta_pto_emi DROP CONSTRAINT chk_validar_esta_pto_emi;
ALTER DOMAIN oroticket.secuencia DROP CONSTRAINT chk_validar_secuencia;

ALTER TABLE oroticket.turno_vehiculo DROP CONSTRAINT uni_turno_placa_dia_salida;
ALTER TABLE oroticket.forma_pago DROP CONSTRAINT uni_cliente_numero_tarjeta;

-- DROP FUNCTION oroticket.chk_validar_forma_pago(integer, text);

CREATE OR REPLACE FUNCTION oroticket.chk_validar_forma_pago(integer, text)
  RETURNS boolean AS
$BODY$
DECLARE
  p_id        ALIAS FOR $1;
  p_cliente   ALIAS FOR $2;

  sw_forma_pago boolean;
  sql text;
BEGIN
  sql := $$SELECT CASE WHEN count(id) = 0 THEN FALSE ELSE TRUE END
  FROM oroticket.forma_pago WHERE id = $$ || p_id || $$ AND cliente='$$ || p_cliente || $$'$$;
  EXECUTE sql INTO sw_forma_pago;
  RETURN sw_forma_pago;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER TABLE oroticket.boleto ADD CONSTRAINT chk_validar_forma_pago
  CHECK (oroticket.chk_validar_forma_pago(forma_pago, cliente));

ALTER DOMAIN oroticket.codigo_seguridad_tarjeta ADD CONSTRAINT chk_validar_codigo_seguridad_tarjeta
  CHECK (LENGTH(VALUE)>=3 AND LENGTH(VALUE)<=4);

ALTER DOMAIN oroticket.numero_tarjeta ADD CONSTRAINT chk_validar_numero_tarjeta
  CHECK (LENGTH(VALUE)>=15 AND LENGTH(VALUE)<=16);

ALTER DOMAIN oroticket.asiento ADD CONSTRAINT chk_validar_asiento
  CHECK (VALUE>=1 AND VALUE<=99);

ALTER DOMAIN oroticket.numero_disco ADD CONSTRAINT chk_validar_numero_disco
  CHECK (VALUE > 0 AND VALUE<=999);

ALTER DOMAIN oroticket.esta_pto_emi ADD CONSTRAINT chk_validar_esta_pto_emi
  CHECK (VALUE >= 1 AND VALUE<=999);

ALTER DOMAIN oroticket.secuencia ADD CONSTRAINT chk_validar_secuencia
  CHECK (VALUE >= 1 AND VALUE<=999999999);


ALTER TABLE oroticket.turno_vehiculo ADD CONSTRAINT uni_turno_placa_dia_salida UNIQUE (turno, placa, dia_salida);
ALTER TABLE oroticket.forma_pago ADD CONSTRAINT uni_cliente_numero_tarjeta UNIQUE (cliente, numero_tarjeta);
