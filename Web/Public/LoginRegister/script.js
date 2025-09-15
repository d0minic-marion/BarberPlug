const CreateAccount = document.getElementById('CreateAccount');
const LoginAccount = document.getElementById('LoginAccount');

import { checkLogin } from "./scriptLogin.js";
import { LoginRegister } from "./animationScript.js";
import { checkRegister } from "./scriptRegister.js"
import { insertionNav }  from "../communPublic.js"

document.addEventListener("DOMContentLoaded", (event) => {
    LoginRegister();
    insertionNav();
    if(sessionStorage.getItem('token') || sessionStorage.getItem('userType')) {
      window.location.href = "/"
    }
  });

const radioButtons = document.querySelectorAll('.clientCoiffeurButton input[type="radio"]');

radioButtons.forEach((radio) => {
  radio.addEventListener('change', ()=> {
    console.log(radio.value);
    if(radio.value=="Client") {
      document.getElementById("divCoiffeur").style.display = "none"
    } else {
      document.getElementById("divCoiffeur").style.display = "flex"

    }
  })

})




document.getElementById("connexionButton").addEventListener("click", checkLogin);

document.getElementById("registerButton").addEventListener("click", checkRegister);







