const express = require('express');
const db = require('../../dbConfig');
const bcrypt = require("bcrypt");
const routerProfile = express.Router()

const {authentificationDuTokenCoiffeur} = require('../commun');

//Route pour afficher le profil du coiffeur
routerProfile.get('/afficherprofileCoiffeur', authentificationDuTokenCoiffeur,  async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur
    try {
        const CoiffeurInfo = await getCoiffeurInfoById(idCoiffeur);

        res.json({CoiffeurInfo});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récupération des données du Coiffeur"});
    } 
});

//Route pour modifier le profil du coiffeur
routerProfile.put('/modifierprofileCoiffeur', authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur
    const {data} = req.body;
    try {
        upDateCoiffeurInfoById(idCoiffeur, data);
        res.status(201).json({message : "Données du Coiffeur modifié avec succès"});
    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la modification des données du Coiffeur"});
    }
})

routerProfile.get('/profileCoiffeur/:idCoiffeur',  async (req, res) => {
    const idCoiffeur = req.params.idCoiffeur
    try {
        const CoiffeurInfo = await getCoiffeurInfoById(idCoiffeur);
        res.json({CoiffeurInfo});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récupération des données du Coiffeur"});
    } 
});

//Route pour supprimer le profil du coiffeur
routerProfile.delete('/supprimerprofileCoiffeur', authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur

    try {
        deleteCoiffeurById(idCoiffeur);
        res.status(200).json({message : "Coiffeur supprimé avec succès"});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la suppréssion du Coiffeur"});
    }

})

//Route pour modifier le mot de passe coiffeur
routerProfile.put('/modifierprofileCoiffeur/motdepasse', authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur
    const {password} = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        upDateCoiffeurPasswordById(idCoiffeur, hashedpassword);
        res.status(201).json({message : "Mot de passe du Coiffeur modifié avec succès"});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la modification du mot de passe du Coiffeur"});
    }

})


function getCoiffeurInfoById(id){
    return new Promise ((resolve,reject) =>{
        db("Coiffeurs")
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

function upDateCoiffeurInfoById(id, data){
    return new Promise ((resolve,reject) =>{
        db("Coiffeurs")
        .where({idCoiffeur:id})
        .update(data)
        .then(()=>{
            resolve("Informations du Coiffeur mis à jours avec suucès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

function upDateCoiffeurPasswordById(id, password){
    return new Promise ((resolve,reject) =>{
        db("Coiffeurs")
        .where({idCoiffeur:id})
        .update({motdepasse:password})
        .then(()=>{
            resolve("Mot de passe du Coiffeur mis à jours avec suucès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

function deleteCoiffeurById(id){
    return new Promise ((resolve,reject) =>{
        db("Coiffeurs")
        .where({idCoiffeur:id})
        .del()
        .then(()=>{
            resolve("Coiffeur supprimé avec succès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

module.exports = routerProfile