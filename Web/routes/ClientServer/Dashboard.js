const express = require('express');
const db = require('../../dbConfig');
const routerdashboard = express.Router()

const {authentificationDuTokenClient} = require("../commun.js")

//route qui recupere tout les coiffeurs

routerdashboard.get("/recupererCoiffeurs", async(req,res) => {
    try{
        await db("Coiffeurs")
        .select("*")
        .then((coiffeurs) => {
            res.send(coiffeurs)
        })
    
    }catch(err){
        console.error(err)
        res.status(500).json({erreur:"erreur lors de la recuperation des coiffeurs"})
    }
})

routerdashboard.get('/recupererSoldeClient', authentificationDuTokenClient,  async (req, res) => {
    const idClient = req.user.idClient
    try {
        const ClientInfo = await getClientInfoById(idClient);
        res.json({ClientInfo});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récupération des données du Client"});
    } 
});
routerdashboard.post("/ajoutSoldeClient", authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient;
    const { montant } = req.body;
    try {
        await db("portefeuilleClient")
            .where({ idClient: idClient })
            .increment('montant', montant);
        res.status(200).json({ message: "Montant ajouté avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'ajout du montant" });
    }
});

routerdashboard.post("/effectuerTransactionSoldeClientCoiffeur", authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient;
    const { montant, idCoiffeur } = req.body;
    try {
        // Subtract montant from client's balance
        await db("portefeuilleClient")
            .where({ idClient: idClient })
            .decrement('montant', montant);
        
        // Add montant to coiffeur's balance
        await db("portefeuilleCoiffeur")
            .where({ idCoiffeur: idCoiffeur })
            .increment('montant', montant);

        res.status(200).json({ message: "Transaction effectuée avec succès : montant retiré du solde client et ajouté au solde coiffeur" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors du traitement de la transaction" });
    }
});



function getClientInfoById(id){
    return new Promise ((resolve,reject) =>{
        db("portefeuilleClient")
        .select("*")
        .where({idClient:id})
        .then((rows)=>{
            resolve(rows)
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

module.exports = routerdashboard