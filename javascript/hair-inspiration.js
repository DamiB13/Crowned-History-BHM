// === HAIR INSPIRATION SECTION === //
// I used this event to make sure my code only runs after the HTML page is fully loaded
// This makes sure the whole HTML page is loaded before the JavaScript runs 
document.addEventListener('DOMContentLoaded', function() {
    console.log("Hair inspiration loaded");
    
    // This gets the search box, search button, era dropdown, and results area elements using getElementById
    // I used getElementById instead of querySelector because it's faster and more specific 
    const searchBox = document.getElementById('hairstyle-search');
    const searchBtn = document.getElementById('search-button');
    const eraDropdown = document.getElementById('era-filter');
    const resultsArea = document.getElementById('hairstyle-result');
    
    // This store hairstyles in an array to make it easier to filter and display
    let hairstyles = [];
    
    // This loads the hairstyle data fetching the JSON I created
    // I added a console.log to make sure the data has loaded correctly
    fetch('data/hairstyles.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("Hairstyle data loaded"); 
        
        // This processes the hairstyles data from JSON into an array
        // I converted the nested JSON structure to an array to make filtering easier. This way I don't need to loop through eras and then styles when filtering
        // eraIndex keeps track of which era I'm currently processing (0 for first era, 1 for second, etc.)
        hairstyles = [];
        for (let eraIndex = 0; eraIndex < data.length; eraIndex++) {
          const era = data[eraIndex].era;
          const styles = data[eraIndex].styles;
          
          for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
            const style = styles[styleIndex];
            style.era = era;
            hairstyles.push(style);
          }
        }
        
        // This sets up era dropdown with all available eras
        // I created the dropdown options based on the data instead of typing it in HTML, so the website automatically updates if data changes
        eraDropdown.innerHTML = '<option value="all">All Eras</option>';
        const eras = [];
        for (let eraIndex = 0; eraIndex < data.length; eraIndex++) {
          eras.push(data[eraIndex].era);
        }
        
        // This adds each era as an option element to the dropdown | Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        // I used createElement instead of string concatenation for the options because it's more flexible and easier to maintain
        for (let eraIndex = 0; eraIndex < eras.length; eraIndex++) {
          const option = document.createElement('option');
          option.value = eras[eraIndex];
          option.textContent = eras[eraIndex];
          eraDropdown.appendChild(option);
        }
        
        // Show all hairstyles when page loads
        showHairstyles(hairstyles);
        
        // This sets up event listeners for search and filter controls 
        // I set up event listeners for user interactions: clicking the search button, pressing Enter in the search box and changing the era dropdown all trigger the filterHairstyles function. The catch block handles any errors when loading data, showing an error message if something goes wrong.
        searchBtn.addEventListener('click', filterHairstyles);
        searchBox.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            filterHairstyles();
          }
        });
        eraDropdown.addEventListener('change', filterHairstyles);
      })
      .catch(function(error) {
        console.error("Error loading hairstyles:", error);
        resultsArea.innerHTML = '<p class="error">Could not load hairstyles. Please try again later.</p>';
      });
    
    // This filters hairstyles based on search text and era dropdown
    // I used toLowerCase() to make the search case-insensitive. I also used includes() to check if the search text is in the hairstyle name or description. This way the user can search for partial words or phrases.
    function filterHairstyles() {
      const searchText = searchBox.value.toLowerCase();
      const era = eraDropdown.value;
      
      const filteredHairstyles = [];
      
      // This loop filters hairstyles by checking if each one matches both the search text (in name or description) and the selected era.

      for (let styleIndex = 0; styleIndex < hairstyles.length; styleIndex++) {
        const style = hairstyles[styleIndex];
        
        const nameMatch = style.name.toLowerCase().includes(searchText);
        const descMatch = style.description.toLowerCase().includes(searchText);
        // This checks if the search text is empty or if the style matches the search text in name or description 
        // matchesSearch is true if: the search box is empty (searchText === '') OR the name matches OR the description matches
        const matchesSearch = searchText === '' || nameMatch || descMatch; 
        
        const matchesEra = era === 'all' || style.era === era;
        // If a hairstyle matches both criteria, it's added to the filteredHairstyles array. If not, it's skipped.
        if (matchesSearch && matchesEra) {
          filteredHairstyles.push(style);
        }
      }
      
      showHairstyles(filteredHairstyles);
    }
    
    // This display hairstyles on the page using HTML templates | Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // I used template literals (backticks) instead of string concatenation because they make the HTML structure clearer and allow multi-line strings
    function showHairstyles(stylesToShow) {
      // If no styles match the search criteria, shows a "no hairstyles found" message
      if (stylesToShow.length === 0) {
        resultsArea.innerHTML = '<p class="no-results">No hairstyles found. Try different search terms.</p>';
        return;
      }
      // Otherwise, loops through all matching hairstyles and creates HTML for each one
      let html = '';

      // This loop creates HTML for each matching hairstyle. For each style, I extract its data (image, name, era, continent) and build a card using template literals. Each card shows the hairstyle image, name, era, and origin. I added each card's HTML to the string that will be displayed to the user.
      for (let styleIndex = 0; styleIndex < stylesToShow.length; styleIndex++) {
        const style = stylesToShow[styleIndex];
        const image = style.image;
        
        html += `
          <div class="hairstyle-card">
            <img src="${image}" alt="${style.name}" class="hairstyle-image">
            <div class="hairstyle-info">
              <h3>${style.name}</h3>
              <span class="hairstyle-era">${style.era}</span>
             <p class="hairstyle-continent"><em>Origin: ${style.continent}</em></p>
            </div>
          </div>
        `;
      }
      
      // This updates the page with the new HTML from the hairstyle cards I created
      // I used innerHTML to update the content all at once which is more efficient than creating each element separately
      resultsArea.innerHTML = html;
      console.log("Showing", stylesToShow.length, "hairstyles");
    }
  });  