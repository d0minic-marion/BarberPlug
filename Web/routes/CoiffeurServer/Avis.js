const express = require('express');
const db = require('../../dbConfig');
const routerAvis = express.Router()

const {authentificationDuTokenCoiffeur} = require("../commun.js")

//Route pour afficher les avis du coiffeur
routerAvis.get("/mesAvis_Coiffeur", authentificationDuTokenCoiffeur, async(req,res) =>{
    const idCoiffeur = req.user.idCoiffeur
    try{
        await db.select("idAvis",'nom',"prenom",'etoile', 'commentaire' )
        .from('Avis')
        .join('Clients', 'Avis.idClient', 'Clients.idClient')
        .where({idCoiffeur:idCoiffeur})
        .then((avis) => {
            res.json({avis})
        })
        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des avis"})
    }
})


routerAvis.get("/lesAvis", async(req,res) =>{
    try{
        await db.select("Avis.idAvis", "Clients.nom", "Clients.prenom", "Avis.etoile", "Avis.commentaire")
        .from('Avis')
        .join('Clients', 'Avis.idClient', 'Clients.idClient')
        .then((avis) => {
            res.json({ avis });
        });
      
        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des avis"})
    }
})


module.exports = routerAvis