// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"

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

// Function to display a message on the screen
function showMessage(message, divId){
    var messageDiv = document.getElementById(divId); // Get the div element by its ID
    messageDiv.style.display = 'block'; // Make the div visible
    messageDiv.innerHTML = message; // Set the message content
    messageDiv.style.opacity = 1; // Set the opacity to fully visible
    setTimeout(function(){
        messageDiv.style.opacity = 0; // Fade out the message after 5 seconds (5000 milliseconds)
    }, 5000);
}

// Get the sign-up button element
const signUp = document.getElementById('submitSignUp');

// Add an event listener to the sign-up button
signUp.addEventListener('click', (event)=>{
    event.preventDefault(); // Prevent the default form submission behaviour

    // Get the values from the form inputs
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const userName = document.getElementById('userName').value;

    // Validate that all fields are filled out
    if (!email || !password || !userName){
        showMessage('Please fill out all fields.', 'signUpMessage');
        return;
    }

    // Get the Firebase Auth and Firestore instances
    const auth = getAuth();
    const db = getFirestore();

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user; // Get the user object from the userCredential
            const userData = {
                email: email, // Store the user's email
                userName: userName // Store the user's username
            };

            // Create a document reference in Firestore for the new user
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData) // Set the user data in Firestore
                .then(()=>{
                    window.location.href = "index.html"; // Redirect to the login page
                })
                .catch((error)=>{
                    console.error("error writing document", error); // Log any errors that occur while writing to Firestore
                });
        })
        .catch((error)=>{
            const errorCode = error.code; // Get the error code
            if (errorCode == 'auth/email-already-in-use'){
                showMessage('Email Address Already Exists !!!', 'signUpMessage'); // Show error message if email is already in use
            }
            else {
                showMessage('Unable To Create User', 'signUpMessage'); // Show generic error message for other users
            }
        })
});

// Get the sign in button element
const signIn = document.getElementById('submitSignIn');

// Add an event listener to the sign in button
signIn.addEventListener('click', (event)=>{
    event.preventDefault(); // Prevent the default form submission behaviour
    
    // Get the values from the form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get the firebase auth instances
    const auth = getAuth();

    // Sign a user in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // Get the user data from userCredential
            showMessage('Login Is Successful', 'signInMessage'); // Display message
            localStorage.setItem('loggedInUserId', user.uid); // Locally store the user data
            window.location.href = "jm-ranked.html" // Redirect user to homepage
        })
        .catch((error) => {
            console.error("Login error: ", error); // Log the full error object
            const errorCode = error.code; // Store the error code
            if (errorCode == 'auth/wrong-password' || errorCode == 'auth/user-not-found'){ // if the error is due to invalid credentials
                showMessage('Incorrect Email or Password', 'signInMessage'); // display message
            }
            else { // if error code is displayed for any other reason
                showMessage('Account does not Exist', 'signInMessage'); // display message
            }
        });
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
