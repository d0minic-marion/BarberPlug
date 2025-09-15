const express = require('express');
const db = require('../../dbConfig');
const routerFavoris = express.Router();
const {authentificationDuTokenClient} = require('../commun');

//Route pour ajouter un coiffeur aux favoris du client
routerFavoris.post('/ajouterfavoris', authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient
    const {idCoiffeur} = req.body;
    try {
        const donnee = {idClient, idCoiffeur};
        await insertFavoris(donnee);
        res.json({message : "Favoris ajouté avec succès"})

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de l'ajout de l'avis"});
    }
})

//Route pour voir les coiffeur favoris
routerFavoris.get('/afficherfavoris', authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient
    try {
        const favoris = await getFavorisByIdClient(idClient);
        res.json({favoris});

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récuperation des avis du client"});
    }

})

//Route pour retirer un favoris du Client
routerFavoris.delete('/supprimerfavoris', authentificationDuTokenClient, async (req, res) => {
    const idClient = req.user.idClient
    const {idFavoris} = req.body;
    try {
        await deleteFavorisById(idFavoris,idClient);
        res.json({message : "Favoris supprimé avec succès"})

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la suppression de l'avis du client"});
    }

})


//Fonction pour ajouter un favoris
function insertFavoris(data) {
    return new Promise ((resolve,reject) =>{
        db("Favoris")
        .insert(data)
        .then(()=>{
            resolve("Favoris ajouté avec succès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })
}


//Fonction pour récuperer tous les favoris d'un client en fonction de son id
function getFavorisByIdClient(id) {
    return new Promise ((resolve,reject) =>{
        db("Favoris")
        .select("Favoris.*", "nom", "prenom", "numero", "email", "pdp", "bio")
        .join("Coiffeurs", "Favoris.idCoiffeur", "Coiffeurs.idCoiffeur")
        .where({"Favoris.idClient":id})
        .then((rows)=>{
            resolve(rows)
        }
        )
        .catch(error => {
            reject(error)
        })
    })
}


//Fonction pour supprimer un favois en fonction de son id
function deleteFavorisById(idFavoris,idClient){
    return new Promise ((resolve,reject) =>{
        db("Favoris")
        .where({idFavoris:idFavoris,idClient:idClient})
        .del()
        .then(()=>{
            resolve("Favoris supprimé avec succès")
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}

module.exports = routerFavoris