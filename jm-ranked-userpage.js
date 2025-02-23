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
const logoutButton = document.getElementById('logout');

// Get references to the time text
const timeElements = [
    document.querySelector('#time1'),
    document.querySelector('#time2'),
    document.querySelector('#time3'),
    document.querySelector('#time4'),
    document.querySelector('#time5'),
    document.querySelector('#time6'),
    document.querySelector('#time7'),
    document.querySelector('#time8'),
    document.querySelector('#time9'),
    document.querySelector('#time10')
];

// Function to convert time string to total milliseconds
const timeStringToMilliseconds = (timeString) => {
    if (!timeString) return Infinity; // Handle missing or invalid times
    const [minutes, seconds] = timeString.split(':');
    const [sec, ms] = seconds.split('.');
    return (
        parseInt(minutes) * 60 * 1000 + // Convert minutes to milliseconds
        parseInt(sec) * 1000 + // Convert seconds to milliseconds
        parseInt(ms || 0) // Convert milliseconds (if present)
    );
};

// Function to extract and sort times from userData
const extractAndSortTimes = (userData) => {
    const times = [
        { category: "Asian Time", time: userData.bestAsianTime },
        { category: "Blonde Time", time: userData.bestBlondeTime },
        { category: "Brunette Time", time: userData.bestBrunetteTime },
        { category: "Combo Time", time: userData.bestComboTime },
        { category: "Ebony Time", time: userData.bestEbonyTime },
        { category: "Latina Time", time: userData.bestLatinaTime },
        { category: "Milf Time", time: userData.bestMilfTime },
        { category: "OF Time", time: userData.bestOFStarTime },
        { category: "Petite Time", time: userData.bestPetiteTime },
        { category: "Redhead Time", time: userData.bestRedheadTime }
    ];

    // Sort the array by time (lowest to highest)
    times.sort((a, b) => timeStringToMilliseconds(a.time) - timeStringToMilliseconds(b.time));

    return times;
};

// Function to update the UI with sorted times
const updateUIWithTimes = (times) => {
    times.forEach((timeObj, index) => {
        timeElements[index].innerText = `${timeObj.category}: ${timeObj.time}`;
    });
};

// Function to handle user authentication state changes
const handleAuthStateChange = (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    // Update user button and hide login button
                    userButtonUName.innerText = userData.userName;
                    userButton.style.display = 'block';
                    loginButton.style.display = 'none';

                    // Extract, sort, and update times
                    const sortedTimes = extractAndSortTimes(userData);
                    updateUIWithTimes(sortedTimes);
                } else {
                    console.log("No Document Found Matching ID");
                }
            })
            .catch((error) => {
                console.log("Error Getting Document", error);
            });
    } else {
        console.log("User ID Not Found in Local Storage");
    }
};

// Function to handle logout
const handleLogout = () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'jm-ranked.html';
        })
        .catch((error) => {
            console.error('Error Signing Out: ', error);
        });
};

// Event listeners
onAuthStateChanged(auth, handleAuthStateChange);
logoutButton.addEventListener('click', handleLogout);
