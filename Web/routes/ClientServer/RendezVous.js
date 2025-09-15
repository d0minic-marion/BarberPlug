const express = require('express');
const db = require('../../dbConfig');
const routerRendezVous = express.Router()

const {authentificationDuTokenClient} = require("../commun.js")
//Route pour afficher les rendez-vous du client
routerRendezVous.get("/mesRendezVous_Client", authentificationDuTokenClient,async(req,res) =>{
    const idClient = req.user.idClient
    try{
        await db.select("RendezVous.idCoiffeur","idRendezVous","nom","prenom","numero",'date',"email")
        .from('RendezVous')
        .join('Coiffeurs', 'RendezVous.idCoiffeur', 'Coiffeurs.idCoiffeur')
        .where({idClient:idClient})
        .then((RendezVous) => {
            res.json({RendezVous})
        })
        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des RendezVous"})
    }
})
//Route pour planifier un rendez-vous avec un coiffeur
routerRendezVous.post("/faireRendezVous", authentificationDuTokenClient,async(req,res) =>{
    const idClient = req.user.idClient
    const {idCoiffeur,date} = req.body
    try{
        await db("RendezVous")
        .insert({idClient,idCoiffeur,date})

        res.status(200).json({message : "RendezVous ajouter avec succes"})    
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des RendezVous"})
    }
})
//Route pour annuler un rendez-vous avec un coiffeur
routerRendezVous.delete("/supprimerRendezVous", authentificationDuTokenClient, async(req,res) =>{
    const idRendezVous = req.body.idRendezVous
    try{
        await db("RendezVous")
        .select("*")
        .where({idRendezVous:idRendezVous})
        .then(async (rows) =>{
            const idClient = rows[0].idClient
            const idCoiffeur = rows[0].idCoiffeur
            const date = rows[0].date

            await db("Historique")
            .insert({idRendezVous:idRendezVous,idClient:idClient,idCoiffeur:idCoiffeur,date:date})
        })
        

        await db("RendezVous")
        .where({idRendezVous:idRendezVous})
        .del()



        res.status(200).json({message : `Rendez-Vous supprimer avec succes`})    
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la suppression du Rendez-Vous"})
    }
})

module.exports = routerRendezVous