const express = require('express');
const path = require('path');
const routerLoginRegister = express.Router();
const checkEmail = express.Router();
const {
    checkIfEmailExistsInBothTables
} = require('./routes/commun');

routerLoginRegister.use(express.static(path.join(__dirname, 'Public')));

routerLoginRegister.get('/Authentification', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'LoginRegister', 'LoginRegister.html'));

})


checkEmail.post('/checkEmail', async (req, res) => {
    const email = req.body.email;
    try {
        const emailExists = await checkIfEmailExistsInBothTables(email);
        res.json({ exists: emailExists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = {routerLoginRegister, checkEmail};