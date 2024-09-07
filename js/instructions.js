import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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
const db = getFirestore(app);

const popupContainer = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', ()=>{
  popupContainer.classList.remove('active');
})
function showPopup(message){
    document.getElementById('popup-text').innerHTML = message;
    popupContainer.classList.add('active');
}


onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged callback executed');
  if (user) {
    console.log('User is signed in:', user.displayName);
  } else {
    console.log('No user signed in');
    showPopup('no user signed in');
    location.href = 'index.html';
  }
});