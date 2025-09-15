const express = require('express');
const db = require('../../dbConfig');
const routerRendezVous = express.Router()

const {authentificationDuTokenCoiffeur} = require("../commun.js")

//Route pour afficher les rendez-vous du coiffeur
routerRendezVous.get("/mesRendezVous_Coiffeur", authentificationDuTokenCoiffeur,async(req,res) =>{
    const idCoiffeur = req.user.idCoiffeur
    try{
        await db.select("idRendezVous","nom","prenom","numero",'date',"email")
        .from('RendezVous')
        .join('Clients', 'RendezVous.idClient', 'Clients.idClient')
        .where({idCoiffeur:idCoiffeur})
        .then((RendezVous) => {
            res.json({RendezVous})
        })
        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des RendezVous"})
    }
})

module.exports = routerRendezVous