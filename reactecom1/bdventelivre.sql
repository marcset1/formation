CREATE DATABASE IF NOT EXISTS bdventelivre;

USE bdventelivre;

CREATE TABLE IF NOT EXISTS tbclient(
	idclient int auto_increment primary key,
	nom varchar(150) not null,
    prenom varchar(150) null,
    email varchar(50) null,
    tel varchar(15) not null,
    ville varchar(50) not null

);

CREATE TABLE IF NOT EXISTS tbproduit(
	
    idproduit int auto_increment primary key,
	libelle varchar(150) not null,
    descriptions varchar(150) null,
    prix int default 0,
    qstock int default 0

);

CREATE TABLE IF NOT EXISTS tbcommande(

	idcommande int auto_increment primary key,
	idclient_fk int not null,
    idproduit_fk int not null,
    qtecommande int not null,
    datecommande datetime not null,
    foreign key (idclient_fk) references tbclient(idclient) on update cascade,
    foreign key (idproduit_fk) references tbproduit(idproduit) on update cascade
);

CREATE TABLE IF NOT EXISTS tbachat(
	
    idachat int auto_increment primary key,
    idcommande int not null,
    montant int null,
    modepaiement varchar(50) null,
    dateachat datetime null

);

ALTER TABLE tbproduit ADD imageurl varchar(255);

