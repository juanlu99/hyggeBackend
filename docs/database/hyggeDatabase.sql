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

create table tipos_espacio (
idTipo int unsigned not null auto_increment primary key,
nombre varchar(50)
);

create table espacios_tiposEspacios (
idEspacio int unsigned not null,
idTipo int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idTipo) references tipos_espacio(idTipo)
);

create table comidas (
idComida int unsigned not null auto_increment primary key,
nombre varchar(50) not null
);

create table espacios_comidas (
idEspacio int unsigned not null,
idComida int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idComida) references comidas(idComida)
);

create table tecnologias_equipamientos (
idTecnologia int unsigned not null auto_increment primary key,
nombre varchar(50) not null 
);

create table espacios_tecnologias (
idEspacio int unsigned not null,
idTecnologia int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idTecnologia) references tecnologias_equipamientos(idTecnologia)
);

create table instalaciones (
idInstalacion int unsigned not null auto_increment primary key,
nombre varchar(50) not null
);

create table espacios_instalaciones (
idEspacio int unsigned not null,
idInstalacion int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idInstalacion) references instalaciones(idInstalacion)
);

create table tipos_eventos (
idEvento int unsigned not null auto_increment primary key,
nombre varchar(50) not null
);

create table espacios_tipoEventos (
idEspacio int unsigned not null,
idEvento int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idEvento) references tipos_eventos(idEvento)
);

create table actividades (
idActividad int unsigned not null auto_increment primary key,
nombre varchar(50) not null
);

create table espacios_actividades (
idEspacio int unsigned not null,
idActividad int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idActividad) references actividades(idActividad)
);

insert into tipos_espacio values (1, "Restaurante");
insert into tipos_espacio values (2, "Espacio Multiusos");
insert into tipos_espacio values (3, "Sala de fiesta");
insert into tipos_espacio values (4, "Casa tradicional/finca");
insert into tipos_espacio values (5, "Espacio al aire libre");
insert into tipos_espacio values (6, "Aula de formación");
insert into tipos_espacio values (7, "Barco/Catamaran");
insert into tipos_espacio values (8, "Comedor Privado");
insert into tipos_espacio values (9, "Espacio en la playa");
insert into tipos_espacio values (10, "Galería/Museo");
insert into tipos_espacio values (11, "Sala de conferencias");
insert into tipos_espacio values (12, "Salón de banquetes");
insert into tipos_espacio values (13, "Azotea/Rooftop");
insert into tipos_espacio values (14, "Casa rural");
insert into tipos_espacio values (15, "Discoteca");
insert into tipos_espacio values (16, "Espacio Industrial");
insert into tipos_espacio values (17, "Hotel");
insert into tipos_espacio values (18, "Sala de congresos");
insert into tipos_espacio values (19, "Terraza");
insert into tipos_espacio values (20, "Auditorio");
insert into tipos_espacio values (21, "Bar");
insert into tipos_espacio values (22, "Cocina");
insert into tipos_espacio values (23, "Espacio recreativo");
insert into tipos_espacio values (24, "Jardín/Patio");
insert into tipos_espacio values (25, "Sala de reuniones");
insert into tipos_espacio values (26, "Villa/Chalet");

insert into comidas values (1, "Puede llevar comida");
insert into comidas values (2, "Puede llevar alcohol");
insert into comidas values (3, "Sirven comida");
insert into comidas values (4, "Sirven alcohol");
insert into comidas values (5, "Servicio coffee break");

insert into tecnologias_equipamientos values (1, "Wi-Fi");
insert into tecnologias_equipamientos values (2, "Proyector/Pantalla");
insert into tecnologias_equipamientos values (3, "Sistema de Sonido");

insert into instalaciones values (1, "Piscina");
insert into instalaciones values (2, "Alojamiento");
insert into instalaciones values (3, "Aparcamiento");
insert into instalaciones values (4, "Acceso minusválidos");

insert into tipos_eventos values (1, "Boda");
insert into tipos_eventos values (2, "Celebración Familiar");
insert into tipos_eventos values (3, "Cena/Comida");
insert into tipos_eventos values (4, "Conferencia/Formación");
insert into tipos_eventos values (5, "Evento Corporativo");
insert into tipos_eventos values (6, "Fiesta Privada");
insert into tipos_eventos values (7, "Fiesta de Empresa");
insert into tipos_eventos values (8, "Fiesta Infantil");
insert into tipos_eventos values (9, "Reunión/Workshop");
insert into tipos_eventos values (10, "Teambuilding/Recreación");

insert into actividades values (1, "Música a todo volumen");