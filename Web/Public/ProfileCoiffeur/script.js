import { insertionNav } from "../communPublic.js";

const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get("who");



document.addEventListener("DOMContentLoaded", async (event) => {
  insertionNav();
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("userType")) {
    window.location.href = "/authentification";
  }
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("who");
  const coiffeurData = await fetchCoiffeur(paramValue);
  const salonInfoData = await fetchSalonCoiffeur(paramValue);
  if (coiffeurData && coiffeurData.CoiffeurInfo.length > 0) {
    afficherListeCoiffeur(coiffeurData.CoiffeurInfo[0], salonInfoData);
    afficherBtn();
  } else {
    console.log("test");
    window.location.href = "/Recherche/?rechercheValue=";
  }
  document.getElementById("prendreRendezVous").addEventListener("click", async () => {
    console.log(document.getElementById("disponibilite").value);
  });
});

// Fonction pour récupérer les favoris d'un utilisateur
async function fetchFavoris() {
  try {
    const url = "http://localhost:3000/afficherfavoris";
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (rep.ok) {
      const data = await rep.json();
      return data.favoris;
    }
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour récupérer les informations d'un coiffeur
const fetchCoiffeur = async (coiffeurId) => {
  try {
    const CoiffeurBD = await fetch(`http://localhost:3000/profileCoiffeur/${coiffeurId}`);
    const response = await CoiffeurBD.json();
    return response;
  } catch (error) {
    console.error("erreur lors du chargement des coiffeur: ", error);
  }
};

// Fonction pour récupérer les informations du salon d'un coiffeur
const fetchSalonCoiffeur = async (coiffeurId) => {
  try {
    const CoiffeurBD = await fetch(`http://localhost:3000/salonCoiffeur/${coiffeurId}`);
    const response = await CoiffeurBD.json();
    return response;
  } catch (error) {
    console.error("erreur lors du chargement des salon de coiffeur: ", error);
  }
};

// Fonction pour afficher les disponibilités d'un coiffeur
const afficherDispo = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("who");
  try {
    const dispoResponse = await fetch(`http://localhost:3000/DisponibiliteParIds/${paramValue}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const dispoData = await dispoResponse.json();
    return dispoData.disponibilite;
  } catch (error) {
    console.error(error);
  }
};

// Fonction pour faire un rendez-vous avec un coiffeur
const faireRendezVous = async (idCoiffeur, date) => {
  try {
    const response = await fetch("http://localhost:3000/faireRendezVous", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ idCoiffeur, date }),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData.message);
    } else {
      throw new Error(responseData.error);
    }
  } catch (error) {
    console.error("Error making the request:", error);
  }
};

// Fonction pour afficher les informations d'un rendez-vous
async function fetchRDV() {
  try {
    const url = "http://localhost:3000/mesRendezVous_Client";
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (rep.ok) {
      const data = await rep.json();
      const { RendezVous } = data;
      return RendezVous;
    }
  } catch (error) {
    console.error(error);
  }
}

async function afficherSoldeCoiffeur()  {
  const url = "http://localhost:3000/recupererSoldeClient"
  const token = sessionStorage.getItem("token");
  const rep = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
  });
  if (rep.ok){
    const data = await rep.json();
    console.log(data)
    const solde = data.ClientInfo[0].montant
    console.log(solde)

    return solde      
  }
}

// Fonction pour afficher les boutons d'interaction avec un coiffeur
async function afficherBtn() {
  const afficherDiv = document.createElement("div");
  afficherDiv.id = "divCoiffeur";

  afficherDiv.innerHTML = `
    <div class="menuCoiffeur" style="${sessionStorage.getItem("userType") !== "Coiffeur" ? "" : "display: none;"}">
      <div class="horaire" id="horaire">
          <Label class="label">Horaire disponible</Label>
          <select class="select" id="disponibilite">
          
          </select>
          <br>
          <button class="button is-black" id="prendreRendezVous" style="display:none; position: relative;">Prendre rendez-vous</button>
          <h3 style="display:none;" id="dejaRendezVous">Vous avez deja un rendez-vous</h3> 
          <a href="/rendezvous" style="display:none; color: white !important;" id="VoirRDV"><span> Voir mes Rendez-Vous</span></a>
      </div>
      <div class='ligneSeparation' id="ligneSeparation"></div>

      <div class="favoris" id="favoris">
            <button class="button is-black" id="ajouterFavoris" style="position: relative">Ajouter un favoris</button><br>
            <h3 style="display:none;" id="dejaFavoris">Ce coiffeur est deja dans vos favoris</h3><br>
            <a href="/favoris" style="display:none; color: white !important;" id="VoirFavoris"> <span>Voir mes favoris</span></a>
      </div>

      <div class="avis" id="divAvis">
        <a href="/Avis" style="color: white !important;" id="VoirAvis"> <span>Voir mes avis</span></a>
        <br>
        <button class="button is-black" id="ajouterAvis" style="position: relative">Ajouter un avis</button><br>
      </div>
      <div>
    
    </div>
    <div class="pageSolde"  style="color: #EEEEEE !important; position: absolute;">
    <div class="Menu" id="Menu" style="display: none">
      <h1>Êtes-vous sûr de vouloir prendre ce rendez-vous ? </h1>
      <h1 style="font-size:22px; margin: 0px" id="infoConfirmation"></h1>
      <h1 style="font-size:20px; margin: 10px" id="infoSolde">Votre solde actuelle: </h1>

      <select class="select" id="service">
          
      </select>
      <button id="confirmerButton" class="button">Confirmer</button>
      <button id="quitterButton" class="button">Quitter</button>
    </div>
</div>        
    `;

  const divBtn = document.getElementById("boutons");
  divBtn.appendChild(afficherDiv);

  // verifie si le coiffeur est deja en favoris et a un rdv
  VerifierFavoris();
  VerifierRDV();

  // document.getElementById("prendreRendezVous").addEventListener("click", async () => { faireRendezVous(paramValue, document.getElementById("disponibilite").value); });
  document.getElementById("prendreRendezVous").addEventListener("click", async () => { 
    if (document.getElementById("disponibilite").value != "") {
      document.getElementById("infoConfirmation").innerHTML += "Pour le : "+document.getElementById("disponibilite").value;
      document.getElementById("infoSolde").innerHTML += await afficherSoldeCoiffeur()+"$";
      document.getElementById("horaire").style.display= "none";
      document.getElementById("favoris").style.display= "none";
      document.getElementById("divAvis").style.display= "none";
      document.getElementById("ligneSeparation").style.display= "none";
      document.getElementById("Menu").style.display= "block";
    } else {
      alert("Aucune Disponnibilite")
    }

   });

    document.getElementById("quitterButton").addEventListener("click", async () => { 
    document.getElementById("infoConfirmation").innerHTML = "";
    document.getElementById("horaire").style.display= "flex";
    document.getElementById("favoris").style.display= "block";
    document.getElementById("divAvis").style.display= "block";
    document.getElementById("ligneSeparation").style.display= "block";
    document.getElementById("Menu").style.display= "none";
   });

async function effectuerTransaction(montant) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const idCoiffeur = urlParams.get('who');
        const response = await fetch("/effectuerTransactionSoldeClientCoiffeur", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({ montant: montant, idCoiffeur: idCoiffeur }),
        });
        const data = await response.json();
        return data.message;
    } catch (error) {
        throw new Error("Erreur lors de la transaction.");
    }
}


  document.getElementById("confirmerButton").addEventListener("click", async () => {
    const selectedTarif = parseFloat(document.getElementById("service").value);


    if(await afficherSoldeCoiffeur() > selectedTarif) {
      try {
        await effectuerTransaction(selectedTarif);
        faireRendezVous(paramValue, document.getElementById("disponibilite").value);location.reload(); 
      } catch (error) {
        console.log('error lors de la transaction:',error)
      }

    } else {
      alert("Solde insuffisant")
    }
  });
  document.getElementById("ajouterFavoris").addEventListener("click", async () => { ajouterFavoris(paramValue); });
  document.getElementById("ajouterFavoris").addEventListener("click", () => { location.reload(); });

  document.getElementById("ajouterAvis").addEventListener("click", () => {
    const avisDropDiv = document.getElementById('divAvis');
    const form = document.createElement('form');
    form.innerHTML = `
      <textarea id="avisContent" rows="2" cols="30" placeholder="Votre avis..." style="resize: none"></textarea> 

        <select id='number-dd' name='number' style="position:absolute; padding-top:7px; padding-bottom:7px">
          <option value='0'>0★</option>
          <option value='1'>1★</option>
          <option value='2'>2★</option>
          <option value='3'>3★</option>
          <option value='4'>4★</option>
          <option value='5'>5★</option>
        </select>
         <br>
      <button type="submit" class="button is-black" id="buttonEnvoyer">Envoyer</button>
    `;
    avisDropDiv.appendChild(form);
    document.getElementById("ajouterAvis").style.display = "none";
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const avisContent = document.getElementById("avisContent").value;
      const starRating = document.getElementById("number-dd").value;
      
      const idClient = 'idClient';
      const urlParams = new URLSearchParams(window.location.search);
      const idCoiffeur = urlParams.get('who');
      

      const requestBody = {
        idClient,
        idCoiffeur,
        etoile: starRating,
        commentaire: avisContent
      };
    
      try {
        const response = await fetch('/ajoutAvis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          const successMessage = document.createElement('p');
          successMessage.textContent = responseData.message;
          form.appendChild(successMessage);
          setTimeout(() => {
            avisDropDiv.removeChild(form);
            window.location.reload();
          }, 500);
        } else {
          console.error('Failed to add avis:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding avis:', error);
      }
    });
  });
}

// Fonction pour vérifier si un coiffeur est déjà en favoris
async function VerifierFavoris() {
  const favoris = await fetchFavoris();
  let favorismatched = false;
  favoris.map((f) => {
    if (f.idCoiffeur == paramValue) {
      favorismatched = true;
    }
  });

  if (favorismatched) {
    document.getElementById("ajouterFavoris").style.display = "none";
    document.getElementById("dejaFavoris").style.display = "inline";
    document.getElementById("VoirFavoris").style.display = "inline";
  } else {
    document.getElementById("ajouterFavoris").style.display = "inline";
    document.getElementById("dejaFavoris").style.display = "none";
    document.getElementById("VoirFavoris").style.display = "none";
  }
}

// Fonction pour vérifier si un utilisateur a déjà un rendez-vous avec un coiffeur
async function VerifierRDV() {
  const rendezvous = await fetchRDV();

  let rendezvousMatched = false;

  rendezvous.forEach((x) => {
    console.log(x);
    if (x.idCoiffeur == paramValue) {
      rendezvousMatched = true;
    }
  });

  if (rendezvousMatched) {
    document.getElementById("dejaRendezVous").style.display = "inline";
    document.getElementById("prendreRendezVous").style.display = "none";
    document.getElementById("VoirRDV").style.display = "inline";
  } else {
    document.getElementById("dejaRendezVous").style.display = "none";
    document.getElementById("prendreRendezVous").style.display = "inline";
  }
}

const fetchServices = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("who");
  try {
    const servicesResponse = await fetch(`http://localhost:3000/afficherServiceByCoiffeurId/${paramValue}`);
    const services  = await servicesResponse.json();
    const serviceSelect = document.getElementById("service");
    services.forEach(service => {
      const option = document.createElement("option");
      option.text = service.coupe+ " " +service.tarif+"$";
      option.value = service.tarif; 
      serviceSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
};

// Fonc

// Fonction pour afficher les informations d'un coiffeur
const afficherListeCoiffeur = async (coiffeurInfo, salonInfos) => {
  const salonInfo = salonInfos.salonCoiffure[0];
  const { nom, prenom, numero, email, pdp, bio } = coiffeurInfo;
  const { nomSalon, adresseSalon, heureOuverture, heureFermeture } = salonInfo;

  document.getElementById("NomProfil").innerText = `${prenom} ${nom}`;
  const dispo = await afficherDispo();
  const afficherDiv = document.createElement("div");
  afficherDiv.id = "divCoiffeur";
  afficherDiv.classList.add("columns");
  afficherDiv.innerHTML = `
        <div class='menu'>
          <img class="columnPDP" src="${pdp || "placeholder.jpg"}"></img>
          <div class="column2">
            <h1>Nom du Salon : ${nomSalon}</h1>
            <h3>Adresse du Salon : ${adresseSalon}</h3>
            <h3>Heure d'Ouverture : ${heureOuverture}</h3>
            <h3>Heure de Fermeture : ${heureFermeture}</h3>
          </div>
        </div>
        
        <div class="columnsbox">
            <div class="column1">
                <h1>Information sur le Coiffeur </h1>
                <h3>Nom : ${nom}</h1>
                <h3>Prenom : ${prenom}</h1>
                <h3 class="email">Email : ${email}</h3>
                <h3 class="numero">Telephone : ${numero}</h3>
                <h3 class="text">Bio : ${bio}</h3>
            </div>
        </div>
        `;

  const services = await fetchServices();

  const divCoiffeur = document.getElementById("Profile");
  afficherDispo();
  divCoiffeur.appendChild(afficherDiv);
  dispo.map((disponible) => {
    console.log(disponible);
    const option = document.createElement("option");
    option.text = `${disponible.jour}, ` + `Heure: ${disponible.heure}`;
    document.getElementById("disponibilite").appendChild(option);
  });
  
};



// Fonction pour ajouter un coiffeur en favoris
async function ajouterFavoris(idCoiffeur) {
  console.log(idCoiffeur);
  try {
    const url = "http://localhost:3000/ajouterfavoris";
    const token = sessionStorage.getItem("token");
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ idCoiffeur }),
    });
  } catch (error) {
    console.error(error);
  }
}
