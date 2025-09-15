const express = require('express');
const db = require('../../dbConfig');
const routerAvis = express.Router()

const {authentificationDuTokenClient} = require("../commun.js")

//Route pour ajouter un avis pour un coiffeur
routerAvis.post("/ajoutAvis", authentificationDuTokenClient, async(req,res) =>{
    const idClient = req.user.idClient
    const {idCoiffeur,etoile,commentaire} = req.body

    try{
        await db("Avis")
        .insert({idClient,idCoiffeur,etoile,commentaire})

        res.status(201).json({message : "Avis ajouter avec succes"})    
            
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de l'ajout d'un avis"})
    }
})

//Route pour voir mes avis
routerAvis.get("/mesAvis_Client", authentificationDuTokenClient,async(req,res) =>{
    const idClient = req.user.idClient
    try{
        await db.select("idAvis",'nom',"prenom",'etoile', 'commentaire')
        .from('Avis')
        .join('Coiffeurs', 'Avis.idCoiffeur', 'Coiffeurs.idCoiffeur')
        .where({idClient:idClient})
        .then((avis) => {
            res.json({avis})
        })
        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des avis"})
    }
})

//Route pour retirer un avis pour un coiffeur
routerAvis.delete("/supprimerAvis", authentificationDuTokenClient, async(req,res) =>{
    const idAvis = req.body.idAvis
    try{
        await db("Avis")
        .where({idAvis:idAvis})
        .del()

        res.status(200).json({message : `Avis supprimer avec succes`})    
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la suppression des avis"})
    }
})

module.exports = routerAvis