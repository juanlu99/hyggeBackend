drop database if exists hygge;
create database hygge;

use hygge;

create table addresses  (
idAddress int unsigned auto_increment primary key,
province varchar(100),
type_street varchar(100),
name_street varchar(100),
number int,
floor int,
letter char,
zip_code int
);

create table users (
idUser int unsigned auto_increment primary key,
role enum("Admin", "User") not null,
email varchar(100) not null,
name varchar(45) not null,
surname varchar(70),
id_document enum("DNI / NIF", "NIE"),
password varchar(100) not null,
verificationCode varchar(100) not null,
createdAt date not null,
verifiedAt date,
modifiedAt date,
idAddress int unsigned,
profile_image varchar(200),
foreign key (idAddress) references addresses(idAddress)
);

create table spaces (
idSpace int unsigned auto_increment primary key,
description varchar(400),
capacity int,
diary_price decimal(4, 2),
idAddress int unsigned,
foreign key (idAddress) references addresses(idAddress)
);

create table bookings (
idBooking int unsigned auto_increment primary key,
dateStart date,
dateEnd date,
idUser int unsigned not null,
idSpace int unsigned not null,
aceptada boolean,
foreign key (idUser) references users(idUser),
foreign key (idSpace) references spaces(idSpace)
);

create table ratings (
idRating int unsigned auto_increment primary key,
idSpace int unsigned not null,
idUser int unsigned not null,
idBooking int unsigned not null,
score int not null,
opinion varchar(300),
createdAt date not null,
unique(idUser, idSpace, idBooking
),
foreign key (idSpace) references spaces(idSpace),
foreign key (idUser) references users(idUser),
foreign key (idBooking) references bookings(idBooking)
);

create table flags (
idRating int unsigned not null,
idUser int unsigned not null,
reason varchar(200) not null,
createdAt date not null,
unique(idRating, idUser),
foreign key (idRating) references ratings(idRating),
foreign key (idUser) references users(idUser)
);

create table favourites (
idSpace int unsigned not null,
idUser int unsigned not null,
unique(idSpace, idUser),
foreign key (idSpace) references spaces(idSpace),
foreign key (idUser) references users(idUser)
);

create table imgspaces (
idImage int unsigned auto_increment primary key,
idSpace int unsigned not null,
name varchar(200),
foreign key (idSpace) references spaces(idSpace)
);

create table space_type (
idType int unsigned not null auto_increment primary key,
name varchar(50)
);

create table spaces_spaceType (
idSpace int unsigned not null,
idType int unsigned not null,
foreign key (idSpace) references spaces(idSpace),
foreign key (idType) references space_type(idType)
);

create table groceries (
idGrocerie int unsigned not null auto_increment primary key,
name varchar(50) not null
);

create table spaces_groceries (
idSpace int unsigned not null,
idGrocerie int unsigned not null,
foreign key (idSpace) references spaces(idSpace),
foreign key (idGrocerie) references groceries(idGrocerie)
);

create table equipments (
idEquipment int unsigned not null auto_increment primary key,
name varchar(50) not null 
);

create table spaces_tecnologias (
idSpace int unsigned not null,
idEquipment int unsigned not null,
foreign key (idSpace) references spaces(idSpace),
foreign key (idEquipment) references equipments(idEquipment)
);

create table instalations (
idInstalation int unsigned not null auto_increment primary key,
name varchar(50) not null
);

create table spaces_instalations (
idSpace int unsigned not null,
idInstalation int unsigned not null,
foreign key (idSpace) references spaces(idSpace),
foreign key (idInstalation) references instalations(idInstalation)
);

create table event_type (
idEvent int unsigned not null auto_increment primary key,
name varchar(50) not null
);

create table spaces_eventType (
idSpace int unsigned not null,
idEvent int unsigned not null,
foreign key (idSpace) references spaces(idSpace),
foreign key (idEvent) references event_type(idEvent)
);

create table activities (
idActivity int unsigned not null auto_increment primary key,
name varchar(50) not null
);

create table spaces_activities (
idSpace int unsigned not null,
idActivity int unsigned not null,
foreign key (idSpace) references spaces(idSpace),
foreign key (idActivity) references activities(idActivity)
);

insert into users (idUser, role, email, name, password, verificationCode, createdAt, verifiedAt) values (1, "Admin", "hyggeAdmin@hygge.com", "HyggeAdmin", 
"$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC", "88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860", "2021-12-19 20:47:00", "2021-12-19 20:47:00");
insert into users (idUser, role, email, name, password, verificationCode, createdAt, verifiedAt) values (2, "User", "hyggeUser@hygge.com", "HyggeUser", 
"$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC", "88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860", "2021-12-19 20:47:00", "2021-12-19 20:47:00");

insert into space_type values (1, "Restaurante");
insert into space_type values (2, "Espacio Multiusos");
insert into space_type values (3, "Sala de fiesta");
insert into space_type values (4, "Casa tradicional/finca");
insert into space_type values (5, "Espacio al aire libre");
insert into space_type values (6, "Aula de formación");
insert into space_type values (7, "Barco/Catamaran");
insert into space_type values (8, "Comedor Privado");
insert into space_type values (9, "Espacio en la playa");
insert into space_type values (10, "Galería/Museo");
insert into space_type values (11, "Sala de conferencias");
insert into space_type values (12, "Salón de banquetes");
insert into space_type values (13, "Azotea/Rooftop");
insert into space_type values (14, "Casa rural");
insert into space_type values (15, "Discoteca");
insert into space_type values (16, "Espacio Industrial");
insert into space_type values (17, "Hotel");
insert into space_type values (18, "Sala de congresos");
insert into space_type values (19, "Terraza");
insert into space_type values (20, "Auditorio");
insert into space_type values (21, "Bar");
insert into space_type values (22, "Cocina");
insert into space_type values (23, "Espacio recreativo");
insert into space_type values (24, "Jardín/Patio");
insert into space_type values (25, "Sala de reuniones");
insert into space_type values (26, "Villa/Chalet");

insert into groceries values (1, "Puede llevar comida");
insert into groceries values (2, "Puede llevar alcohol");
insert into groceries values (3, "Sirven comida");
insert into groceries values (4, "Sirven alcohol");
insert into groceries values (5, "Servicio coffee break");

insert into equipments values (1, "Wi-Fi");
insert into equipments values (2, "Proyector/Pantalla");
insert into equipments values (3, "Sistema de Sonido");

insert into instalations values (1, "Piscina");
insert into instalations values (2, "Alojamiento");
insert into instalations values (3, "Aparcamiento");
insert into instalations values (4, "Acceso minusválidos");

insert into event_type values (1, "Boda");
insert into event_type values (2, "Celebración Familiar");
insert into event_type values (3, "Cena/Comida");
insert into event_type values (4, "Conferencia/Formación");
insert into event_type values (5, "Evento Corporativo");
insert into event_type values (6, "Fiesta Privada");
insert into event_type values (7, "Fiesta de Empresa");
insert into event_type values (8, "Fiesta Infantil");
insert into event_type values (9, "Reunión/Workshop");
insert into event_type values (10, "Teambuilding/Recreación");

insert into activities values (1, "Música a todo volumen");

insert into spaces values (1, "Espacio sencillo y muy cómodo", 7, 8, null);
insert into spaces values (2, "Espacio para reuniones", 3, 5.2, null);

insert into bookings values(1, "2021-12-19 20:47:00", "2021-12-19 20:47:00", 1, 1, null);

insert into ratings values (1, 1, 1, 1, 4, "Muy bueno", "2021-12-19 20:47:00");