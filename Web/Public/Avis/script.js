import { insertionNav }  from "../communPublic.js"

const type = sessionStorage.getItem('userType');

document.addEventListener("DOMContentLoaded", (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }
    if(type==='Coiffeur') { 
      document.getElementById('buttons').style.display = 'none';
    }
  });

async function afficherInfo() {
    const url = `http://localhost:3000/mesAvis_${type}`
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + token
      }
    });
    if (rep.ok){
      const data = await rep.json();
      const Avis = data.avis

      Avis.forEach(avis => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${avis.nom}</td>
          <td>${avis.prenom}</td>
          <td>${NombreEtoile(avis.etoile)}</td>
          <td>${avis.commentaire}</td>
          <td>
          <input type="radio" class="label1" name="avisBoutton" data-avisid="${avis.idAvis}" value="Client">
        </td>
        
        `;

        document.getElementById("Tbody").appendChild(tr);

        document.getElementById("Supprimer").addEventListener("click", async () => {
          const radioInput = document.querySelector('.label1:checked');
          if (radioInput) {
            const avisId = radioInput.dataset.avisid;
        
            setTimeout(async () => {
              try {
                const response = await fetch(`/supprimerAvis`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({ idAvis: avisId })
                });
        
                if (response.ok) { 
                  window.location.reload()
                  console.log("Row deleted successfully");
                } else {
                  console.error('Failed to delete avis:', response.statusText);
                }
              } catch (error) {
                console.error('Error deleting avis:', error);
              }
            }, 500);
          } else {
            console.log("No radio input is selected.");
          }
        });
              
      });
      
    }

}

function NombreEtoile(nombre) {
  let etoiles = '';
  for (let i = 0; i < nombre; i++) {
    etoiles += '★'; 
  }
  for (let i = nombre; i < 5; i++) {
    etoiles += '☆';
  }
  return etoiles;
}



document.addEventListener("DOMContentLoaded", (event) => {
  afficherInfo()
})