import { insertionNav }  from "../communPublic.js"

const type = sessionStorage.getItem('userType');

document.addEventListener("DOMContentLoaded", (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }
    if(type == "Coiffeur"){
      document.getElementById("DispoContainer").style.display = "inline"
      document.getElementById("SalonCoiffure").style.display = "inline"
      document.getElementById("afficherButton").style.display = "none"
      afficherSoldeCoiffeur()
      afficherSalonCoiffure()
      afficherDispo()
    }else{
      document.getElementById("PlanifierRendezVous").style.display = "inline"
      afficherSoldeClient()
    }

  });



async function afficherRendezVous() {
    const url = `http://localhost:3000/mesRendezVous_${type}`
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + token
      }
    });
    if (rep.ok){
      const data = await rep.json();
      const RendezVous = data.RendezVous


      RendezVous.forEach(rendezvous => {

          const tr = document.createElement('tr');
  
          tr.innerHTML = `
            <td>${rendezvous.nom}</td>
            <td>${rendezvous.prenom}</td>
            <td>${rendezvous.numero}</td>
            <td>${rendezvous.date}</td>
          `;
          document.getElementById("Tbody").appendChild(tr);
        
      });
      
    }

}

async function afficherDispo() {
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
    disponibilite.forEach(dispo => {
      document.getElementById(dispo.jour).innerHTML += `<span class="tag is-rounded is-large">${dispo.heure}</span> `
    });  
  }
}


async function afficherSoldeClient() {
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
    const solde = data.ClientInfo[0].montant
    document.getElementById("solde").innerHTML += `${solde}`

  }

}


async function afficherSoldeCoiffeur() {
  const url = "http://localhost:3000/recupererSoldeCoiffeur"
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
    const solde = data.CoiffeurInfo[0].montant
    document.getElementById("solde").innerHTML += `${solde}`

  }

}




async function afficherProfile(){
  const url = `http://localhost:3000/afficherprofile${type}`
  const token = sessionStorage.getItem("token");
  const rep = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
  });
  if (rep.ok){
    const data = await rep.json();
    if(type == "Client"){
      const Info = data.ClientInfo

      Info.forEach(profile => {
        document.getElementById("Nom").innerHTML += `${profile.nom}`
        document.getElementById("Prenom").innerHTML += `${profile.prenom}`
        document.getElementById("Numero").innerHTML += `${profile.numero}`
        document.getElementById("Email").innerHTML += `${profile.email}`
      });
    }else{
      const Info = data.CoiffeurInfo

      Info.forEach(profile => {
        document.getElementById("Nom").innerHTML += `${profile.nom}`
        document.getElementById("Prenom").innerHTML += `${profile.prenom}`
        document.getElementById("Numero").innerHTML += `${profile.numero}`
        document.getElementById("Email").innerHTML += `${profile.email}`
      });
    }



    
  }

}

async function afficherSalonCoiffure(){
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

    salonCoiffure.forEach(infoSalon => {
      document.getElementById("NomSalon").innerHTML += `${infoSalon.nomSalon}`
      document.getElementById("AdresseSalon").innerHTML += `${infoSalon.adresseSalon}`
      document.getElementById("HeureOuverture").innerHTML += `${infoSalon.heureOuverture}`
      document.getElementById("HeureFermeture").innerHTML += `${infoSalon.heureFermeture}`
    });
    
  }

}


document.getElementById("afficherButton").addEventListener("click", () => {

  document.getElementById("pageSolde").style.display = "block";
});

document.getElementById("quitBtn").addEventListener("click", () => {
  document.getElementById("pageSolde").style.display = "none";
});
document.getElementById("addFundsBtn").addEventListener("click", async () => {
  const montant = document.getElementById("montant").value.trim(); 
  console.log(montant > 0)
  if (!montant || montant <= 0) {
    console.error("Montant is empty or not greater than 0");
    return;
  }

  try {
    const url = "http://localhost:3000/ajoutSoldeClient";
    const token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ montant: montant })
    });

    if (!response.ok) {
      throw new Error("Failed to add funds. Server responded with " + response.status);
    }

    location.reload()
  } catch (err) {
    console.error("Error adding funds:", err.message);
  }
});




document.addEventListener("DOMContentLoaded", (event) => {
  afficherRendezVous()
  afficherProfile()
})