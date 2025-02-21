// Array of category buttons and their corresponding images
const categories = [
    { id: 'OFButton', image: "url('OF Button Cover.jpg')" },
    { id: 'milfButton', image: "url('Milf Button Cover.jpg')" },
    { id: 'petiteButton', image: "url('Petite Button Cover.jpg')" },
    { id: 'ebonyButton', image: "url('Ebony Button Cover.jpg')" },
    { id: 'asianButton', image: "url('Asian Button Cover.jpg')" },
    { id: 'latinaButton', image: "url('Latina Button Cover.jpg')" },
    { id: 'blondeButton', image: "url('Blonde Button Cover.jpg')" },
    { id: 'brunetteButton', image: "url('Brunette Button Cover.jpg')" },
    { id: 'redheadButton', image: "url('Redhead Button Cover.jpg')" }
];

function showRandomCategory(){
    // Reset all buttons to default background
    categories.forEach(cat => {
        const button = document.getElementById(cat.id);
        
        const imageContainer = button.querySelector('.image-container');
        imageContainer.style.opacity = '0'; // Hide the image
        button.style.pointerEvents = 'auto'; // Re-enable hover effect
    })

    // Randomly select a category
    const randomIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomIndex];

    // Apply the selected image to the button
    const button = document.getElementById(categories[randomIndex].id);
    const imageContainer = button.querySelector('.image-container');
    imageContainer.style.backgroundImage = selectedCategory.image;
    imageContainer.style.opacity = '1';
    console.log(selectedCategory.image);
}

// Show a random category every second (1000 milliseconds)
setInterval(showRandomCategory, 1000);

// Initialize the first random category immediately
showRandomCategory();
