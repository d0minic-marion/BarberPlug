const express = require('express');
const db = require('../../dbConfig');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const routerLoginRegister = express.Router()

const {TOKEN_SECRET_KEY_Coiffeur} = require("../commun.js")


//Route Register pour Coiffeur

routerLoginRegister.post("/registerCoiffeur", async (req,res) => {
    const {nom,prenom,mdp,numero,email,pdp,bio, nomSalon, adresseSalon, heureOuverture, heureFermeture } = req.body;
    try{
        const user = await getCoiffeurByemail(email);
        console.log({nom,prenom,mdp,numero,email,pdp,bio, nomSalon, adresseSalon, heureOuverture, heureFermeture })
        if(user[0]){
            return res.status(400).json({message:"L'utilisateur existe deja"})
        }else{
            const motdepasse = await bcrypt.hash(mdp, 10)
            const [idSalonCoiffure] =  await db("salonCoiffure")
            .insert({nomSalon,adresseSalon,heureOuverture,heureFermeture})
 

            const [idCoiffeur] =  await db("Coiffeurs")
            .insert({idSalonCoiffure,nom,prenom,motdepasse,numero,email,pdp,bio })

            await db("portefeuilleCoiffeur")
            .insert({ idCoiffeur: idCoiffeur, montant: 0 });
          

            res.status(201).json({message : "utilisateur créé avec succes"})    
        }
       
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Erreur lors de l'ajout de l'utilisateur"})
    }

})

//Route login pour Coiffeur

routerLoginRegister.post("/loginCoiffeur", async(req,res) => {
    const {email, mdp} = req.body;
    try{
        const user = await getCoiffeurByemail(email);
        if(!user[0]){
            return res.status(400).json({message:"L'utilisateur existe pas"})
        }else{
            if(!(await bcrypt.compare(mdp, user[0].motdepasse))){
                res.status(501).json({message:"les information de connections sont invalide"})

            }else{
                const idCoiffeur = user[0].idCoiffeur
                const token = jwt.sign({email,idCoiffeur}, TOKEN_SECRET_KEY_Coiffeur)
                res.status(200).json({message:"Utilisateur connecte", token})
            }
        }
        

    }catch(error){
        console.error(error)
        res.status(500).json({error: "Erreur lors de la connection"})
    }
})

//Fonction qui recupere un utilisateur a l'aide de son email
function getCoiffeurByemail(email){
    return new Promise ((resolve,reject) =>{
        db("Coiffeurs")
        .select("*")
        .where({email:email})
        .then((rows)=>{
            resolve(rows)
        }
        )
        .catch(error => {
            reject(error)
        })
    })   
}


module.exports = routerLoginRegister