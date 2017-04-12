/* DROP CONSTRAINT - TABLE - DATABASE - ROLE

ALTER TABLE oroticket.boleto 					DROP CONSTRAINT boleto_cliente_pfk;
ALTER TABLE oroticket.boleto 					DROP CONSTRAINT boleto_forma_pago_fk;
ALTER TABLE oroticket.detalle_boleto 	DROP CONSTRAINT detalle_boleto_turno_vehiculo_pfk;
ALTER TABLE oroticket.detalle_boleto 	DROP CONSTRAINT detalle_boleto_numero_factura_cliente_pfk;
ALTER TABLE oroticket.forma_pago 			DROP CONSTRAINT forma_pago_cliente_fk;
ALTER TABLE oroticket.rol_usuario 		DROP CONSTRAINT rol_usuario_rol_pfk;
ALTER TABLE oroticket.rol_usuario 		DROP CONSTRAINT rol_usuario_usuario_pfk;
ALTER TABLE oroticket.ruta 						DROP CONSTRAINT ruta_cooperativa_pfk;
ALTER TABLE oroticket.turno 					DROP CONSTRAINT turno_cooperativa_origen_destino_fk;
ALTER TABLE oroticket.turno_vehiculo 	DROP CONSTRAINT turno_vehiculo_placa_pfk;
ALTER TABLE oroticket.turno_vehiculo 	DROP CONSTRAINT turno_vehiculo_turno_pfk;
ALTER TABLE oroticket.vehiculo 				DROP CONSTRAINT vehiculo_chofer_pfk;

ALTER TABLE oroticket.bitacora 				DROP CONSTRAINT bitacora_id_pk;
ALTER TABLE oroticket.boleto 					DROP CONSTRAINT boleto_numero_factura_cliente_pk;
ALTER TABLE oroticket.cooperativa 		DROP CONSTRAINT cooperativa_codigo_pk;
ALTER TABLE oroticket.detalle_boleto 	DROP CONSTRAINT detalle_boleto_num_fac_cli_turno_vehi_num_asien_pk;
ALTER TABLE oroticket.forma_pago 			DROP CONSTRAINT forma_pago_id_pk;
ALTER TABLE oroticket.parametro 			DROP CONSTRAINT parametro_id_pk;
ALTER TABLE oroticket.persona 				DROP CONSTRAINT persona_cedula_ruc_pk;
ALTER TABLE oroticket.roles 					DROP CONSTRAINT roles_rol_pk;
ALTER TABLE oroticket.rol_usuario 		DROP CONSTRAINT rol_usuario_rol_usuario_pk;
ALTER TABLE oroticket.ruta 						DROP CONSTRAINT ruta_cooperativa_origen_destino_pk;
ALTER TABLE oroticket.turno 					DROP CONSTRAINT turno_codigo_pk;
ALTER TABLE oroticket.turno_vehiculo 	DROP CONSTRAINT turno_vehiculo_id_pk;
ALTER TABLE oroticket.vehiculo 				DROP CONSTRAINT vehiculo_placa_pk;

DROP TABLE oroticket.bitacora;
DROP TABLE oroticket.boleto;
DROP TABLE oroticket.cooperativa;
DROP TABLE oroticket.detalle_boleto;
DROP TABLE oroticket.forma_pago;
DROP TABLE oroticket.parametro;
DROP TABLE oroticket.persona;
DROP TABLE oroticket.roles;
DROP TABLE oroticket.rol_usuario;
DROP TABLE oroticket.ruta;
DROP TABLE oroticket.turno;
DROP TABLE oroticket.turno_vehiculo;
DROP TABLE oroticket.vehiculo;

DROP DOMAIN oroticket.asiento;
DROP DOMAIN oroticket.asiento_arr;
DROP DOMAIN oroticket.cedula_ruc;
DROP DOMAIN oroticket.codigo;
DROP DOMAIN oroticket.codigo_seguridad_tarjeta;
DROP DOMAIN oroticket.dinero;
DROP DOMAIN oroticket.direccion;
DROP DOMAIN oroticket.email;
DROP DOMAIN oroticket.estado;
DROP DOMAIN oroticket.esta_pto_emi;
DROP DOMAIN oroticket.fecha;
DROP DOMAIN oroticket.hora;
DROP DOMAIN oroticket.nombre;
DROP DOMAIN oroticket.nombre_apellido;
DROP DOMAIN oroticket.numero_disco;
DROP DOMAIN oroticket.numero_factura;
DROP DOMAIN oroticket.numero_tarjeta;
DROP DOMAIN oroticket.placa;
DROP DOMAIN oroticket.rol;
DROP DOMAIN oroticket.secuencia;
DROP DOMAIN oroticket.telefono;
DROP DOMAIN oroticket.tipo_forma_pago;
DROP DOMAIN oroticket.usuario;

DROP SCHEMA oroticket;
DROP DATABASE oroticket;
DROP ROLE orocodigo;
*/

