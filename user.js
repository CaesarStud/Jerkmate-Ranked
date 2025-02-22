// Import Firebase SDK Functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvJVsteic2Rpj5V09LG41P4D9lFKfF5TA", // API Key for Firebase
    authDomain: "jmate-ranked.firebaseapp.com", // Domain for Firebase Authenication
    projectId: "jmate-ranked", // Project ID in Firebase
    storageBucket: "jmate-ranked.firebasestorage.app", // Storage bucket for Firebase Storage
    messagingSenderId: "323494062844", // Sender ID for Firebase Cloud Messaging
    appId: "1:323494062844:web:3003f28f13abc97374c579" // App ID for Firebase
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initializes the Firebase app with the provided configuration

const auth = getAuth();
const db = getFirestore();

// Get references to the buttons
const userButton = document.querySelector('.userButton'); // Select the user button
const loginButton = document.querySelector('.loginButton'); // Select the login button
const userButtonUName = document.querySelector('#userButtonUName'); // Select just the text within the user button

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap)=>{
                if (docSnap.exists()){
                    const userData = docSnap.data();
                    userButtonUName.innerText = userData.userName;
                    userButton.style.display = 'block'; // Make the user button visible
                    loginButton.style.display = 'none'; // Make the login button disappear
                    // userButton.innerText = userData.username;
                }
                else {
                    console.log("No Document Found Matching ID")
                }
            })
            .catch((error) => {
                console.log("Error Getting Document", error);
            })
    }
    else {
        console.log("User ID Not Found in Local Storage");
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'jm-ranked.html';
        })
        .catch((error) => {
            console.error('Error Signing Out: ', error);
        });
});