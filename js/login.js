// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCp5YscKqWKU97TU3eq7_xLkapgCTClRlY",
  authDomain: "iyna-portal.firebaseapp.com",
  databaseURL: "https://iyna-portal-default-rtdb.firebaseio.com",
  projectId: "iyna-portal",
  storageBucket: "iyna-portal.appspot.com",
  messagingSenderId: "256208881067",
  appId: "1:256208881067:web:f37186387ac82366003eee",
  measurementId: "G-8C9VQ9BH0F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const popupContainer = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}
function showPopup(message){
    document.getElementById('popup-text').innerHTML = message;
    popupContainer.classList.add('active');
}


const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;
  
  if(loginEmail == ''){
    showPopup('Please enter your email address');
    return;
  } else if (loginPassword == '') {
    showPopup('Please enter your Date of birth');
    return;
  }
  else{
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      
      showPopup('logged in successfully');
      const user = userCredential.user;
      setTimeout(function() {
        window.location.href = `./instructions.html`;
      }, 3000);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showPopup('Incorrect Email or Password');
      } else {
        showPopup('Account does not Exist');
      }
    })
  }
});


