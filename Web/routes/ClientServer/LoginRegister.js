const express = require('express');
const db = require('../../dbConfig');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const routerLoginRegister = express.Router()

const {TOKEN_SECRET_KEY_Client} = require("../commun.js")

//Route Register pour Client
routerLoginRegister.post("/registerClient", async (req,res) => {
    const {nom,prenom, mdp,numero,email} = req.body;
    try{
        const user = await getClientByemail(email);
        console.log(user)
        console.log(email)

        if(user[0]){
            return res.status(400).json({message:"L'utilisateur existe deja"})
        }else{
            const motdepasse = await bcrypt.hash(mdp, 10)
            
            const [idClient] = await db("Clients")
            .insert({nom,prenom, motdepasse,numero,email})

            await db("portefeuilleClient")
            .insert({ idClient: idClient, montant: 0 });
            
            res.status(201).json({message : "utilisateur créé avec succes"})    
        }
       
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Erreur lors de l'ajout de l'utilisateur"})
    }

})

//Route login pour Clients

routerLoginRegister.post("/loginClient", async(req,res) => {
    const {email, mdp} = req.body;
    try{
        const user = await getClientByemail(email);
        if(!user[0]){
            return res.status(400).json({message:"L'utilisateur existe pas"})
        }else{
            if(!(await bcrypt.compare(mdp, user[0].motdepasse))){
                res.status(501).json({message:"les information de connections sont invalide"})

            }else{
                const idClient = user[0].idClient
                const token = jwt.sign({email,idClient}, TOKEN_SECRET_KEY_Client)
                res.status(200).json({message:"Utilisateur connecte", token})
            }
        }
        

    }catch(error){
        console.error(error)
        res.status(500).json({error: "Erreur lors de la connection"})
    }
})

//Fonction qui recupere un utilisateur a l'aide de son email

function getClientByemail(email){
    return new Promise ((resolve,reject) =>{
        db("Clients")
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