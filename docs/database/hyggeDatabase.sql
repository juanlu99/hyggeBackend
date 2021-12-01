drop database if exists hygge;
create database hygge;
use hygge;

create table users (
idUser int unsigned auto_increment primary key
);

create table infoUsers (
idUser int unsigned not null,
foreign key (idUser) references users(idUser)
);

create table espacios (
idEspacio int unsigned auto_increment primary key
);

create table reservas (
idReserva int unsigned auto_increment primary key,
idUser int unsigned not null,
idEspacio int unsigned not null,
foreign key (idUser) references users(idUser),
foreign key (idEspacio) references espacios(idEspacio)
);

create table imgEspacios (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table infoEspacios (
idEspacio int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio)
);

create table ratings (
idEspacio int unsigned not null,
idUser int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idUser) references users(idUser)
);

create table favourites (
idEspacio int unsigned not null,
idUser int unsigned not null,
foreign key (idEspacio) references espacios(idEspacio),
foreign key (idUser) references users(idUser)
);