--ROL - BASE DE DATOS - ESQUEMA--
/*
CREATE ROLE orocodigo LOGIN PASSWORD '$$0r0c0d1g0$$'
	SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION;

CREATE DATABASE oroticket
	WITH OWNER = orocodigo
    	ENCODING ='UTF8'
       	TABLESPACE = pg_default
       	LC_COLLATE = 'Spanish_Ecuador.1252'
       	LC_CTYPE = 'Spanish_Ecuador.1252'
       	CONNECTION LIMIT = -1;
*/
CREATE SCHEMA oroticket AUTHORIZATION orocodigo;

--DOMINIOS--

CREATE DOMAIN oroticket.asiento 									AS integer;
CREATE DOMAIN oroticket.asiento_arr 							AS integer[];
CREATE DOMAIN oroticket.cedula_ruc 								AS character varying(13);
CREATE DOMAIN oroticket.codigo 										AS character varying(5);
CREATE DOMAIN oroticket.codigo_seguridad_tarjeta 	AS character varying(4);
CREATE DOMAIN oroticket.dinero 										AS numeric(9,2);
CREATE DOMAIN oroticket.direccion 								AS character varying(300);
CREATE DOMAIN oroticket.email 										AS character varying(50);
CREATE DOMAIN oroticket.estado 										AS boolean					 						DEFAULT true;
CREATE DOMAIN oroticket.esta_pto_emi 							AS integer;
CREATE DOMAIN oroticket.fecha 										AS timestamp without time zone;
CREATE DOMAIN oroticket.hora 											AS character varying(5);
CREATE DOMAIN oroticket.nombre 										AS character varying(300);
CREATE DOMAIN oroticket.nombre_apellido 					AS character varying(150);
CREATE DOMAIN oroticket.numero_factura 						AS character varying(17);
CREATE DOMAIN oroticket.numero_disco 							AS integer;
CREATE DOMAIN oroticket.numero_tarjeta 						AS character varying(16);
CREATE DOMAIN oroticket.placa 										AS character varying(9);
CREATE DOMAIN oroticket.rol 											AS character varying(6);
CREATE DOMAIN oroticket.secuencia 								AS integer;
CREATE DOMAIN oroticket.telefono 									AS character varying(10);
CREATE DOMAIN oroticket.tipo_forma_pago			 			AS character varying(2)					DEFAULT 'TC';
CREATE DOMAIN oroticket.usuario 									AS character varying(30);

ALTER DOMAIN oroticket.asiento 										OWNER TO orocodigo;
ALTER DOMAIN oroticket.asiento_arr 								OWNER TO orocodigo;
ALTER DOMAIN oroticket.cedula_ruc 								OWNER TO orocodigo;
ALTER DOMAIN oroticket.codigo 										OWNER TO orocodigo;
ALTER DOMAIN oroticket.codigo_seguridad_tarjeta 	OWNER TO orocodigo;
ALTER DOMAIN oroticket.dinero 										OWNER TO orocodigo;
ALTER DOMAIN oroticket.direccion 									OWNER TO orocodigo;
ALTER DOMAIN oroticket.email 											OWNER TO orocodigo;
ALTER DOMAIN oroticket.estado 										OWNER TO orocodigo;
ALTER DOMAIN oroticket.esta_pto_emi 							OWNER TO orocodigo;
ALTER DOMAIN oroticket.fecha 											OWNER TO orocodigo;
ALTER DOMAIN oroticket.hora 											OWNER TO orocodigo;
ALTER DOMAIN oroticket.nombre 										OWNER TO orocodigo;
ALTER DOMAIN oroticket.nombre_apellido				 		OWNER TO orocodigo;
ALTER DOMAIN oroticket.numero_disco 							OWNER TO orocodigo;
ALTER DOMAIN oroticket.numero_factura 						OWNER TO orocodigo;
ALTER DOMAIN oroticket.numero_tarjeta 						OWNER TO orocodigo;
ALTER DOMAIN oroticket.placa 											OWNER TO orocodigo;
ALTER DOMAIN oroticket.rol 												OWNER TO orocodigo;
ALTER DOMAIN oroticket.secuencia 									OWNER TO orocodigo;
ALTER DOMAIN oroticket.telefono 									OWNER TO orocodigo;
ALTER DOMAIN oroticket.tipo_forma_pago				 		OWNER TO orocodigo;
ALTER DOMAIN oroticket.usuario 										OWNER TO orocodigo;


