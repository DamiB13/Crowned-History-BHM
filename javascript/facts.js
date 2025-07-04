// === DID YOU KNOW - FACTS SECTION === // 

// List of facts for the rotating display.
// I'm using a const fact array here to store multiple facts that will rotate on the page. Using const means the array can't be reassigned, but its contents can be changed.
const facts = [
    "In ancient Egypt, hair was deeply symbolic. Egyptians would wear wigs to shield their shaved heads from the sun, and different hairstyles indicated a person's social status, age, and religious beliefs.",
    "The concept of braiding dates back thousands of years in African cultures, where intricate braided styles often communicated a person's tribe, age, marital status, wealth, and religion.",
    "During the Civil Rights Movement of the 1960s, the Afro became a powerful symbol of Black pride, identity, and resistance to Eurocentric beauty standards.",
    "The hot comb was invented in 1880 by the French but was popularized for African American hair by Madam C.J. Walker, who became America's first female self-made millionaire through her hair care products.",
    "The hair care industry for Black women is valued at over $2.5 billion, with Black women spending approximately 9 times more on hair care than any other demographic."
];

// The let variable keeps track of which fact is showing and if animation is happening. 
// The let keyword is used because the value of this variable will change over time. 
let currentFactNumber = 0;
let isChanging = false;

// This function changes to the next fact with a smooth fade effect. 
function showNextFact() {
    // This prevents multiple animations from happening at once. 
    // The if statement checks if the animation is already happening. If it is, the function exits.
    if (isChanging) {
        return;
    }
    
    // This shows the animation is happening by setting the isChanging variable to true.
    // getElementById was used to get the element with the id "factContainer" and store it in the factDisplay variable.
    const factDisplay = document.getElementById('factContainer');
    isChanging = true; 
    
    // This starts the fade-out and fade-in animation by adding the CSS classes to the factDisplay element.
    factDisplay.classList.add('fade-out');
    factDisplay.classList.remove('fade-in');
    
    // The setTimeout function is used to delay the next step of the animation. 
    // currentFactNumber is added by 1 to show the next fact one at a time.
    setTimeout(function() {
        currentFactNumber = currentFactNumber + 1;
        
        // This shows if the current fact number is greater than or equal to the number of facts, reset it to 0. Meaning it starts from the beginning again. 
        // This ensures the animation loops through all the facts.
        if (currentFactNumber >= facts.length) {
            currentFactNumber = 0;
        }

        // This updates the fact displayed on the page.
        // The textContent property is used to set the text of the element with the id "factContainer" to the current fact. 
        // The current fact is accessed using the currentFactNumber variable.
        factDisplay.textContent = facts[currentFactNumber];

        // This starts the fade-in and fade-out animation.
        factDisplay.classList.add('fade-in');
        factDisplay.classList.remove('fade-out');

        // This waits for fade-in to finish before allowing next animation
        // The setTimeout function is used to delay the next step of the animation. 
        setTimeout(function() {
            isChanging = false;
        }, 1000); // 1 second for fade-in
    }, 1000); // 1 second for fade-out
}

// This runs when the page finishes loading and sets up the initial display of the first fact.
document.addEventListener('DOMContentLoaded', function() {
    // This find the container where facts will be displayed and stores it in the factDisplay variable.
    const factDisplay = document.getElementById('factContainer');

    // This shows the first fact and starts the fade-in animation.
    factDisplay.textContent = facts[0];
    factDisplay.classList.add('fade-in');

    // The setInterval function is used to call the showNextFact function every 8 seconds.
    setInterval(showNextFact, 8000); // 8 seconds
});

// === FUN FACT POPUP SECTION === //
// This array creates a popup with a fun fact about Black hair using strings. 
const blackHairFacts = [
    "The tightly coiled structure of African hair is actually the most fragile hair type and requires gentle handling despite its strong appearance.",
    "Black hair can shrink up to 75% of its actual length when dry due to its spiral structure.",
    "The first African American millionaire, Madam C.J. Walker, built her fortune by developing hair care products specifically for Black women in the early 1900s.",
    "The Afro hairstyle became a powerful political symbol during the Civil Rights and Black Power movements of the 1960s and 70s.",
    "Traditional African hair braiding techniques have been passed down through generations for thousands of years, with some styles taking up to 8 hours to complete.",
    "The natural oils produced by the scalp have a harder time traveling down the shaft of curly hair, which is why Black hair tends to be drier and benefits from added moisture.",
    "In many African cultures, hairstyles were used as a way to indicate a person's social status, tribe, age, marital status, and religion.",
];

// This function shows a random fact from the array when the user refreshes the page.
function showPopupFact() {
    // I used math.random function to get a random fact number between 0 and the length of the array.
    // randomPosition is the random number 
    const randomPosition = Math.floor(Math.random() * blackHairFacts.length);
    const randomFact = blackHairFacts[randomPosition];
     
    
    // This finds the element with id="fun-fact" and puts our random fact text inside it
    // I'm using textContent to change what the user sees in the popup without reloading the page
    document.getElementById('fun-fact').textContent = randomFact;
    
    // This shows the popup is visiable by adding a CSS class to the popup element
    document.getElementById('popup').classList.add('show');
}

// This function closes the popup when user clicks close
function closePopup() {
    document.getElementById('popup').classList.remove('show');
}

// Show a popup with a fun fact shortly after the page loads
document.addEventListener('DOMContentLoaded', function() {
    // This waits 3 seconds before showing the popup to give the user time to see the page
    setTimeout(showPopupFact, 3000);
});