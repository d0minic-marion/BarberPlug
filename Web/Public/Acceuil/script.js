import { insertionNav }  from "../communPublic.js"

document.addEventListener("DOMContentLoaded", (event) => {
  insertionNav();
  const button = document.getElementById('creerCompte');
  if(sessionStorage.getItem('token')) {
    button.innerText = 'Allez au Dashboard'
    button.addEventListener('click', () => {location.href = '/Dashboard'})
      } else {
        button.addEventListener('click', () => {location.href = '/authentification'})

      }
});


const shuffle = (array) => { 
  const shuffledArray = [...array]; // Crée une copie du tableau d'origine

  for (let i = shuffledArray.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
  } 
  return shuffledArray; 
}; 


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


const afficherAvis = async () => {
  const avis = document.getElementById("avis");
  const data = await fetch('http://localhost:3000/lesAvis');
  const response = await data.json();
  if (response.avis.lenght == 0) {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <h3>Aucun avis disponibl</h3>
    `
    avis.appendChild(newDiv)
  }
  const newArray = []
  response.avis.forEach(element => {
    for(let i = 0; i<10;i++) {
      newArray.push(element)
    }
  });

  const finalResponse = shuffle(newArray)

  for(let i = 0; i<50;i++){
    const newDiv = document.createElement('div');
    newDiv.className = "lesAvis"
    newDiv.innerHTML = `
    <h3>${finalResponse[i].nom} ${finalResponse[i].prenom}</h3>
    <h3 style="color: #FD7014">${NombreEtoile(finalResponse[i].etoile)}</h3>  
    <h3>${finalResponse[i].commentaire}</h3>
    `

    avis.appendChild(newDiv)

  }
}


afficherAvis()