--TABLAS--

CREATE TABLE oroticket.parametro(
	id		 									Serial					  			NOT NULL,
	ruc 										oroticket.cedula_ruc 		NOT NULL,
	nombre 									oroticket.nombre 				NOT NULL,
	gerente 								oroticket.nombre 				NOT NULL,
	telefono_matriz 				oroticket.telefono			NOT NULL,
	direccion_matriz 				oroticket.nombre				NOT NULL,
	correo 									oroticket.email					NOT NULL,
	clave_correo  					oroticket.nombre				NOT NULL,
	firma 									oroticket.nombre				NOT NULL,
	clave_firma 						oroticket.nombre				NOT NULL,
	ambiente_sri_produccion	oroticket.estado				NOT NULL,
	logo 										oroticket.nombre				NOT NULL,
	nombre_ride 						oroticket.nombre				NOT NULL,
	establecimiento 				oroticket.esta_pto_emi	NOT NULL,
	pto_emision 						oroticket.esta_pto_emi	NOT NULL,
	secuencia 							oroticket.secuencia     NOT NULL,
	ganacia 								oroticket.dinero		    NOT NULL,
	comision_fija 					oroticket.dinero		    NOT NULL,
	comision_porcentaje 		oroticket.dinero		    NOT NULL,
	iva 										oroticket.dinero		    NOT NULL
);

CREATE TABLE oroticket.cooperativa(
	codigo 						oroticket.codigo 				NOT NULL,
	ruc 							oroticket.cedula_ruc 		NOT NULL,
	nombre 						oroticket.nombre 				NOT NULL,
	gerente 					oroticket.nombre 				NOT NULL,
	telefono_matriz 	oroticket.telefono			NOT NULL,
	direccion_matriz 	oroticket.nombre				NOT NULL,
	correo 						oroticket.email					NOT NULL,
	clave_correo  		oroticket.nombre				NOT NULL,
	firma 						oroticket.nombre				NOT NULL,
	clave_firma 			oroticket.nombre				NOT NULL,
	logo 							oroticket.nombre				NOT NULL,
	nombre_ride 			oroticket.nombre				NOT NULL,
	establecimiento 	oroticket.esta_pto_emi	NOT NULL,
	pto_emision 			oroticket.esta_pto_emi	NOT NULL,
	secuencia 				oroticket.secuencia     NOT NULL
);

CREATE TABLE oroticket.ruta(
	cooperativa 	oroticket.codigo 	NOT NULL,
	origen 				oroticket.nombre 	NOT NULL,
	destino 			oroticket.nombre 	NOT NULL,
	tiempo_viaje 	oroticket.fecha,
	paradas 			oroticket.nombre,
	valor 			  oroticket.dinero 	NOT NULL
);

CREATE TABLE oroticket.turno(
	codigo 			 oroticket.codigo  NOT NULL,
	cooperativa  oroticket.codigo  NOT NULL,
	origen 			 oroticket.nombre  NOT NULL,
	destino 		 oroticket.nombre  NOT NULL,
	hora_salida  oroticket.fecha 	 NOT NULL,
	hora_llegada oroticket.fecha 	 NOT NULL
);

CREATE TABLE oroticket.vehiculo(
	placa 			     oroticket.placa 			    NOT NULL,
	tipo 			       oroticket.nombre,
	numero_asientos  oroticket.asiento   			NOT NULL,
	numero_disco 	   oroticket.numero_disco		NOT NULL,
	chofer 			     oroticket.cedula_ruc 		NOT NULL
);

