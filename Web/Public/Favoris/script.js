import { insertionNav }  from "../communPublic.js"

const type = sessionStorage.getItem('userType');

document.addEventListener("DOMContentLoaded", (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }
  });

  async function afficherFavoris() {
    const url = `http://localhost:3000/afficherfavoris`;
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
      },
    });

    if (rep.ok) {
        const data = await rep.json();
        const MesFavoris = data.favoris
        if(MesFavoris == ""){
          const Coiffeur = `    <div class="container content has-text-centered">
          <h1 class="label" style="color: white !important;" >Vous n'avez aucun coiffeur favoris</h1>
          </div>`
          document.getElementById("CoiffeursFavoris").innerHTML += Coiffeur;
        }
        MesFavoris.forEach((favoris) => {
            const Coiffeur = `
            <a href="/ProfileCoiffeur?who=${favoris.idCoiffeur}">
                <div class="card large">
                    <div class="card-image">
                        <figure class="image is-square">
                            <img src="${favoris.pdp}" alt="${favoris.nom}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4 no-padding"style="color: white !important;">${favoris.nom} ${favoris.prenom}</p> 
                                <p class="is-6" style="color: white !important;"><b>Email:</b> ${favoris.email}</p>
                                <p class="is-6" style="color: white !important;"><b>Tel:</b> ${favoris.numero}</p>
                                <button class='button is-rounded is-danger'>Retirer Des Favoris</button>
                            </div>
                        </div>
                    </div>
                </div>
                </a>`;

            const coiffeurdiv = document.createElement('div');
            coiffeurdiv.className = 'column is-3'; 
            coiffeurdiv.innerHTML = Coiffeur;

            const buttonElement = coiffeurdiv.querySelector('button');
            buttonElement.addEventListener('click', () => RetirerFavoris(favoris.idFavoris, favoris.nom, favoris.prenom));
        
            document.getElementById("CoiffeursFavoris").appendChild(coiffeurdiv);
        });
    } else {
        console.error("une erreur s'est produite");
    }
}


async function RetirerFavoris(idFavoris,nom,prenom){
  const confirmed = window.confirm(`Etes-vous sur de vouloir enlever ${nom} ${prenom} des favoris?`);
  if (!confirmed) {
    return; 
  }

  try {
    const url = "http://localhost:3000/supprimerfavoris"
    const token = sessionStorage.getItem("token");
    await fetch(url, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
      },
      body: JSON.stringify({idFavoris:idFavoris})
    });
    document.getElementById("CoiffeursFavoris").innerHTML = "";
    afficherFavoris()
  } catch (error) {
    console.error(error)
  }

}


document.addEventListener("DOMContentLoaded", (event) => {
  afficherFavoris()
})