const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

//importer les router client et coiffeur
const {RouterClient, RouterCoiffeur} = require('./routes');
const routerAuthentificationServer = require('./AuthentificationServer.js');
const routerPages = require('./AfficherPages.js');


const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'Public')));

//utiliser les routers
app.use(RouterClient)
app.use(RouterCoiffeur)
app.use(routerPages)

app.use(routerAuthentificationServer.routerLoginRegister)
app.use(routerAuthentificationServer.checkEmail)


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

