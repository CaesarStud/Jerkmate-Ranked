let startTime;
let timerInterval;
let timerElement = document.getElementById('timer');
let startButton = document.getElementById('start');
let goMessage = document.getElementById('goMessage');
let randomImage = document.getElementById('randomImage');
let guessInput = document.getElementById('guessInput');
let feedback = document.getElementById('feedback');
let giveUp = document.getElementById('giveUp');

// Function to reset the game
function resetGame() {
    window.location.reload();
    /*
    // Reset variables
    remainingImages = [...imageFiles]; // Reset the list of remaining images
    correctGuesses = 0; // Reset the number of correct guesses
    startTime = null; // Reset the start time
    clearInterval(timerInterval); // Stop the timer
    timerInterval = null;

    // Reset UI
    timerElement.textContent = "00:00.00"; // Reset the timer display
    feedback.style.display = 'none'; // Hide feedback
    randomImage.style.display = 'none'; // Hide the image
    guessInput.style.display = 'none'; // Hide the input field
    playAgain.style.display = 'none'; // Hide the Play Again button
    startButton.style.display = 'block'; // Show the Start button
    startButton.disabled = false; // Enable the Start button
    */
}

// List of image filenames in the "general" folder
const imageFiles = [
    "Alex Tanner.jpg",
    "Amouranth.jpg",
    "Bella Thorne.jpg",
    "Ella Hughes.jpg",
    "Jia Lissa.jpg",
    "Karlie Montana.jpg",
    "Lacy Lennon.jpg",
    "Lauren Phillips.jpg",
    "Molly Stewart.jpg",
    "Octavia Red.jpg",
    "Skyla Novea.jpg",
    "Sophia Locke.jpg"
]

let currentImageName = ""; // Store the name of the currently displayed image
let remainingImages = [...imageFiles]; // Copy of imageFiles to track remaining images
let correctGuesses = 0; // Tracks the number of correct guesses
const totalRounds = 10; // Total number of rounds

// Function to format the time as "MM:SS.CS"
function formatTime(time) {
  const minutes = Math.floor(time / 6000).toString().padStart(2, '0'); // 6000 centiseconds = 1 minute
  const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, '0'); // 100 centiseconds = 1 second
  const centiseconds = (time % 100).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
}

// Function to update the timer
function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 10); // Calculate elapsed time in centiseconds
  timerElement.textContent = formatTime(elapsedTime);
}

// Function to handle the Give Up button click
function handleGiveUp(){
    // Reveal the name of the current image
    feedback.textContent = currentImageName;
    feedback.style.color = 'white';
    feedback.style.display = 'block';
    correctGuesses++;

    // Add 30 seconds to the timer
    const penaltyTime = 30000; // 30 seconds in milliseconds
    startTime = startTime  - penaltyTime; // Adjust the start time to add 30 seconds

    timerElement.classList.add('fade-red'); // Add the animation class

    if (correctGuesses == 10){
        feedback.innerHTML = "Congratulations! You lasted 10 rounds in <span class='timer-text'>" + timerElement.textContent + "</span>";
        feedback.style.color = "rgb(160, 241, 255)"; feedback.style.whiteSpace = "normal"; feedback.style.textAlign = "center"; // Text Style 
        guessInput.style.display = 'none'; // Hide the input field
        giveUp.style.display = 'none'; // Hide the Give Up button
        clearInterval(timerInterval); // Stop the timer
        playAgain.style.display = 'block';
        triggerConfetti();
    } else {
        // Move to the next image after 1 second
        setTimeout(() => {
            timerElement.classList.remove('fade-red'); // Remove the animation class
            feedback.style.display = 'none';
            displayRandomImage(); // Display the next random image
        }, 1000); // 1-second delay
    }
}

// Function to display a random image
function displayRandomImage() {
    if (remainingImages.length == 0){
        feedback.textContext = "All iamges have been displayed!";
        feedback.style.color = "blue";
        feedback.style.display = "block";
        guessInput.style.display = 'none'; // Hide the input field
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * remainingImages.length); // Pick a random index
    const randomImageFile = remainingImages[randomIndex]; // Get the random image filename
    randomImage.src = `Pics/${randomImageFile}`; // Set the image source
    randomImage.style.display = 'block'; // Show the image
    currentImageName = randomImageFile.split('.')[0]; // Store the image name without extension
    guessInput.style.display = 'block'; // Show the input field
    giveUp.style.display = 'block'; // Show the Give Up button
    guessInput.focus(); // Focus on the input field

    // Remove the edisplayed image from the remaining images
    remainingImages.splice(randomIndex, 1);
}

// Function to trigger confetti
function triggerConfetti(){
    confetti({
        particleCount: 100, // Number of confetti particles
        spread: 70, // How far the particles spread
        origin: { y: 0.6} // Start confetti from the bottom of the screen
    });
}

// Function to check if the guess is correct
function checkGuess() {
    const userGuess = guessInput.value.trim().toLowerCase(); // Get the user's guess
    const correctName = currentImageName.toLowerCase(); // Get the correct image name

    if (userGuess === correctName) {
        feedback.textContent = currentImageName;
        feedback.style.color = "white";
        correctGuesses++;
        if (correctGuesses < totalRounds){
            setTimeout(() => {
                feedback.style.display = 'none';
                displayRandomImage(); // Display a new random image after 1 second
            }, 1000); // 1000 milliseconds = 1 second
        } else {
            feedback.innerHTML = "Congratulations! You lasted 10 rounds in <span class='timer-text'>" + timerElement.textContent + "</span>";
            feedback.style.color = "rgb(160, 241, 255)"; feedback.style.whiteSpace = "normal"; feedback.style.textAlign = "center"; // Text Style 
            guessInput.style.display = 'none'; // Hide the input field
            giveUp.style.display = 'none'; // Hide the Give Up button
            clearInterval(timerInterval); // Stop the timer
            playAgain.style.display = 'block';
            triggerConfetti();
        }
    } else {
        feedback.textContent = "Incorrect! 😢";
        feedback.style.color = "red";
        setTimeout(() => {
            feedback.style.display = 'none'; // Hide feedback after 1 second
        }, 1000) // 1000 milliseconds = 1 second
    }
    feedback.style.display = 'block'; // Show feedback
    guessInput.value = "";
}

// Start the timer when the button is clicked
start.addEventListener('click', () => {
  if (!timerInterval) { // Prevent multiple intervals
    start.disabled = true; // Disable the button after starting
    startButton.style.display = 'none'; // Hide the start button
    goMessage.style.display = 'block' // Show the "GO" message

    setTimeout(() => {
        goMessage.style.display = 'none'; // Hide the "GO" message after 1 second
        startTime = Date.now(); // Record the start time
        timerInterval = setInterval(updateTimer, 10); // Update every 10 milliseconds (centisecond precision)
        displayRandomImage(); // Display a random image
      }, 1000); // 1-second delay
  }
});

// Give Up button functionality
giveUp.addEventListener('click', () => {
    handleGiveUp(); // Reveal answer and add penalty when the Give Up button is clicked
});

// Play Again button functionality
const playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', () => {
    resetGame(); // Reset the game when the Play Again button is clicked
});

// Check the guess when the user presses Enter
guessInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
});
