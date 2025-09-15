-- SQLite
-- SQLite
--creation de base de donnee

drop table if EXISTS salonCoiffure;
CREATE TABLE IF NOT EXISTS salonCoiffure (
    idSalonCoiffure INTEGER PRIMARY KEY AUTOINCREMENT,
    nomSalon TEXT NOT NULL,
    adresseSalon TEXT NOT NULL,
    heureOuverture TEXT NOT NULL,
    heureFermeture TEXT NOT NULL
);



drop table if EXISTS Coiffeurs;
CREATE TABLE IF NOT EXISTS Coiffeurs (
    idCoiffeur INTEGER PRIMARY KEY AUTOINCREMENT,
    idSalonCoiffure INTEGER,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    motdepasse TEXT NOT NULL,
    numero TEXT NOT NULL,
    email TEXT NOT NULL,
    pdp TEXT NOT NULL,
    bio TEXT NOT NULL,
    FOREIGN KEY (idSalonCoiffure) REFERENCES salonCoiffure(idSalonCoiffure)
);


drop table if EXISTS Clients;
CREATE TABLE if not EXISTS Clients (
 idClient INTEGER PRIMARY KEY AUTOINCREMENT,
 nom TEXT NOT NULL,
 prenom TEXT NOT NULL,
 motdepasse TEXT NOT NULL,
 numero TEXT NOT NULL,
 email TEXT NOT NULL
);


drop table if EXISTS Porfolio;
CREATE TABLE if not EXISTS Porfolio (
 idPorfolio INTEGER PRIMARY KEY AUTOINCREMENT,
 idCoiffeur INTEGER NOT NULL,
 image BLOB,
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS Disponibilite;
CREATE TABLE if not EXISTS Disponibilite (
 idDisponibilite INTEGER PRIMARY KEY AUTOINCREMENT,
 idCoiffeur INTEGER NOT NULL,
 jour TEXT NOT NULL,
 heure TEXT NOT NULL,
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS Service;
CREATE TABLE if not EXISTS Service (
 idService INTEGER PRIMARY KEY AUTOINCREMENT,
 idCoiffeur INTEGER NOT NULL,
 coupe TEXT NOT NULL,
 tarif REAL NOT NULL,
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS Favoris;
CREATE TABLE if not EXISTS Favoris (
 idFavoris INTEGER PRIMARY KEY AUTOINCREMENT,
 idClient INTEGER NOT NULL,
 idCoiffeur INTEGER NOT NULL,
 FOREIGN KEY(idClient) REFERENCES Clients(idClient),
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS Avis;
CREATE TABLE if not EXISTS Avis (
 idAvis INTEGER PRIMARY KEY AUTOINCREMENT,
 idClient INTEGER NOT NULL,
 idCoiffeur INTEGER NOT NULL,
 etoile INTEGER NOT NULL,
 commentaire TEXT,
 FOREIGN KEY(idClient) REFERENCES Clients(idClient),
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


INSERT INTO Avis (idClient, idCoiffeur, etoile, commentaire) VALUES (1, 1, 5, 'Excellent service, très satisfait!');
INSERT INTO Avis (idClient, idCoiffeur, etoile, commentaire) VALUES (1, 1, 4, 'Bon travail, mais l''attente était longue.');
INSERT INTO Avis (idClient, idCoiffeur, etoile, commentaire) VALUES (1, 1, 5, 'Service exceptionnel, je reviendrai!');
INSERT INTO Avis (idClient, idCoiffeur, etoile, commentaire) VALUES (1, 1, 5, 'Le meilleur coiffeur que j''ai jamais eu.');
INSERT INTO Avis (idClient, idCoiffeur, etoile, commentaire) VALUES (1, 1, 4, 'Très satisfait, je recommande.');


drop table if EXISTS RendezVous;
CREATE TABLE if not EXISTS RendezVous (
 idRendezVous INTEGER PRIMARY KEY AUTOINCREMENT,
 idClient INTEGER NOT NULL,
 idCoiffeur INTEGER NOT NULL,
 date TEXT NOT NULL,
 FOREIGN KEY(idClient) REFERENCES Clients(idClient),
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS Historique;
CREATE TABLE if not EXISTS Historique (
 idHistorique INTEGER PRIMARY KEY AUTOINCREMENT,
 idRendezVous INTEGER NOT NULL,
 idClient INTEGER NOT NULL,
 idCoiffeur INTEGER NOT NULL,
 date TEXT NOT NULL,
 FOREIGN KEY(idClient) REFERENCES Clients(idClient),
 FOREIGN KEY(idRendezVous) REFERENCES RendezVous(idRendezVous)
FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS portefeuilleCoiffeur;
CREATE TABLE if not EXISTS portefeuilleCoiffeur (
 idportefeuilleCoiffeur INTEGER PRIMARY KEY AUTOINCREMENT,
 idCoiffeur INTEGER NOT NULL,
 montant INTEGER NOT NULL,
 FOREIGN KEY(idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


drop table if EXISTS portefeuilleClient;
CREATE TABLE if not EXISTS portefeuilleClient (
 idportefeuilleCoiffeur INTEGER PRIMARY KEY AUTOINCREMENT,
 idClient INTEGER NOT NULL,
 montant INTEGER NOT NULL,
 FOREIGN KEY(idClient) REFERENCES Clients(idClient)
);

