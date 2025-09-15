import { insertionNav }  from "../communPublic.js"

document.addEventListener("DOMContentLoaded", (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }

  });
let operation = ""
let jour = ""
let idDispoButton = ""
async function afficherInfo() {
    const url = "http://localhost:3000/mesDisponibilite"
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + token
      }
    });
    if (rep.ok){
      const data = await rep.json();
      const disponibilite = data.disponibilite
      document.getElementById("MesDispo").innerHTML += `
      <h1 class="label"  style="margin-top: 80px; color: white !important;">Mes Disponibilites</h1>
      <div class="box is-rounded dispo-container" style="background-color: #393e46;">
          <table class="table" id="Tableau">
              <thead>
                  <tr>
                      <th>Jour</th>
                      <th>Heures</th>
                  </tr>
              </thead>
              <tbody id="Tbody">
              <tr><td>Lundi</td> <td id="Lundi"></td></tr>
              <tr ><td>Mardi</td> <td id="Mardi"></td></tr>
              <tr ><td>Mercredi</td> <td id="Mercredi"></td></tr>
              <tr ><td>Jeudi</td> <td id="Jeudi"></td></tr>
              <tr ><td>Vendredi</td> <td id="Vendredi"></td></tr>
              <tr ><td>Samedi</td> <td id="Samedi"></td></tr>
              <tr ><td>Dimanche</td> <td id="Dimanche"></td></tr>
              </tbody>
          </table>
        </div>
          `

          disponibilite.forEach(dispo => {
            const buttonId = dispo.idDisponibilite;
            const button = document.createElement('button');
            button.id = buttonId;
            button.className = 'button is-rounded';
            button.value = dispo.idDisponibilite;
            button.style.marginLeft = '0.4em'
            const span = document.createElement('span');
            span.textContent = dispo.heure;
            button.appendChild(span);
            const container = document.getElementById(dispo.jour);
            container.appendChild(button);
            const but = document.getElementById(buttonId)

            button.addEventListener('mouseenter', function() {
                button.style.transform = 'scale(1.1)'
            });
            button.addEventListener('mouseleave', function() {
              button.style.transform = 'scale(1)'
            });

            but.addEventListener('click', () => {
              console.log(but.value);
              if (but.value !== idDispoButton) {
                  if (idDispoButton) {
                      document.getElementById(idDispoButton).style.backgroundColor = "#EEEEEE";
                  }
                  but.style.backgroundColor = "#FD7014";
                  idDispoButton = but.value;
              } else {
                  document.getElementById(idDispoButton).style.backgroundColor = "#EEEEEE";
                  idDispoButton = '';
              }
          });
          
          
        });
        
      
    }

    disponibilite.forEach(dispo => {
      const buttonId = dispo.idDisponibilite;
      const button = document.createElement('button');
      button.id = buttonId;
      button.className = 'button is-rounded';
      button.value = dispo.idDisponibilite;
      const span = document.createElement('span');
      span.textContent = dispo.heure;
      button.appendChild(span);
      const container = document.getElementById(dispo.jour);
      container.appendChild(button);
      console.log(button);
  });
  

}


function afficherChoix(type) {
  operation = type
  document.getElementById("modifer").style.display = "none"
  document.getElementById("Supprimer").style.display = "none"
  document.getElementById("Ajouter").style.display = "none"
  document.getElementById("ContinuerBouton").style.display = "inline"
  document.getElementById("AnnulerButton").style.display = "inline"

  document.getElementById("MesDispo").innerHTML = ""
  
  document.getElementById("MesDispo").innerHTML = `
  <h3 style="color: white;">Quel jour souhaiteriez vous modifier/ajouter ?</h3>
  <div class="select is-rounded">
      <select id="jourSelectionne">
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
      </select>
  </div>
  `
}

