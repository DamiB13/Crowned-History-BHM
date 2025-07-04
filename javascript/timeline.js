// === TIMELINE SECTION === // 
// This waits for the HTML to load before running the JavaScript    
document.addEventListener('DOMContentLoaded', function() {
    console.log("Loading timeline...");

    // This gets the HTML elements I need, using the querySelector. querySelector lets me find elements using CSS selectors like class names (timeline track, timeline content etc.)
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineContent = document.querySelector('.timeline-content');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');

    // This stores the timeline data in a variable so I can use it later in my code
    let timelineData = []; 
    let currentIndex = 0; 

    // This loads the hairstyle data fetching the JSON I created
    fetch('data/hairstyles.json')
        .then(function(response) {
            // This converts the response to JSON format so I can work with it
            return response.json();
        })
        .then(function(data) {
            // This store the loaded JSON data, build the timeline points, and display the first era (index 0) | Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            timelineData = data;
            createTimeline();
            showEra(0); 
        })
        .catch(function(error) {
            // This shows an error message if something goes wrong when loading the data
            console.error("Error loading timeline:", error);
            timelineContent.innerHTML = '<p>Error loading timeline data.</p>';
        });

    // This function creates the timeline points and labels
    function createTimeline() {
            // This function builds the visual timeline with clickable points
            // I loop through each era in my data to create points on the timeline
            // eraIndex keeps track of which era I'm working with (0 for first, 1 for second, etc.)
        for (let eraIndex = 0; eraIndex < timelineData.length; eraIndex++) {
            // This creates a new timeline point element and sets its position based on the era index
            const point = document.createElement('div');
            // I given the point a class name so I can style it with CSS
            point.className = 'timeline-point';
            // This positions each point evenly along the timeline from left to right
            // This math converts the era's position to a percentage (0% to 100%) e.g first era at 0%, middle era at 50%, last era at 100%
            point.style.left = (eraIndex / (timelineData.length - 1) * 100) + '%';
            
            // This creates a label for the timeline point and adds it to the point element
            const label = document.createElement('div');
            label.className = 'timeline-point-label';
            // This sets the label's text to the era name from the data 
            // Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/textContent 
            label.textContent = timelineData[eraIndex].era;
            point.appendChild(label);
            
            // This makes each point clickable so users can nagivate the timeline
            point.addEventListener('click', function() {
                // The showEra function displays the hairstyles from the selected era
                showEra(eraIndex);
            });
            
            // This adds the point to the timeline track element 
            timelineTrack.appendChild(point);
        }
    }

    // This function shows the selected era and hides the others
    function showEra(index) {
        // querySelectorAll gets all elements matching a selector
        const points = document.querySelectorAll('.timeline-point');
        // This loop through all the points to update which one is active
        // pointIndex keeps track of which point I'm currently working with (0 for first, 1 for second, etc.)
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
            // This checks if this point matches the era I want to show
            if (pointIndex === index) {
                 // If it matches, I add the 'active' class to highlight it
                points[pointIndex].classList.add('active');
            } else {
                // If it doesn't match, I remove the 'active' class to hide it
                points[pointIndex].classList.remove('active');
            }
        }
        
        // This updates the timeline line to show the current era
        // This calculates the width as a percentage based on which era is selected (0% to 100%)
        timelineLine.style.width = (index / (timelineData.length - 1) * 100) + '%';
        
        // This updates the content of the timeline content area to show the information for the selected era
        const era = timelineData[index];
        
        // This creates a variable to store the HTML for the styles in the era
        let stylesHTML = '';
        // styleIndex keeps track of which hairstyle I'm working with (0 for first, 1 for second, etc.)
        for (let styleIndex = 0; styleIndex < era.styles.length; styleIndex++) {
            // This gets the current hairstyle object with all its details (name, image, description)
            const style = era.styles[styleIndex];
            
            // This creates a layout with image on left and text on right
            // I used a flexbox to make the image and the content side by side
            stylesHTML += `
                <div class="timeline-style" style="display: flex; margin-bottom: 20px;">
                    <div class="timeline-style-image" style="flex: 0 0 400px; margin-right: 20px;">
                        <img src="${style.image}" alt="${style.name}" 
                             onerror="this.src='images/placeholder.jpg'"
                             style="width: 100%; max-height: 400px; object-fit: cover;">
                    </div>
                    <div class="timeline-style-content" style="flex: 1;">
                        <h3>${style.name}</h3>
                        <p>${style.description}</p>
                    </div>
                </div>
            `;
        }
        
        // This updates the timeline content area with HTML for the styles in the era 
        timelineContent.innerHTML = `
            <h2>${era.era}</h2>
            <div class="timeline-styles">${stylesHTML}</div>
        `;
        
        // This updates the navigation buttons to reflect the current era and enable/disable them based on the current era index | Source: https://www.w3schools.com/jsref/prop_button_disabled.asp
        currentIndex = index;
        // I disabled the previous button if the current era is the first one
        prevButton.disabled = (currentIndex === 0);
        // I disabled the next button if the current era is the last one
        nextButton.disabled = (currentIndex === timelineData.length - 1);
    }

    // I've set up the previous button to show the earlier era when clicked
    // The button only works if the user is not already at the first era
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            showEra(currentIndex - 1); // This show the previous era
        }
    });
    
    // I've set up the next button to show the later era when clicked
    // The button only works if the user is not already at the last era
    nextButton.addEventListener('click', function() {
        if (currentIndex < timelineData.length - 1) {
            showEra(currentIndex + 1); // This show the next era
        }
    });
});
