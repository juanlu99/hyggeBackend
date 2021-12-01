drop database if exists hygge;
create database hygge;

use hygge;

create table users (
idUser int unsigned auto_increment primary key,
role varchar(45) not null,
nombre varchar(45) not null,
apellidos varchar(70) not null,
documento_identificacion enum("DNI / NIF", "NIE"),
passwordHash varchar(100) not null,
verifiedAt date,
createdAt date
);

create table infoUsers (
idUser int unsigned not null,
documento_identificacion varchar(9),
foto varchar(200),
nombre_direccion varchar(100),
tipo_via varchar(100),
nombre_via varchar(100),
numero int,
piso int,
letra char,
localidad varchar(100),
codigo_postal int,
foreign key (idUser) references users(idUser)
);

create table espacios (
idEspacio int unsigned auto_increment primary key,
descripcion varchar(400),
aforo int
-- faltarian las claves foraneas de todas las tablas que saldrían de espacios
);

create table ratings (
idEspacio int unsigned not null,
idUser int unsigned not null,
puntuacion decimal(1, 1) not null,
opinion varchar(300),
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idUser) references users(idUser)
);

create table favourites (
idEspacio int unsigned not null,
idUser int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idUser) references users(idUser)
);

create table reservas (
idReserva int unsigned auto_increment primary key,
fecha date,
precio decimal(4, 2),
idUser int unsigned not null,
idEspacio int unsigned not null,
foreign key (idUser) references users(idUser),
foreign key (idEspacio) references espacios(idEspacio)
);

create table imgEspacios (
idEspacio int unsigned not null,
url varchar(200),
foreign key (idEspacio) references espacios(idEspacio)
);

create table comida_y_bebida (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table tecnología (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table en_el_espacio (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table equipamiento (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table tipos_de_eventos (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table actividades (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table tipo_de_espacio (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);