const express = require('express');
const db = require('../../dbConfig');
const routerDispo = express.Router()

const {authentificationDuTokenCoiffeur} = require("../commun.js")

//Route pour ajouter une disponibilité 
routerDispo.post("/ajoutdisponibilite", authentificationDuTokenCoiffeur,async(req,res) =>{
    const idCoiffeur = req.user.idCoiffeur
    const {jour,heure} = req.body
    try{
        await db("Disponibilite")
        .insert({idCoiffeur,jour,heure})
        .where({idCoiffeur:idCoiffeur})

        res.status(201).json({message : "Disponibilites ajouter avec succes"})    
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de l'ajout des disponibilites"})
    }
})

//Route pour afficher les disponibilités du coiffeur
routerDispo.get("/mesDisponibilite", authentificationDuTokenCoiffeur,async(req,res) =>{
    const idCoiffeur = req.user.idCoiffeur
    try{
        await db.select("idDisponibilite","nom","prenom",'jour',"heure")
        .from('Disponibilite')
        .join('Coiffeurs', 'Disponibilite.idCoiffeur', 'Coiffeurs.idCoiffeur')
        .where({"Disponibilite.idCoiffeur":idCoiffeur})
        .then((disponibilite) => {
            res.status(200).json({disponibilite})
        })
        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la recuperations des disponibilite"})
    }
})

//Route pour modifier les disponibilités du coiffeur
routerDispo.put("/modifDisponibilite", authentificationDuTokenCoiffeur,async(req,res) =>{
    const idCoiffeur = req.user.idCoiffeur
    const {jour,heure} = req.body
    try{
        await db("Disponibilite")
        .where({idCoiffeur:idCoiffeur, jour:jour})
        .update({heure:heure})

        res.status(201).json({message : "Disponibilites modifier avec succes",jour:jour,heureDebut:heureDebut,heureFin:heureFin})    

        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la modification des disponibilite"})
    }
})

//Route pour supprimer les disponibilités du coiffeur
routerDispo.delete("/deleteDisponibilite", authentificationDuTokenCoiffeur,async(req,res) =>{
    const idCoiffeur = req.user.idCoiffeur
    const {idDisponibilite} = req.body
    console.log(idDisponibilite)
    try{
        await db("Disponibilite")
        .where({idCoiffeur:idCoiffeur, idDisponibilite:idDisponibilite})
        .del()

        res.status(201).json({message : "Disponibilites supprimer avec succes"})    

        
    }catch(err){
        console.error(err)
        res.status(500).json({error:"erreur lors de la modification des disponibilite"})
    }
})


//Route pour récuperer une dispo par son id
routerDispo.get("/DisponibiliteParId/:idCoiffeur", authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.params.idCoiffeur
    try {
        const disponibilite = await getDispoById(idCoiffeur);
        console.log(disponibilite)
        res.json({disponibilite});

    } catch(error) {
        console.log(error);
        res.status(500).json({error : "Erreur lors de la récuperation de la disponibilité par son id"});
    }

})

routerDispo.get("/DisponibiliteParIds/:idCoiffeur", async (req, res) => {
    const idCoiffeur = req.params.idCoiffeur
    console.log(idCoiffeur)
    try {
        const disponibilite = await getDispoById(idCoiffeur);
        console.log(disponibilite)
        res.json({disponibilite});

    } catch(error) {
        console.log(error);
        res.status(500).json({error : "Erreur lors de la récuperation de la disponibilité par son id"});
    }

})


function getDispoById(id) {
    return new Promise((resolve, reject) => {
        db("Disponibilite")
            .select("*")
            .where({ idCoiffeur: id })
            .then((results) => {
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            });
    });
}



module.exports = routerDispo