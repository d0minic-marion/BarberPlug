const express = require('express');
const RouterClient = express.Router();
const RouterCoiffeur = express.Router();

// Importer les routes des clients
const ClientAccueilRouter = require('./ClientServer/Accueil');
const ClientLoginRegisterRouter = require('./ClientServer/LoginRegister');
const ClientAvisRouter = require('./ClientServer/Avis');
const ClientFavorisRouter = require('./ClientServer/Favoris');
const ClientRendezVousRouter = require('./ClientServer/RendezVous');
const ClientProfileRouter = require('./ClientServer/Profile');
const ClientDashboardRouter = require('./ClientServer/Dashboard');
const ClientHistorique = require('./ClientServer/Historique');


// Importer les routes  des coiffeurs
const CoiffeurAccueilRouter = require('./CoiffeurServer/Accueil');
const CoiffeurLoginRegisterRouter = require('./CoiffeurServer/LoginRegister');
const CoiffeurAvisRouter = require('./CoiffeurServer/Avis');
const CoiffeurDisponibilitéRouter = require('./CoiffeurServer/Disponibilites');
const CoiffeurRendezVousRouter = require('./CoiffeurServer/RendezVous');
const CoiffeurProfileRouter = require('./CoiffeurServer/Profile');
const CoiffeurDashboardRouter = require('./CoiffeurServer/Dashboard');
const CoiffeurPorfolio = require('./CoiffeurServer/Porfolio');
const CoiffeurHistorique = require('./CoiffeurServer/Historique');
const CoiffeurService = require('./CoiffeurServer/Service');
const CoiffeurSalon = require('./CoiffeurServer/SalonCoiffure');

// Utiliser les routes pour les clients
RouterClient.use(ClientAccueilRouter);
RouterClient.use(ClientLoginRegisterRouter);
RouterClient.use(ClientAvisRouter);
RouterClient.use(ClientFavorisRouter);
RouterClient.use(ClientRendezVousRouter);
RouterClient.use(ClientProfileRouter);
RouterClient.use(ClientDashboardRouter);
RouterClient.use(ClientHistorique);

// Utiliser les routes pour les coiffeurs
RouterCoiffeur.use(CoiffeurAccueilRouter);
RouterCoiffeur.use(CoiffeurLoginRegisterRouter);
RouterCoiffeur.use(CoiffeurAvisRouter);
RouterCoiffeur.use(CoiffeurDisponibilitéRouter);
RouterCoiffeur.use(CoiffeurRendezVousRouter);
RouterCoiffeur.use(CoiffeurProfileRouter);
RouterCoiffeur.use(CoiffeurDashboardRouter);
RouterCoiffeur.use(CoiffeurPorfolio);
RouterCoiffeur.use(CoiffeurHistorique);
RouterCoiffeur.use(CoiffeurService);
RouterCoiffeur.use(CoiffeurSalon);

//exporter les routers client et coiffeur
module.exports = { RouterClient, RouterCoiffeur };