import { insertionNav }  from "../communPublic.js"

document.addEventListener("DOMContentLoaded", async (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }

    const coiffeursData = await fetchCoiffeur()

    buttonAfficher(coiffeursData)

    const urlParams = new URLSearchParams(window.location.search)
    const paramValue = urlParams.get('rechercheValue');

    if(paramValue == "") {
      afficherListeCoiffeur(coiffeursData);
    } else {
      const newCoiffeursData = coiffeursData.filter(coiffeur => coiffeur.nom.toLowerCase().includes(paramValue) || coiffeur.prenom.toLowerCase().includes(paramValue))
      afficherListeCoiffeur(newCoiffeursData);
      if(newCoiffeursData.length == 0) {
        erreur()
      }
    }

  });


const fetchCoiffeur = async () => {
  const CoiffeurBD = await fetch('http://localhost:3000/recupererCoiffeurs')
  const response =  await CoiffeurBD.json()
  return response
}

const buttonAfficher = (coiffeursData) => {
  document.getElementById("rechercherCoiffeur").addEventListener("click", () => {
    const inputValue = document.getElementById("valueCoiffeur").value.toLowerCase(); 
    const newCoiffeurs = coiffeursData.filter(coiffeur => coiffeur.nom.toLowerCase().includes(inputValue) || coiffeur.prenom.toLowerCase().includes(inputValue));
    afficherListeCoiffeur(newCoiffeurs);
    if(newCoiffeurs.length == 0) {
      erreur()
    }
  });
}



const erreur = () => {
    const afficherDiv = document.createElement('div');
    afficherDiv.id = "divCoiffeur";
    afficherDiv.innerHTML = `
        <h1>Aucun Coiffeurs Trouver!</h1>

    `;
    const divCoiffeur = document.getElementById("lesCoiffeur");
    divCoiffeur.appendChild(afficherDiv);
}

const afficherListeCoiffeur = (coiffeurs) => {
  document.getElementById("lesCoiffeur").innerHTML = "";
console.log(coiffeurs)
  let counter = 0;
  coiffeurs.map((data) => {
    console.log(data)
    const id = data.idCoiffeur;   
    const nom = data.nom;   
    const prenom = data.prenom;
    const numero = data.numero;
    const email = data.email;
    const pdp = data.pdp;

    const afficherDiv = document.createElement('div');
    afficherDiv.id = `divCoiffeur-${counter}`;
    afficherDiv.innerHTML = `
    <a href="/ProfileCoiffeur?who=${id}">
    <div class="card large">
                    <div class="card-image">
                        <figure class="image is-square">
                            <img src="${pdp}" alt="${nom}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4 no-padding"style="color: white !important;">${nom} ${prenom}</p> 
                                <p class="is-6" style="color: white !important;"><b>Email:</b> ${email}</p>
                                <p class="is-6" style="color: white !important;"><b>Tel:</b> ${numero}</p>
                            </div>
                        </div>
                    </div>
      </div>
      </a>`;

    const divCoiffeur = document.getElementById("lesCoiffeur");
    divCoiffeur.appendChild(afficherDiv);

    const h3 = afficherDiv.querySelector('.is-6');
    let currentFontSize = parseFloat(window.getComputedStyle(h3).fontSize);
    while (h3.scrollWidth > h3.offsetWidth && currentFontSize > 8) {
      currentFontSize -= 1;
      h3.style.fontSize = currentFontSize + "px";
    }
    counter++;

  });
};
