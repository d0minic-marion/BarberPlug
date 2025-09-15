
const errorLogin = document.getElementById("errorLogin")

const checkLogin = () => {
    const email = document.getElementById('email')
    if (email.value != "" && document.getElementById('password').value != "" && email.value.includes('@') && email.value.includes('.')) {
        const data = {email : document.getElementById('email').value.toLowerCase(), mdp : document.getElementById('password').value}
        connectionBD(data)
        errorLogin.style.visibility = "hidden";
    } else if (document.getElementById('email').value == "") {
        errorLogin.style.visibility = "visible";
    } else if (document.getElementById('password').value == ""){
        errorLogin.style.visibility = "visible";

    }
}




const checkClient = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:3000/loginClient', options);
        const responseData = await response.json();
        switch (responseData.message) {
            case "les information de connections sont invalide":
                return false
                break
            case "L'utilisateur existe pas":
                return false
                break
            case "Utilisateur connecte":
                return responseData
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    }
}


const checkCoiffeur = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:3000/loginCoiffeur', options);
        const responseData = await response.json();
        switch (responseData.message) {
            case "les information de connections sont invalide":
                return false
                break
            case "L'utilisateur existe pas":
                return false
                break
            case "Utilisateur connecte":
                return responseData
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    }
}
const connectionBD = async (data) => {
    console.log(data);
    const checkClientData = await checkClient(data);
    const checkCoiffeurData = await checkCoiffeur(data);
    console.log(checkClientData.token)
    console.log(checkCoiffeurData.token)

    if (checkClientData) {
        console.log("Login en tant que Client: ", checkClientData);
        sessionStorage.setItem('token', checkClientData.token);
        sessionStorage.setItem('userType', 'Client');
        window.location.href = "/Dashboard"
    } else if (checkCoiffeurData) {
        console.log("Login en tant que Coiffeur: ", checkCoiffeurData);
        sessionStorage.setItem('token', checkCoiffeurData.token);
        sessionStorage.setItem('userType', 'Coiffeur');
        window.location.href = "/Dashboard"

    } else {
        document.getElementById("errorLogin").style.visibility = "visible";
    }
};




export {checkLogin}