async function Continuer(){
  document.getElementById("ContinuerBouton").style.display = "none"
  document.getElementById("AccepterButton").style.display = "inline"
  document.getElementById("AnnulerButton").style.display = "inline"

  jour = document.getElementById("jourSelectionne").value

  document.getElementById("MesDispo").innerHTML = ""

  const url = `http://localhost:3000/afficherSalonById`
  const token = sessionStorage.getItem("token");
  const rep = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
  });
  if (rep.ok){
    const data = await rep.json();
    const salonCoiffure = data
    const heureOuverture = parseInt(salonCoiffure[0].heureOuverture)

    const heureFermeture = parseInt(salonCoiffure[0].heureFermeture)

    const difference = heureFermeture - heureOuverture
    var heure = heureOuverture

    const heures = []
    for(let i = 0; i < difference - 1 ; i++){
      heure = heure + 1
      heures.push(heure)
    }
    document.getElementById("MesDispo").innerHTML = `
    <h3 style=" color: white;">Choisissez l'heure</h3>
    <div class="select is-rounded">
      <select id="SelectHeures">
      </select>
    </div>
    `
    heures.forEach(h => {
      document.getElementById("SelectHeures").innerHTML += ` 
        <option>${h}:00</option>
      `
    }); 

  }
}

function annuler() {
  document.getElementById("ContinuerBouton").style.display = "none"
  document.getElementById("AccepterButton").style.display = "none"
  document.getElementById("AnnulerButton").style.display = "none"
  document.getElementById("modifer").style.display = "inline"
  document.getElementById("Ajouter").style.display = "inline"
  document.getElementById("Supprimer").style.display = "inline"

  document.getElementById("MesDispo").innerHTML = ""

  afficherInfo()
}

async function Accepter() {
  document.getElementById("AccepterButton").style.display = "none"
  document.getElementById("AnnulerButton").style.display = "none"
  document.getElementById("modifer").style.display = "inline"
  document.getElementById("Supprimer").style.display = "inline"
  document.getElementById("Ajouter").style.display = "inline"

  const SelectedHeure = document.getElementById("SelectHeures").value

  if(operation === "Ajouter"){
    ajouterDispo(jour,SelectedHeure) 
  }else{
    console.log(modif)
  }

  document.getElementById("MesDispo").innerHTML = ""
  afficherInfo()

}


const Supprimer = async (idDispoButton) => {
  try{


    if(idDispoButton) {
      const url = "http://localhost:3000/deleteDisponibilite"
      const token = sessionStorage.getItem("token");
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({idDisponibilite: idDispoButton})
      });
      if(response.ok) {
        location.href = "/Disponibilite"
      }
    }
  }catch(err){
    console.error(err)
  }
}

async function ajouterDispo(jour,heure){
  try{

    const url = "http://localhost:3000/ajoutdisponibilite"
    const token = sessionStorage.getItem("token");
    await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
      },
      body: JSON.stringify({jour:jour,heure:heure})
    });
  
  }catch(err){
    console.error(err)
  }

}

async function modifierdispo(jour,heure){
  try{

    const url = "http://localhost:3000/modifDisponibilite"
    const token = sessionStorage.getItem("token");
    await fetch(url, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
      },
      body: JSON.stringify({jour:jour,heure})
    });
  
  }catch(err){
    console.error(err)
  }

}
async function getjours(){
  try{
  const url = "http://localhost:3000/mesDisponibilite"
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + token
      }
    });
    if (rep.ok){
      const data = await rep.json();
      const disponibilite = data.disponibilite
      const ListeJour = []
      disponibilite.forEach(dispo => {
        ListeJour.push(dispo.jour)  
      });
      return ListeJour
    }
  }catch(err){
    console.error(err)
  }

}


 
document.getElementById("AnnulerButton").addEventListener("click", annuler);
document.getElementById("AccepterButton").addEventListener("click", Accepter);
document.getElementById("modifer").addEventListener("click",() => {afficherChoix("Modifier");});
document.getElementById("Ajouter").addEventListener("click",() => {afficherChoix("Ajouter");});
document.getElementById("Supprimer").addEventListener("click",() => {Supprimer(idDispoButton);});
document.getElementById("ContinuerBouton").addEventListener("click", Continuer)
document.addEventListener("DOMContentLoaded", (event) => {
  afficherInfo()
})