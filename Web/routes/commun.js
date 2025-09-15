const jwt = require("jsonwebtoken")
const TOKEN_SECRET_KEY_Client = "KEY_WEB-4D2"
const TOKEN_SECRET_KEY_Coiffeur = "KEY_WEB-4D3"
const db = require('../dbConfig');

//Fonction pour authentifier un token Client

function authentificationDuTokenClient(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if(!token){
        return res.status(401).json({message:"Acces interdit!"})
    }

    jwt.verify(token,TOKEN_SECRET_KEY_Client, (err,user) =>{
        if(err){
            return res.status(403).json({message:"Token invalide"}) 
        }
        req.user = user;
        next();
    })
}

//Fonction pour authentifier un token Coiffeur

function authentificationDuTokenCoiffeur(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if(!token){
        return res.status(401).json({message:"Acces interdit!"})
    }

    jwt.verify(token,TOKEN_SECRET_KEY_Coiffeur, (err,user) =>{
        if(err){
            return res.status(403).json({message:"Token invalide"}) 
        }
        req.user = user;
        next();
    })
}


async function checkIfEmailExistsInBothTables(email) {
    try {
        const coiffeurExists = await getCoiffeurByEmail(email);
        const clientExists = await getClientByEmail(email);
        
        return coiffeurExists.length > 0 || clientExists.length > 0;
    } catch (error) {
        throw error;
    }
}


async function getCoiffeurByEmail(email) {
    try {
        const rows = await db("Coiffeurs").select("*").where({ email: email });
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getClientByEmail(email) {
    try {
        const rows = await db("Clients").select("*").where({ email: email });
        return rows;
    } catch (error) {
        throw error;
    }
}


//exporter les fonction d'Authentification et les cle secret des token pour client et coiffeur
module.exports = {authentificationDuTokenCoiffeur,authentificationDuTokenClient,TOKEN_SECRET_KEY_Client,TOKEN_SECRET_KEY_Coiffeur, checkIfEmailExistsInBothTables}