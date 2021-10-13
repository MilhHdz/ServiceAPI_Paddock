CREATE DATABASE paddockdb;

USE paddockdb;

CREATE TABLE armadora (
	id int NOT NULL AUTO_INCREMENT,
	clave varchar (100) NOT NULL,
	nombre varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE categoria (
	id int NOT NULL AUTO_INCREMENT,
	nombre varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE descripcion (
	id int NOT NULL AUTO_INCREMENT,
	clave varchar (100) NOT NULL,
	nombre varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE linea (
	id int NOT NULL AUTO_INCREMENT,
	clave varchar (100) NOT NULL,
	nombre varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE modelo (
	id int NOT NULL AUTO_INCREMENT,
	clave varchar (100) NOT NULL,
	nombre varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE tipo_de_producto (
	id int NOT NULL AUTO_INCREMENT,
	clave varchar (100) NOT NULL,
	nombre varchar(100) NOT NULL,
	clave_sat varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE unidad_de_medida(
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(300) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE metodo_de_pago (
	id int NOT NULL AUTO_INCREMENT,
	nombre varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE sucursal (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR (100) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE cliente1 (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	ape_pat VARCHAR(100) NOT NULL,
	ape_mat VARCHAR(100) NOT NULL,
	correo VARCHAR(200) NOT NULL,
	telefono VARCHAR(14) NOT NULL,
    razon_social VARCHAR(300),
    rfc VARCHAR(15),
    calle VARCHAR(300),
    num_ext VARCHAR(5),
    num_int VARCHAR(5),
    colonia VARCHAR(300),
    municipio VARCHAR(300),
    estado VARCHAR(300),
    cp VARCHAR(5),
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE cliente2 (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	ape_pat VARCHAR(100) NOT NULL,
	ape_mat VARCHAR(100) NOT NULL,
	correo VARCHAR(200) NOT NULL,
	telefono VARCHAR(14) NOT NULL,
    razon_social VARCHAR(300),
    rfc VARCHAR(15),
    calle VARCHAR(300),
    num_ext VARCHAR(5),
    num_int VARCHAR(5),
    colonia VARCHAR(300),
    municipio VARCHAR(300),
    estado VARCHAR(300),
    cp VARCHAR(5),
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE cotizacion1 (
	id INT NOT NULL AUTO_INCREMENT,
	creado DATETIME DEFAULT NOW(),
	id_vendedor INT NOT NULL,
	id_cliente INT NOT NULL,
	descuento VARCHAR(10) DEFAULT '0$',
	vendido BOOL DEFAULT 0,
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE cotizacion2 (
	id INT NOT NULL AUTO_INCREMENT,
	creado DATETIME DEFAULT NOW(),
	id_vendedor INT NOT NULL,
	id_cliente INT NOT NULL,
	descuento VARCHAR(10) DEFAULT '0$',
	vendido BOOL DEFAULT 0,
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE factura1 (
	id INT NOT NULL AUTO_INCREMENT,
	registrado DATETIME DEFAULT NOW(),
    id_proveedor INT,
	folio VARCHAR(20),
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE factura2 (
	id INT NOT NULL AUTO_INCREMENT,
	registrado DATETIME DEFAULT NOW(),
    id_proveedor INT,
	folio VARCHAR(20),
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE producto_cotizado1 (
	id INT NOT NULL AUTO_INCREMENT,
	id_cotizacion INT NOT NULL,
	id_producto INT NOT NULL,
    precio VARCHAR(10) NOT NULL,
	cantidad VARCHAR(20) DEFAULT '1',
    descuento VARCHAR(10) DEFAULT '0$',
    costo VARCHAR(20),
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE producto_cotizado2 (
	id INT NOT NULL AUTO_INCREMENT,
	id_cotizacion INT NOT NULL,
	id_producto INT NOT NULL,
    precio VARCHAR(10) NOT NULL,
	cantidad VARCHAR(20) DEFAULT '1',
    descuento VARCHAR(10) DEFAULT '0$',
    costo VARCHAR(20),
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE producto_vendido1 (
	id INT NOT NULL AUTO_INCREMENT,
	id_venta INT NOT NULL,
	id_producto INT NOT NULL,
    precio VARCHAR(10) NOT NULL,
	cantidad VARCHAR(20) DEFAULT '1',
	descuento VARCHAR(10) DEFAULT '0$',
    costo VARCHAR(20),
	cancelado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE producto_vendido2 (
	id INT NOT NULL AUTO_INCREMENT,
	id_venta INT NOT NULL,
	id_producto INT NOT NULL,
    precio VARCHAR(10) NOT NULL,
	cantidad VARCHAR(20) DEFAULT '1',
	descuento VARCHAR(10) DEFAULT '0$',
    costo VARCHAR(20),
	cancelado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE venta1 (
	id INT NOT NULL AUTO_INCREMENT,
    id_cotizacion INT,
	id_cliente INT NOT NULL,
	id_vendedor INT NOT NULL,
	id_metodo_pago INT NOT NULL,
	descuento VARCHAR(10) DEFAULT '0$',
	subtotal VARCHAR(20) NOT NULL,
	total VARCHAR(20) NOT NULL,
	dinero_recivido VARCHAR(20) DEFAULT '0',
	cambio VARCHAR(20) DEFAULT '0',
	creado DATETIME DEFAULT NOW(),
	cancelado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE venta2 (
	id INT NOT NULL AUTO_INCREMENT,
    id_cotizacion INT,
	id_cliente INT NOT NULL,
	id_vendedor INT NOT NULL,
	id_metodo_pago INT NOT NULL,
	descuento VARCHAR(10) DEFAULT '0$',
	subtotal VARCHAR(20) NOT NULL,
	total VARCHAR(20) NOT NULL,
	dinero_recivido VARCHAR(20) DEFAULT '0',
	cambio VARCHAR(20) DEFAULT '0',
	creado DATETIME DEFAULT NOW(),
	cancelado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);


CREATE TABLE producto1 (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(250) NOT NULL,
	unidad_de_medida VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	tipo_de_producto VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	clave_sat VARCHAR(50) DEFAULT '0000000000',
	linea VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	categoria VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	parte VARCHAR(50) DEFAULT 'NO HAY REFERENCIA',
	precio VARCHAR(10) NOT NULL,
	cantidad VARCHAR(10) NOT NULL,
	proveedor VARCHAR(250) DEFAULT 'NO HAY REFERENCIA',
	factura VARCHAR(20) DEFAULT 'NO HAY REFERENCIA',
	PRIMARY KEY (id)
);


CREATE TABLE producto2 (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(250) NOT NULL,
	unidad_de_medida VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	tipo_de_producto VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	clave_sat VARCHAR(50) DEFAULT '0000000000',
	linea VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	categoria VARCHAR(100) DEFAULT 'NO HAY REFERENCIA',
	parte VARCHAR(50) DEFAULT 'NO HAY REFERENCIA',
	precio VARCHAR(10) NOT NULL,
	cantidad VARCHAR(10) NOT NULL,
	proveedor VARCHAR(250) DEFAULT 'NO HAY REFERENCIA',
	factura VARCHAR(20) DEFAULT 'NO HAY REFERENCIA',
	PRIMARY KEY (id)
);


CREATE TABLE proveedor1(
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(300) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE proveedor2(
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(300) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE rol(
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(60) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE vendedor(
	id INT NOT NULL AUTO_INCREMENT,
	creado DATETIME DEFAULT NOW(),
	nombre VARCHAR(60) NOT NULL,
	ape_pat VARCHAR(60) NOT NULL,
	ape_mat VARCHAR(60) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	correo VARCHAR(200),
    contraseña VARCHAR(200) NOT NULL,
    id_sucursal INT NOT NULL,
    id_rol INT NOT NULL,
	eliminado BOOL DEFAULT 0,
	PRIMARY KEY (id)
);



CREATE TABLE tranferencia(
	id INT NOT NULL AUTO_INCREMENT,
	creado DATETIME DEFAULT NOW(),
    de_id_sucursal INT NOT NULL,
	nombre_producto VARCHAR(60) NOT NULL,
	para_id_sucursal INT NOT NULL,
	cantidad VARCHAR(60) NOT NULL,
	PRIMARY KEY (id)
);