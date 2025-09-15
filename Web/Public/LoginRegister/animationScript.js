
//Permet de faire l'animation et de separer login et register
const LoginRegister = () => {
    [CreateAccount, LoginAccount].forEach((x) => {
        document.getElementById('login').style.transition = 'opacity 0.5s ease-in-out';
        document.getElementById('login').style.opacity = '1';
        x.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(event.target.id);
            switch (event.target.id) {
                case 'LoginAccount':
                    document.getElementById("errorRegister").style.visibility = "hidden";
                    document.getElementById("errorMessage").style.visibility = "hidden";
                    document.getElementById('login').style.transition = 'opacity 0.5s ease-in-out';
                    document.getElementById('register').style.transition = '';
                    document.getElementById('register').style.opacity = '0';
                    document.getElementById('login').style.opacity = '1';
                    document.getElementById('register').style.visibility = 'hidden';
                    document.getElementById('login').style.visibility = 'visible';
                    break;
                case 'CreateAccount':
                    for (let i = 0 ; i < 24 ; i++) {
                        let option = document.createElement("option");
                        let option2 = document.createElement("option");
                        option.value = (i < 10 ? '0' : '') + i + ":" + "00";
                        option.text = (i < 10 ? '0' : '') + i + ":" + "00";
                        option2.value = (i < 10 ? '0' : '') + i + ":" + "00";
                        option2.text = (i < 10 ? '0' : '') + i + ":" + "00";
                        document.getElementById("heureOuvertureRig").appendChild(option)
                        document.getElementById("heureFermeture").appendChild(option2)

                    }
                    document.getElementById("errorLogin").style.visibility = "hidden";
                    document.getElementById('register').style.transition = 'opacity 0.5s ease-in-out';
                    document.getElementById('login').style.transition = '';
                    document.getElementById('login').style.opacity = '0';
                    document.getElementById('register').style.opacity = '1';
                    document.getElementById('register').style.visibility = 'visible';
                    document.getElementById('login').style.visibility = 'hidden';
                    break;
                default:
                    break;
            }
        });
    });
    
}



export { LoginRegister };
