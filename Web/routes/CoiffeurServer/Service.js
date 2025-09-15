const express = require('express');
const routerService = express.Router();
const db = require('../../dbConfig');

const { authentificationDuTokenCoiffeur } = require("../commun.js")
const {authentificationDuTokenClient} = require("../commun.js")


routerService.get("/afficherServiceByCoiffeurId", authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur

    try {
        const services = await getServiceById(idCoiffeur);
        res.json(services);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des services" })
    }

})


routerService.get("/afficherServiceByCoiffeurId/:id", async (req, res) => {
    const id  = req.params.id;

    try {
        const services = await getServiceById(id);
        res.json(services);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des services" })
    }

})

routerService.post("/ajouterService", authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur
    const {coupe,tarif} = req.body;

    try {
        await addService(idCoiffeur, coupe, tarif);
        res.status(200).json({ message: "Service ajouté avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de l'ajout du service" });

    }


})

routerService.put("/modifierServiceById", authentificationDuTokenCoiffeur, async (req, res) => {
    const { id, coupe, tarif } = req.body;

    try {
        await upDateServiceById(id, coupe, tarif);
        res.status(200).json({ message: "Service modifié avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la modification du service" });
    }

})

routerService.delete("/supprimerServiceById", authentificationDuTokenCoiffeur, async (req, res) => {
    const { id } = req.body;

    try {
        await deleteService(id);
        res.status(200).json({ message: "Service supprimé avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la suppression du service" });
    }

})


function getServiceById(idCoiffeur) {
    return new Promise((resolve, reject) => {
        db("Service")
            .select("*")
            .where({ idCoiffeur: idCoiffeur })
            .then((rows) => {
                resolve(rows)
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function addService(idCoiffeur, coupe, tarif) {
    return new Promise((resolve, reject) => {
        db("Service")
            .insert({ idCoiffeur: idCoiffeur, coupe: coupe, tarif: tarif })
            .then(() => {
                resolve("Service ajouté avec succès");
            })
            .catch(error => {
                reject(error);
            });
    });
}

function upDateServiceById(id, coupe, tarif) {
    return new Promise((resolve, reject) => {
        db("Service")
            .where({ idService: id })
            .update({coupe: coupe, tarif: tarif })
            .then(() => {
                resolve("Service mis à jours avec suucès")
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function deleteService(id) {
    return new Promise((resolve, reject) => {
        db("Service")
            .where({ idService: id })
            .del()
            .then(() => {
                resolve("Service supprimé avec succès")
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}




module.exports = routerService;