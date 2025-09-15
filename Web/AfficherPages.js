const express = require('express');
const routerPages = express.Router()
const path = require('path');

routerPages.use(express.static(path.join(__dirname, 'Public')));

//faut tout changer et mettre un middleware mandat 3

routerPages.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Acceuil', 'Acceuil.html'));
})

routerPages.get('/Profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Profile', 'Profile.html'));
})

routerPages.get('/Disponibilite', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Disponibilite', 'Disponibilite.html'));
})

routerPages.get('/rendezvous', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'RendezVous', 'RendezVous.html'));
})
routerPages.get('/historiquerendezvous', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'HistoriqueRendezVous', 'RendezVous.html'));
})


routerPages.get('/Recherche', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Recherche', 'Recherche.html'));
})



routerPages.get('/Avis', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Avis', 'Avis.html'));
})

routerPages.get('/Favoris', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Favoris', 'Favoris.html'));
})

routerPages.get('/Dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Dashboard', 'Dashboard.html'));
})

routerPages.get('/ProfileCoiffeur', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'ProfileCoiffeur', 'ProfileCoiffeur.html'));
})

routerPages.get('/Services', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Services', 'Services.html'));
})

module.exports = routerPages;