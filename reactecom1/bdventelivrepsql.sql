-- Création de la base de données (nécessite une vérification manuelle de l'existence)
CREATE DATABASE bdventelivre;

-- Connexion à la base de données
\c bdventelivre;

-- Création de la table tbclient
CREATE TABLE IF NOT EXISTS tbclient (
    idclient SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    prenom VARCHAR(150),
    email VARCHAR(50),
    tel VARCHAR(15) NOT NULL,
    ville VARCHAR(50) NOT NULL
);

-- Création de la table tbproduit
CREATE TABLE IF NOT EXISTS tbproduit (
    idproduit SERIAL PRIMARY KEY,
    libelle VARCHAR(150) NOT NULL,
    descriptions VARCHAR(150),
    prix INT DEFAULT 0,
    qstock INT DEFAULT 0
);

-- Création de la table tbcommande
CREATE TABLE IF NOT EXISTS tbcommande (
    idcommande SERIAL PRIMARY KEY,
    idclient_fk INT NOT NULL,
    idproduit_fk INT NOT NULL,
    qtecommande INT NOT NULL,
    datecommande TIMESTAMP NOT NULL,
    FOREIGN KEY (idclient_fk) REFERENCES tbclient(idclient) ON UPDATE CASCADE,
    FOREIGN KEY (idproduit_fk) REFERENCES tbproduit(idproduit) ON UPDATE CASCADE
);

-- Création de la table tbachat
CREATE TABLE IF NOT EXISTS tbachat (
    idachat SERIAL PRIMARY KEY,
    idcommande INT NOT NULL,
    montant INT,
    modepaiement VARCHAR(50),
    dateachat TIMESTAMP
);

-- Ajout de la colonne imageurl à la table tbproduit
ALTER TABLE tbproduit ADD COLUMN IF NOT EXISTS imageurl VARCHAR(255);
