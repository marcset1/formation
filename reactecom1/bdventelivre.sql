CREATE DATABASE IF NOT EXISTS bdventelivre;

USE bdventelivre;

CREATE TABLE tbclient(
	idclient int auto_increment primary;
	nom varchar(150) not null,
    prenom varchar(150) null,
    email varchar() null,
    tel varchar(15) not null,
    ville not null

);

CREATE TABLE tbproduit(
	
    idproduit int auto_increment primary,
	libelle varchar(150) not null,
    descriptions varchar(150) null,
    prix int default 0,
    qstock int default 0,

);

CREATE TABLE tbcommande(

	idcommande int auto_increment primary,
	idclient_fk int not null,
    idproduit_fk int not null,
    qtecommande int not null,
    foreign key (idclient_fk) references idclient(tbclient) on update cascade,
    foreign key (idproduit_fk) references idproduit(tbclient) on update cascade,
);

CREATE TABLE tbclient(

	nom varchar(150) not null,
    prenom varchar(150) null,
    email varchar() null,
    tel varchar(15) not null,
    ville not null

);