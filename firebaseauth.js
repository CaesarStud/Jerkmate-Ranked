// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"
import {getFireStore, seetDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvJVsteic2Rpj5V09LG41P4D9lFKfF5TA",
  authDomain: "jmate-ranked.firebaseapp.com",
  projectId: "jmate-ranked",
  storageBucket: "jmate-ranked.firebasestorage.app",
  messagingSenderId: "323494062844",
  appId: "1:323494062844:web:3003f28f13abc97374c579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const userName = document.getElementById('userName').value;

    const auth = getAuth();
    const db = getFireStore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData = {
            email: email,
            userName: userName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href = "jm-ranked-login.html";
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else {
            showMessage('Unable To Create User', 'signUpMessage');
        }
    })
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries