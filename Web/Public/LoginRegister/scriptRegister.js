

//permet de savoir si le client veut creer un compte client ou coiffeur
const checkCLientOrBarber = () => {
    const valuee = document.querySelector('input[name="clientCoiffeur"]:checked').value;
    return valuee;
}


document.getElementById('emailReg').addEventListener('change', ()=>{document.getElementById('errorEmail').style.visibility = "hidden"})
document.getElementById("succes").style.visibility = "hidden";

const checkRegister = () => {
    const quelleType = checkCLientOrBarber();
    let lesErreurs = [];
    let div = document.getElementById("inputRegister");
    let confirmation = true; // Start with true
    let inputs = Array.from(div.getElementsByTagName("input"));
    inputs.forEach(element => {
        if(quelleType == "Client") {
            if ((element.value === "" && element.parentNode.id !=="divCoiffeur") ||
            (element.type === 'email' && (!element.value.includes('@') || !element.value.includes('.'))) ||
            (element.type === 'tel' && !isValidPhoneNumber(element.value))) {
            lesErreurs.push(element.placeholder);
            document.getElementById("errorRegister").style.visibility = "visible";
            document.getElementById("errorMessage").style.visibility = "visible";
            document.getElementById("errorMessage").innerHTML = lesErreurs;
            confirmation = false; 
            } else {
                document.getElementById("errorRegister").style.visibility = "visible";
                document.getElementById("errorMessage").style.visibility = "visible";
            }
        } else {
            if ((element.value === "") ||
            (element.type === 'email' && (!element.value.includes('@') || !element.value.includes('.'))) ||
            (element.type === 'tel' && !isValidPhoneNumber(element.value))) {
            lesErreurs.push(element.placeholder);
            document.getElementById("errorRegister").style.visibility = "visible";
            document.getElementById("errorMessage").style.visibility = "visible";
            document.getElementById("errorMessage").innerHTML = lesErreurs;
            confirmation = false; 
            } else {
                document.getElementById("errorRegister").style.visibility = "visible";
                document.getElementById("errorMessage").style.visibility = "visible";
            }
        }

    });
    if (lesErreurs.length == 0) {
        document.getElementById("errorRegister").style.visibility = "hidden";
        document.getElementById("errorMessage").style.visibility = "hidden";
    }

    if (confirmation) {
        const data = {
            nom: document.getElementById('nomReg').value,
            prenom: document.getElementById('prenomReg').value,
            email: document.getElementById('emailReg').value.toLowerCase(),
            mdp: document.getElementById('mdpReg').value,
            numero: document.getElementById('telephoneRig').value
        };
        connectionBD(data, quelleType);
    }
}

function isValidPhoneNumber(phoneNumber) {
    return /^\d{3}-\d{3}-\d{4}$/.test(phoneNumber);
}

const registerCoiffeur = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:3000/registerCoiffeur', options);
        const responseData = await response.json();
        switch (responseData.message) {
            case "L'utilisateur existe deja":
                return false
                break
            case "utilisateur créé avec succes":
                return true
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    }
}


const registerClient = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:3000/registerClient', options);
        const responseData = await response.json();
        console.log(responseData)
        switch (responseData.message) {
            case "L'utilisateur existe deja":
                return false
                break
            case "utilisateur créé avec succes":
                return true
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    }
}

async function checkEmailExists(email) {
    try {
        const response = await fetch('/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        return data.exists;
    } catch (error) {
        throw error;
    }
}




const connectionBD = async (data, quelleType) => {
    const newData = {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        mdp: data.mdp,
        numero: data.numero,
        pdp: "https://i.redd.it/7ayjc8s4j2n61.png",
        bio: "Changer la bio.",
        nomSalon: document.getElementById('salonRig').value,
        adresseSalon: document.getElementById('adresseRig').value,
        heureOuverture: document.getElementById('heureOuvertureRig').value,
        heureFermeture: document.getElementById('heureFermeture').value

    };
    const emailExists = await checkEmailExists(data.email);
    if (quelleType == "Client") {
        if (!emailExists && await registerClient(data)) {
            document.getElementById("errorEmail").style.visibility = "hidden";
            document.getElementById("succes").style.visibility = "visible";
            location.reload();
        } else {
            document.getElementById("errorEmail").style.visibility = "visible";        
        }
    } else if (quelleType == "Coiffeur") {
        if (!emailExists && await registerCoiffeur(newData)) {
            document.getElementById("errorEmail").style.visibility = "hidden";  
            document.getElementById("succes").style.visibility = "visible";
            location.reload();    
        } else {
            document.getElementById("errorEmail").style.visibility = "visible";        
   
        }    
    } 
};


export { checkCLientOrBarber,checkRegister};