CREATE TABLE oroticket.turno_vehiculo(
	id		 			Serial					  NOT NULL,
	turno 		  oroticket.codigo 	NOT NULL,
	placa 	  	oroticket.placa 	NOT NULL,
	dia_salida 	oroticket.fecha 	NOT NULL
);

CREATE TABLE oroticket.detalle_boleto(
	numero_factura 	oroticket.numero_factura 	NOT NULL,
	cliente 	    	oroticket.cedula_ruc   		NOT NULL,
	turno_vehiculo 	Integer 							    NOT NULL,
	numero_asiento 	oroticket.asiento 			  NOT NULL,
	valor 			    oroticket.dinero 			    NOT NULL
);

CREATE TABLE oroticket.persona(
	cedula_ruc 	oroticket.cedula_ruc 		    NOT NULL,
	usuario 	  oroticket.usuario 			    NOT NULL,
	nombre 		  oroticket.nombre_apellido	  NOT NULL,
	apellido 	  oroticket.nombre_apellido 	NOT NULL,
	direccion 	oroticket.direccion,
	email 		  oroticket.email 			      NOT NULL,
	telefono 	  oroticket.telefono 		      NOT NULL,
	ciudad 		  oroticket.nombre
);

CREATE TABLE oroticket.boleto(
	numero_factura 	 oroticket.numero_factura 	NOT NULL,
	cliente 		     oroticket.cedula_ruc 		  NOT NULL,
	valor 			     oroticket.dinero 			    NOT NULL,
	forma_pago 		   Integer 				            NOT NULL
);

CREATE TABLE oroticket.forma_pago(
	id 					       Serial 								             NOT NULL,
	cliente 			     oroticket.cedula_ruc 					     NOT NULL,
	tipo 				       oroticket.tipo_forma_pago 				   NOT NULL,
	nombre_tarjeta 		 oroticket.nombre,
	numero_tarjeta 		 oroticket.numero_tarjeta,
	codigo_seguridad 	 oroticket.codigo_seguridad_tarjeta,
	fecha_vencimiento  oroticket.fecha,
	activo 				     oroticket.estado 						       NOT NULL
);

CREATE TABLE oroticket.roles(
	rol 		 oroticket.rol   		NOT NULL,
	detalle  oroticket.nombre 	NOT NULL
);

CREATE TABLE oroticket.rol_usuario(
	rol  	  oroticket.rol   			NOT NULL,
	usuario oroticket.cedula_ruc 	NOT NULL,
	activo 	oroticket.estado  		NOT NULL
);

CREATE TABLE oroticket.bitacora(
	id   		Serial 			      NOT NULL,
	detalle oroticket.nombre 	NOT NULL
);


--CONSTRAINT--

ALTER TABLE oroticket.bitacora 	    	ADD CONSTRAINT bitacora_id_pk 										                  PRIMARY KEY (id);
ALTER TABLE oroticket.boleto 			    ADD CONSTRAINT boleto_numero_factura_cliente_pk 					          PRIMARY KEY (numero_factura, cliente);
ALTER TABLE oroticket.cooperativa 		ADD CONSTRAINT cooperativa_codigo_pk 								                PRIMARY KEY (codigo);
ALTER TABLE oroticket.detalle_boleto 	ADD CONSTRAINT detalle_boleto_num_fac_cli_turno_vehi_num_asien_pk 	PRIMARY KEY (numero_factura, cliente, turno_vehiculo, numero_asiento);
ALTER TABLE oroticket.forma_pago 		  ADD CONSTRAINT forma_pago_id_pk 									                  PRIMARY KEY (id);
ALTER TABLE oroticket.parametro 		  ADD CONSTRAINT parametro_id_pk 								          			      PRIMARY KEY (id);
ALTER TABLE oroticket.persona 			  ADD CONSTRAINT persona_cedula_ruc_pk 								                PRIMARY KEY (cedula_ruc);
ALTER TABLE oroticket.roles 			    ADD CONSTRAINT roles_rol_pk 										                    PRIMARY KEY (rol);
ALTER TABLE oroticket.rol_usuario 		ADD CONSTRAINT rol_usuario_rol_usuario_pk 							            PRIMARY KEY (rol, usuario);
ALTER TABLE oroticket.ruta 			      ADD CONSTRAINT ruta_cooperativa_origen_destino_pk 					        PRIMARY KEY (cooperativa, origen, destino);
ALTER TABLE oroticket.turno 			    ADD CONSTRAINT turno_codigo_pk 										                  PRIMARY KEY (codigo);
ALTER TABLE oroticket.turno_vehiculo 	ADD CONSTRAINT turno_vehiculo_id_pk 											      		PRIMARY KEY (id);
ALTER TABLE oroticket.vehiculo 		    ADD CONSTRAINT vehiculo_placa_pk 									                  PRIMARY KEY (placa);

