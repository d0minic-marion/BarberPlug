import { insertionNav }  from "../communPublic.js"

document.addEventListener("DOMContentLoaded", (event) => {
    insertionNav();
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }

});

const ajouterbtn = document.getElementById("AjouterBtn")

//afficher les services
async function afficherService(){
  const url = `http://localhost:3000/afficherServiceByCoiffeurId`
  const token = sessionStorage.getItem("token");
  const rep = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
  });
  if (rep.ok){
    const data = await rep.json();
    data.forEach(service => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${service.coupe}</td>
        <td>${service.tarif}</td>
        <td> <button class='button is-rounded is-danger annuler-button'>Annuler</button> </td>`;

      tr.querySelector('.annuler-button').addEventListener('click', () => removeService(service.idService))

      document.getElementById("Tbody").appendChild(tr);
    });
  }
}
//ajouter un service
async function addService(){
  const coupe = document.getElementById("CoupeInput").value
  const tarif = parseInt(document.getElementById("TarifInput").value)

  if(coupe == "" || tarif == ""){
    document.getElementById("Erreur").style.display = "block"
    return
  }else if(tarif < 0){
    document.getElementById("ErreurNegatif").style.display = "block"
    return
  }else{
    document.getElementById("Erreur").style.display = "none"
    document.getElementById("ErreurNegatif").style.display = "none"
  }
  

  try {
    const url = `http://localhost:3000/ajouterService`
    const token = sessionStorage.getItem("token");
    const rep = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    },    
    body: JSON.stringify({ coupe, tarif })
    });

    if(rep.ok){
      location.href = "/Services"
    }


  } catch (error) {
    console.error(error)
  }
  }

//retirer un service
async function removeService(idService){
  try{
    const url = "http://localhost:3000/supprimerServiceById"
    const token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({id: idService})
    });
    if(response.ok) {
      location.href = "/Services"
    }
  }catch(err){
    console.error(err)
  }
}

ajouterbtn.addEventListener("click", addService)

document.addEventListener("DOMContentLoaded", (event) => {
  afficherService()
})
