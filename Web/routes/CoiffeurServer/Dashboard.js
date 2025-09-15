const express = require('express');
const db = require('../../dbConfig');
const routerdashboard = express.Router()

const {authentificationDuTokenCoiffeur} = require("../commun.js")

//route qui affiche le dashboard pour coiffeur a l'aide d'un token



routerdashboard.get('/recupererSoldeCoiffeur', authentificationDuTokenCoiffeur,  async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur
    try {
        const CoiffeurInfo = await getCoiffeurInfoById(idCoiffeur);
        res.json({CoiffeurInfo});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récupération des données du Coiffeur"});
    } 
});

function getCoiffeurInfoById(id){
    return new Promise ((resolve,reject) =>{
        db("portefeuilleCoiffeur")
        .select("*")
        .where({idCoiffeur:id})
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