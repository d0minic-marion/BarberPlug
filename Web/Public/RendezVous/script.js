import { insertionNav }  from "../communPublic.js"

const type = sessionStorage.getItem('userType');

document.addEventListener("DOMContentLoaded", (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }
    if(type === "Client"){
      const th = document.createElement("th")
  
      th.innerHTML = `Annuler`
    
      document.getElementById("TheadTR").appendChild(th)  
    }

  });



async function afficherInfo() {
    const url = `http://localhost:3000/mesRendezVous_${type}`
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    },
    });
    if (rep.ok){
      const data = await rep.json();
      console.log(data)
      const RendezVous = data.RendezVous

      if(RendezVous == ""){
        const RendezVous = ` <div class="container content has-text-centered">
        <h1 class="label" style="color: white !important;" >Vous n'avez aucun rendez vous</h1>
        <a href="/recherche/?rechercheValue=" style="color: white !important;"><span> Planifiez un Rendez-Vous</span></a>
        </div>`
        document.getElementById("MesRendezVous").innerHTML += RendezVous;
      }
      RendezVous.forEach(rendezvous => {
        if(type=="Client"){
          const RendezVous =  `
          <a href="/ProfileCoiffeur?who=${rendezvous.idCoiffeur}">
          <div id="boxRDV" class="card is-rounded">
          <div class="card-content">
              <div class="media">
                  <div class="media-content">
                      <p class="title is-4 no-padding" style="color: white !important;">${rendezvous.nom} ${rendezvous.prenom}</p> 
                      <p class="is-6" style="color: white !important;"><b>Email:</b> ${rendezvous.email}</p>
                      <p class="is-6" style="color: white !important;"><b>Tel:</b> ${rendezvous.numero}</p>
                      <p class="is-6" style="color: white !important;"><b>Date:</b> ${rendezvous.date}</p>
                      <button class='button is-rounded is-danger'>Annuler</button>
                  </div>
              </div>
          </div>
        </div>
      </a>`
      const RDVdiv = document.createElement('div');
      RDVdiv.className = 'column is-3'; 
      RDVdiv.innerHTML = RendezVous;

      const buttonElement = RDVdiv.querySelector('button');
      buttonElement.addEventListener('click', () => AnnulerRendezVous(rendezvous.idRendezVous, rendezvous.nom, rendezvous.prenom));
      document.getElementById("MesRendezVous").appendChild(RDVdiv);

      
        }else{
          document.getElementById("MesRendezVous").innerHTML +=   `
          <div id="boxRDV" class="card is-rounded">
          <div class="card-content">
              <div class="media">
                  <div class="media-content">
                      <p class="title is-4 no-padding" style="color: white !important;">${rendezvous.nom} ${rendezvous.prenom}</p> 
                      <p class="is-6" style="color: white !important;"><b>Email:</b> ${rendezvous.email}</p>
                      <p class="is-6" style="color: white !important;"><b>Tel:</b> ${rendezvous.numero}</p>
                      <p class="is-6" style="color: white !important;"><b>Date:</b> ${rendezvous.date}</p>
                  </div>
              </div>
          </div>
      </div>`
          }
      });
      
    }

}


document.addEventListener("DOMContentLoaded", (event) => {
  afficherInfo()
})