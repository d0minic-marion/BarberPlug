const express = require('express');
const routerHistorique = express.Router();
const db = require('../../dbConfig');

const { authentificationDuTokenClient } = require('../commun');

routerHistorique.get("/afficherHistoriqueByClientId", authentificationDuTokenClient, async (req, res) => {
    const { id } = req.body;

    try {
        const historique = await getHistoriqueByClientId(id);
        res.json(historique);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération de l'historique du client" });
    }

})

routerHistorique.get("/afficherHistoriqueById", authentificationDuTokenClient, async (req, res) => {
    const { id } = req.body;

    try {
        const historique = await getHistoriqueById(id);
        res.json(historique);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération de l'historique" })
    }

})

routerHistorique.post("/ajouterHistorique", authentificationDuTokenClient, async (req, res) => {
    const { idRendezVous, idClient, idCoiffeur, date } = req.body;

    try {
        await addHistorique(idRendezVous, idClient, idCoiffeur, date);
        res.status(200).json({ message: "Ajout de l'historique avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'historique" });
    }

})


function getHistoriqueByClientId(id) {
    return new Promise((resolve, reject) => {
        db("Historique")
            .select("*")
            .where({ idClient: id })
            .then((rows) => {
                resolve(rows)
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function getHistoriqueById(id) {
    return new Promise((resolve, reject) => {
        db("Historique")
            .select("*")
            .where({ idHistorique: id })
            .then((rows) => {
                resolve(rows)
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function addHistorique(idRendezVous, idClient, idCoiffeur, date) {
    return new Promise((resolve, reject) => {
        db("Historique")
            .insert({ idRendezVous: idRendezVous, idClient: idClient, idCoiffeur: idCoiffeur, date: date })
            .then(() => {
                resolve("Historique ajouté avec succès");
            })
            .catch(error => {
                reject(error);
            });
    });
}







module.exports = routerHistorique;