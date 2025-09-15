import { insertionNav }  from "../communPublic.js"

const type = sessionStorage.getItem('userType');

let imageURL;


document.addEventListener("DOMContentLoaded", async (event) => {
    insertionNav();
    document.getElementById("type").innerHTML = type
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('userType')) {
      window.location.href = "/authentification"
    }
    recuperCLient()
    if (type == "Client") {
      let userDataa = await recuperCLient();
      let userData = userDataa.ClientInfo[0]
      document.getElementById("prenomReg").placeholder = userData.prenom;
      document.getElementById("nomReg").placeholder = userData.nom;
      document.getElementById("emailReg").placeholder = userData.email;
      document.getElementById("mdpReg").placeholder = "*****************";
      document.getElementById("telephoneReg").placeholder = userData.numero;
      document.getElementById("espaceCoiffeur2").style.display = "none";
      document.getElementById("espaceCoiffeur1").style.display = "none";

      document.getElementById("prenomRig").value = userData.prenom;
      document.getElementById("nomRig").value = userData.nom;
      document.getElementById("emailRig").value = userData.email;
      document.getElementById("mdpRig").value = "*****************";
      document.getElementById("telephoneRig").value = userData.numero;
  
    } else {
      let userDataa = await recuperCLient();
      let userData = userDataa.CoiffeurInfo[0]
      document.getElementById("prenomReg").placeholder = userData.prenom;
      document.getElementById("nomReg").placeholder = userData.nom;
      document.getElementById("emailReg").placeholder = userData.email;
      document.getElementById("mdpReg").placeholder = "•••••••••••";
      document.getElementById("telephoneReg").placeholder = userData.numero;
      document.getElementById("bioInputReg").placeholder = userData.bio;
      document.getElementById("pdp").src = userData.pdp;
      document.getElementById("pdp1").src = userData.pdp;



      document.getElementById("prenomRig").value = userData.prenom;
      document.getElementById("nomRig").value = userData.nom;
      document.getElementById("emailRig").value = userData.email;
      document.getElementById("mdpRig").value = "•••••••••••";
      document.getElementById("telephoneRig").value = userData.numero;
      document.getElementById("bioInputRig").value = userData.bio;

    }

  });



  // const fetchCoiffeur = async () => {
  //   try {
  //     const token = sessionStorage.getItem('token');
  
  //     const CoiffeurBD = await fetch('http://localhost:3000/afficherprofileCoiffeur', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  
  //     if (!CoiffeurBD.ok) {
  //       throw new Error('Failed to fetch profile');
  //     }
  
  //     const response = await CoiffeurBD.json();
  //     return response;
  //   } catch (error) {
  //     console.error('Error fetching coiffeur profile:', error);
  //     // Handle error
  //     return null;
  //   }
  // }

  const recuperCLient = async () => {
    const url = `http://localhost:3000/afficherprofile${sessionStorage.getItem('userType')}`
    const rep = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    });
    const response = await rep.json();
    return response
  }

  
  const afficherInfo = async () => {
    console.log("test");
    if (type == "client") {
      document.getElementById('Profil').style.transition = 'visibility 0s, opacity 0.5s ease-in-out';
      document.getElementById('modificationProfil').style.transition = 'visibility 0s, opacity 0.5s ease-in-out';
      document.getElementById("espaceCoiffeur1").style.visibility = "hidden";
      document.getElementById("espaceCoiffeur2").style.visibility = "hidden";
      document.getElementById("Profil").style.display = "none";
      document.getElementById("Profil").style.opacity = "0";
  
      document.getElementById("modificationProfil").style.display = "block";

      document.getElementById("modificationProfil").style.opacity = "1";

      

  
    } else {
      document.getElementById('Profil').style.transition = 'visibility 0s, opacity 0.5s ease-in-out';
      document.getElementById('modificationProfil').style.transition = 'visibility 0s, opacity 0.5s ease-in-out';
      document.getElementById("espaceCoiffeur1").style.visibility = "visible";
      document.getElementById("espaceCoiffeur2").style.visibility = "hidden";
      document.getElementById("Profil").style.display = "none";
      document.getElementById("Profil").style.opacity = "0";
      document.getElementById("modificationProfil").style.display = "block";
      document.getElementById("modificationProfil").style.opacity = "1";
      document.getElementById("modificationProfil").style.height = "39em";

    }
  }
  
  const annulerModification = () => {
    document.getElementById('Profil').style.display = "block";
    document.getElementById('Profil').style.opacity = "1";
    document.getElementById('modificationProfil').style.display = "none";
    document.getElementById('modificationProfil').style.opacity = "0";
    document.getElementById("espaceCoiffeur2").style.visibility = "visible";
  }

  const envoieModification = async () => {
    const prenom = document.getElementById('prenomRig').value;
    const nom = document.getElementById('nomRig').value;
    const email = document.getElementById('emailRig').value;
    const password = document.getElementById('mdpRig').value;
    const numero = document.getElementById('telephoneRig').value;
    const pdp = imageURL;
    const bio = document.getElementById('bioInputRig').value;



    if (type == "Client") {
      const requestBody = {
        data: {
          prenom,
          nom,
          email,
          numero,
        }
      };
      try {
        const response = await fetch('/modifierprofileClient', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          },
          body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors de la modification des données du Client');
        }
    
        const data = await response.json();
        console.log(data.message);
        window.location.href = "/Profile"
      } catch (error) {
        console.error(error);
      }
    } else {
      const requestBody = {
        data: {
          prenom,
          nom,
          email,
          numero,
          bio,
          pdp
        }
      };
      try {
        const response = await fetch('/modifierprofileCoiffeur', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          },
          body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors de la modification des données du Client');
        }
    
        const data = await response.json();
        console.log(data.message);
        window.location.href = "/Profile"
      } catch (error) {
        console.error(error);
      }
    }

  }


async function modifierMDP() {
  const mdp = document.getElementById('mdpRig').value;
    try {
      const response = await fetch(`/modifierprofile${sessionStorage.getItem('userType')}/motdepasse`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({password: mdp})
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la modification des données du Client');
      }
  
      const data = await response.json();
      console.log(data.message);
      envoieModification()
    } catch (error) {
      console.error(error);
    }
}
  
document.getElementById("AnnulerButton").addEventListener("click", annulerModification);

document.getElementById("modifyButton").addEventListener("click", modifierMDP);



document.getElementById("modifer").addEventListener("click", afficherInfo)


document.getElementById("insertImage").addEventListener('change', async function getUrl() {

  var reader = new FileReader();
  reader.onload = async function() {
    var output = document.getElementById('pdp');
    console.log(reader.result)
    output.src = reader.result;
    imageURL = reader.result;
    const ulvisAPI = "https://ulvis.net/api.php";
    const longURL = imageURL;
    try {
      const response = await fetch(`${ulvisAPI}?url=${encodeURIComponent(longURL)}`);
      const data = await response.json();
      const shortURL = data.url;
      console.log("Shortened URL:", shortURL);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };
  reader.readAsDataURL(event.target.files[0]);
  return reader.result
})