ALTER TABLE oroticket.boleto 			    ADD CONSTRAINT boleto_cliente_pfk 							          FOREIGN KEY (cliente) 						          REFERENCES oroticket.persona (cedula_ruc) 					    			  MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.boleto 			    ADD CONSTRAINT boleto_forma_pago_fk 						          FOREIGN KEY (forma_pago) 					          REFERENCES oroticket.forma_pago (id) 						        			  MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.detalle_boleto 	ADD CONSTRAINT detalle_boleto_turno_vehiculo_pfk 					FOREIGN KEY (turno_vehiculo) 								REFERENCES oroticket.turno_vehiculo (id) 									 			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.detalle_boleto 	ADD CONSTRAINT detalle_boleto_numero_factura_cliente_pfk 	FOREIGN KEY (numero_factura, cliente) 		  REFERENCES oroticket.boleto (numero_factura, cliente)     			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.forma_pago 		  ADD CONSTRAINT forma_pago_cliente_fk          						FOREIGN KEY (cliente) 						          REFERENCES oroticket.persona (cedula_ruc) 					      			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.rol_usuario 		ADD CONSTRAINT rol_usuario_rol_pfk 						           	FOREIGN KEY (rol) 							            REFERENCES oroticket.roles (rol) 							            			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.rol_usuario 		ADD CONSTRAINT rol_usuario_usuario_pfk 						        FOREIGN KEY (usuario) 						          REFERENCES oroticket.persona (cedula_ruc) 					      			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.ruta 			      ADD CONSTRAINT ruta_cooperativa_pfk 						          FOREIGN KEY (cooperativa) 				        	REFERENCES oroticket.cooperativa (codigo)					        			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.turno 			    ADD CONSTRAINT turno_cooperativa_origen_destino_fk			  FOREIGN KEY (cooperativa, origen, destino) 	REFERENCES oroticket.ruta (cooperativa, origen, destino)  			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.turno_vehiculo 	ADD CONSTRAINT turno_vehiculo_placa_pfk 					        FOREIGN KEY (placa) 						            REFERENCES oroticket.vehiculo (placa) 						        			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.turno_vehiculo 	ADD CONSTRAINT turno_vehiculo_turno_pfk 					        FOREIGN KEY (turno) 						            REFERENCES oroticket.turno (codigo) 						          			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;
ALTER TABLE oroticket.vehiculo 		    ADD CONSTRAINT vehiculo_chofer_pfk 							          FOREIGN KEY (chofer) 						            REFERENCES oroticket.persona (cedula_ruc) 					      			MATCH FULL  ON UPDATE CASCADE  ON DELETE NO ACTION;

ALTER TABLE oroticket.bitacora 		    OWNER TO orocodigo;
ALTER TABLE oroticket.boleto 			    OWNER TO orocodigo;
ALTER TABLE oroticket.cooperativa 		OWNER TO orocodigo;
ALTER TABLE oroticket.detalle_boleto 	OWNER TO orocodigo;
ALTER TABLE oroticket.forma_pago 		  OWNER TO orocodigo;
ALTER TABLE oroticket.parametro 		  OWNER TO orocodigo;
ALTER TABLE oroticket.persona 			  OWNER TO orocodigo;
ALTER TABLE oroticket.roles 			    OWNER TO orocodigo;
ALTER TABLE oroticket.rol_usuario 		OWNER TO orocodigo;
ALTER TABLE oroticket.ruta 			      OWNER TO orocodigo;
ALTER TABLE oroticket.turno 			    OWNER TO orocodigo;
ALTER TABLE oroticket.turno_vehiculo 	OWNER TO orocodigo;
ALTER TABLE oroticket.vehiculo    		OWNER TO orocodigo;
