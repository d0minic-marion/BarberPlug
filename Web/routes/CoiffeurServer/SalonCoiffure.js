const express = require('express');
const routerSalonCoiffure = express.Router();
const db = require('../../dbConfig');

const { authentificationDuTokenCoiffeur } = require("../commun.js");

routerSalonCoiffure.get("/afficherAllSalon", authentificationDuTokenCoiffeur, async (req, res) => {
    try {
        const salon = await getAllSalon();
        res.json(salon);

    } catch (error) {
        console.log(error);
        res.status(500).json({ erreur: "Erreur lors de la récupération des Salons de coiffure" });
    }

})

routerSalonCoiffure.get("/afficherSalonById", authentificationDuTokenCoiffeur, async (req, res) => {
    const idCoiffeur = req.user.idCoiffeur;

    try {
        const salon = await getSalonById(idCoiffeur);
        res.json(salon);

    } catch (error) {
        console.log(error);
        res.status(500).json({ erreur: "Erreur lors de la récupération du Salons de coiffure" });
    }

})

routerSalonCoiffure.get('/salonCoiffeur/:idCoiffeur',  async (req, res) => {
    const idCoiffeur = req.params.idCoiffeur
    try {
        await db.select("SalonCoiffure.idSalonCoiffure",'nomSalon',"adresseSalon",'heureOuverture', 'heureFermeture' )
        .from('Coiffeurs')
        .join('SalonCoiffure', 'SalonCoiffure.idSalonCoiffure', 'Coiffeurs.idSalonCoiffure')
        .where({idCoiffeur:idCoiffeur})
        .then((salonCoiffure) => {
            res.json({salonCoiffure})
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({erreur : "Erreur lors de la récupération du Salon du Coiffeur"});
    } 
});

routerSalonCoiffure.post("/ajouterSalon", authentificationDuTokenCoiffeur, async (req, res) => {
    const { nomSalon, adresseSalon, heureOuverture, heureFermeture } = req.body;

    try {
        await addSalon(nomSalon, adresseSalon, heureOuverture, heureFermeture);
        res.status(200).json({ message: "Salon ajouté avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erreur: "Erreur lors de l'ajout du Salons de coiffure" });
    }

})

routerSalonCoiffure.put("/modifierSalonById", authentificationDuTokenCoiffeur, async (req, res) => {
    const { id, nomSalon, adresseSalon, heureOuverture, heureFermeture } = req.body;

    try {
        await upDateSalonById(id, nomSalon, adresseSalon, heureOuverture, heureFermeture);
        res.status(200).json({ message: "Salon modifié avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erreur: "Erreur lors de la modification du Salons de coiffure" });
    }

})

routerSalonCoiffure.delete("/supprimerSalonById", authentificationDuTokenCoiffeur, async (req, res) => {
    const { id } = req.body;

    try {
        await deleteSalon(id);
        res.status(200).json({ message: "Salon supprimé avec succès" });



    } catch (error) {
        console.log(error);
        res.status(500).json({ erreur: "Erreur lors de la suppression du Salons de coiffure" });
    }

})




function getAllSalon() {
    return new Promise((resolve, reject) => {
        db("salonCoiffure")
            .select("*")
            .then((rows) => {
                resolve(rows)
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function getSalonById(id) {
    return new Promise((resolve, reject) => {
        db("salonCoiffure")
            .select("*")
            .where({ idSalonCoiffure: id })
            .then((rows) => {
                resolve(rows)
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function addSalon(nomSalon, adresseSalon, heureOuverture, heureFermeture) {
    return new Promise((resolve, reject) => {
        db("salonCoiffure")
            .insert({ nomSalon: nomSalon, adresseSalon: adresseSalon, heureOuverture: heureOuverture, heureFermeture: heureFermeture })
            .then(() => {
                resolve("Salon ajouté avec succès");
            })
            .catch(error => {
                reject(error);
            });
    });
}

function upDateSalonById(id, nomSalon, adresseSalon, heureOuverture, heureFermeture) {
    return new Promise((resolve, reject) => {
        db("salonCoiffure")
            .where({ idSalonCoiffure: id })
            .update({ nomSalon: nomSalon, adresseSalon: adresseSalon, heureOuverture: heureOuverture, heureFermeture: heureFermeture })
            .then(() => {
                resolve("Salon mis à jours avec suucès")
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}

function deleteSalon(id) {
    return new Promise((resolve, reject) => {
        db("salonCoiffure")
            .where({ idSalonCoiffure: id })
            .del()
            .then(() => {
                resolve("Salon supprimé avec succès")
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}



module.exports = routerSalonCoiffure;