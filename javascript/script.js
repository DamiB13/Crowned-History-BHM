// This makes sure the whole HTML page is loaded before the JavaScript runs 
// I used this event to make sure my code only runs after the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Content is ready!");

    // === HAMBURGER MENU SECTION === //
    // This gets the hamburger menu button and navigation menu elements using querySelector
    // I used querySelector to find elements by their CSS selectors (.hamburger-menu and .nav-flex) instead of by ID 
    const menuButton = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-flex");
    
    console.log("Menu button loaded:", menuButton);
    console.log("Navigation menu loaded:", navMenu);

    // If the menu button exists, I add a click eventlistener to it. When clicked, this function will run
    // I used e.stopPropagation() to stop the click event from affecting other elements outside the button | Source: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
    if (menuButton) {
        menuButton.addEventListener("click", function(e) {
            console.log("Menu button clicked");
            e.stopPropagation(); 
            // This changes the button icon to show it's active
            // I used classList.toggle to toggle the "change" class on the button
            this.classList.toggle("change");
            
            // This toggles the "active" class on the navigation menu
            if (navMenu) {
                navMenu.classList.toggle("active");
                console.log("Menu is now:", navMenu.classList.contains("active") ? "open" : "closed");
            }
        });
    }
    
    // This closes the menu when any nav link is clicked 
    // I used querySelectorAll to get all navigation links linked at once instead of one by one
    const navLinks = document.querySelectorAll(".nav-flex li a, .nav-button");

    // I used a for loop to add the event listener to each link instead of adding it to each link individually
    for (let linkIndex = 0; linkIndex < navLinks.length; linkIndex++) {
        navLinks[linkIndex].addEventListener("click", function() {
            // This closes the menu when a link is clicked
            // I used classList.remove instead of toggle to make sure the menu always closes
            if (menuButton && navMenu) {
                menuButton.classList.remove("change");
                navMenu.classList.remove("active");
            }
        });
    }

    // === MARQUEE SCROLLING SECTION === // 
    // This gets all the marquee elements using querySelectorAll
    const marquees = document.querySelectorAll(".marquee-content");
    
    // This duplicates the content in the banner so the marquee scroll looks continuous | Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
    marquees.forEach(content => {
        content.innerHTML += content.innerHTML.repeat(10);
    });

    // === ROTATING HERO IMAGES SECTION === //
    // This gets the two hero images using querySelectorAll
    const heroImages = document.querySelectorAll(".hero-img");
    let currentImage = 0;
    
    // This checks if there are more than one hero images
    // If there are, it logs a message to the console
    if (heroImages.length > 1) {
        console.log("Image found", heroImages.length, "hero images to rotate");

        // This sets up a timer to change images 
        // I used setInterval() to create an automatic slideshow effect
        setInterval(function() {
            // This hide current image and show next image 
            heroImages[currentImage].classList.remove("active");
            
            // This moves to the next image in the array
            currentImage = currentImage + 1;
            if (currentImage >= heroImages.length) {
                currentImage = 0;
            }
            // This shows the next image in the array 
            heroImages[currentImage].classList.add("active");
        }, 5000); // This runs this code every 5000 milliseconds (5 seconds)
    }

    // === CONTACT FORM SECTION === //
    const contactForm = document.getElementById("contactForm");

    // If the contact form exists on the page, I added a submit eventlistener 
    // This runs when the user tries to submit the form
    if (contactForm) { 
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // This stops the defult form from submitting | Source: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
             // I used preventDefault to handle the form with JavaScript instead of reloading the page
            
            // This checks if any required fields are empty 
            // If any field is empty such as name or email or message, it shows an error message and stop the form submission 
            // The || (OR) operator means the condition is true if any field is empty
             if (name === "" || email === "" || message === "") {
                 const errorMsg = document.getElementById("formError");
                 if (errorMsg) {
                     errorMsg.style.display = "block";
                     errorMsg.textContent = "Please fill out all fields.";
                 }
                 return;
             }
            
            // Show success message if everything is filled out correctly
            // I used display: block to show the message 
            const successMsg = document.getElementById("formSuccess");
            if (successMsg) {
                successMsg.style.display = "block";
                contactForm.reset(); // Clear the form after submission
            }
            
            // This logs the form data in the console 
            // This helps me see what information was submitted without sending it to a server
            console.log("Form submitted:", { name: name, email: email, message: message });
        });
    }
});