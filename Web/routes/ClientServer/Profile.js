const express = require('express');
const db = require('../../dbConfig');
const bcrypt = require("bcrypt");
const routerProfile = express.Router();

const {authentificationDuTokenClient} = require('../commun');

//Route pour afficher le profil du Client
routerProfile.get('/afficherprofileClient', authentificationDuTokenClient,  async (req, res) => {
    const idClient = req.user.idClient
    try {
        const ClientInfo = await getClientInfoById(idClient);

        res.json({ClientInfo});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récupération des données du Client"});
    } 
});

//Route pour modifier le profil du Client
routerProfile.put('/modifierprofileClient', authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient
    const {data} = req.body;
    try {
        upDateClientInfoById(idClient, data);
        res.status(201).json({message : "Données du Client modifié avec succès"});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la modification des données du Client"});
    }
})

//Route pour modifier le mot de passe
routerProfile.put('/modifierprofileClient/motdepasse', authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient
    const {password} = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        upDateClientPasswordById(idClient, hashedpassword);
        res.status(201).json({message : "Mot de passe du Client modifié avec succès"});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la modification du mot de passe du Client"});
    }

})

//Route pour supprimer le profil du Client
routerProfile.delete('/supprimerprofileClient', authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient
    try {
        deleteClientById(idClient);
        res.status(200).json({message : "Client supprimé avec succès"});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la suppréssion du Client"});
    }

})


function getClientInfoById(id){
    return new Promise ((resolve,reject) =>{
        db("Clients")
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

function upDateClientInfoById(id, data){
    return new Promise ((resolve,reject) =>{
        db("Clients")
        .where({idClient:id})
        .update(data)
        .then(()=>{
            resolve("Informations du Client mis à jours avec suucès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

function upDateClientPasswordById(id, password){
    return new Promise ((resolve,reject) =>{
        db("Clients")
        .where({idClient:id})
        .update({motdepasse:password})
        .then(()=>{
            resolve("Mot de passe du Client mis à jours avec suucès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

function deleteClientById(id){
    return new Promise ((resolve,reject) =>{
        db("Clients")
        .where({idClient:id})
        .del()
        .then(()=>{
            resolve("Client supprimé avec succès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

module.exports = routerProfile