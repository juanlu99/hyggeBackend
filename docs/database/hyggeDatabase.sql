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
createdAt date,
modifiedAt date,
foto varchar(200),
nombre_direccion varchar(100),
tipo_via varchar(100),
nombre_via varchar(100),
numero int,
piso int,
letra char,
localidad varchar(100),
codigo_postal int
);

create table espacios (
idEspacio int unsigned auto_increment primary key,
descripcion varchar(400),
aforo int,
ciudad varchar(50),
direccion varchar(200),
codigo_postal int
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
aceptada boolean,
foreign key (idUser) references users(idUser),
foreign key (idEspacio) references espacios(idEspacio)
);

create table imgEspacios (
idEspacio int unsigned not null,
nombre varchar(200),
foreign key (idEspacio) references espacios(idEspacio)
);

create table comidas (
idComida int unsigned not null primary key
);

create table espacios_comidas (
idEspacio int unsigned not null,
idComida int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idComida) references comidas(idComida)
);

create table tecnologias (
idTecnologia int unsigned not null primary key
);

create table espacios_tecnologias (
idEspacio int unsigned not null,
idTecnologia int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idTecnologia) references tecnologias(idTecnologia)
);

create table instalaciones (
idInstalacion int unsigned not null primary key
);

create table espacios_instalaciones (
idEspacio int unsigned not null,
idInstalacion int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idInstalacion) references instalaciones(idInstalacion)
);

create table equipamientos (
idEquipamiento int unsigned not null primary key
);

create table espacios_equipamientos (
idEspacio int unsigned not null,
idEquipamiento int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idEquipamiento) references equipamientos(idEquipamiento)
);

create table tipos_eventos (
idEvento int unsigned not null primary key
);

create table espacios_tipoEventos (
idEspacio int unsigned not null,
idEvento int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idEvento) references tipos_eventos(idEvento)
);

create table actividades (
idActividad int unsigned not null primary key
);

create table espacios_actividades (
idEspacio int unsigned not null,
idActividad int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idActividad) references actividades(idActividad)
);
