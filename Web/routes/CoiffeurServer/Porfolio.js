const express = require('express');
const routerPorfolio = express.Router();
const db = require('../../dbConfig');

const { authentificationDuTokenCoiffeur } = require("../commun.js")

routerPorfolio.post("/ajoutPorfolio", authentificationDuTokenCoiffeur, async (req, res) => {
    const { idCoiffeur, img } = req.body;

    try {
        await addImage(idCoiffeur, img);
        res.status(200).json({ message: "Image ajouté avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de l'ajout d'une image" });
    }

})

routerPorfolio.get("/afficherPorfolio", authentificationDuTokenCoiffeur, async (req, res) => {
    const { idCoiffeur } = req.body;

    try {
        const img = await getImageByCoiffeurId(idCoiffeur);
        res.json(img);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récuperation des images" })
    }

})

routerPorfolio.delete("/supprimerPorfolio", authentificationDuTokenCoiffeur, async (req, res) => {
    const { id } = req.body;

    try {
        await deletePorfolioById(id);
        res.status(200).json({ message: "Porfolio supprimé avec suucès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la suppression du porfolio" });
    }

})


function addImage(idCoiffeur, img) {
    return new Promise((resolve, reject) => {
        db("Porfolio")
            .insert({ idCoiffeur: idCoiffeur, image: img })
            .then(() => {
                resolve("Image ajoutée avec succès à la table Porfolio.");
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getImageByCoiffeurId(id) {
    return new Promise((resolve, reject) => {
        db("Porfolio")
            .select("*")
            .where({ idCoiffeur: id })
            .then((rows) => {
                resolve(rows)
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function deletePorfolioById(id) {
    return new Promise((resolve, reject) => {
        db("Porfolio")
            .where({ idPorfolio: id })
            .del()
            .then(() => {
                resolve("Porfolio supprimé avec succès")
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = routerPorfolio;