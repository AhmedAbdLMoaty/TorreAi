
document.addEventListener('DOMContentLoaded', () => {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const resultsDiv = document.getElementById('results');
    
    
    
        searchForm.addEventListener('submit',  async (e) => {
            e.preventDefault();
            
            const storageHistory = JSON.parse(localStorage.getItem("searchHistory"));
            const searchHistory = storageHistory ? storageHistory.data : [];
            const searchTerm = searchInput.value;
            searchHistory.push(searchTerm)
            
            localStorage.setItem("searchHistory", JSON.stringify({ data: searchHistory }));
            console.log(searchTerm);
            try {
                const response = await  fetch('https://torre.ai/api/entities/_searchStream', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:
                        JSON.stringify({query: searchTerm,                    
                        identityType: "person",
                        meta: false,
                        limit: 10,
                        excludeContacts: true,
                        excludedPeople: []} ),
                })
                console.log(response)
                const result = await response.text()
                const listResults = result.split("}")
                const data = {}
                const maxIndex = listResults.length - 1
                listResults.forEach((item, index) => {
                    try {
                        if (index === maxIndex) {return }
                        const itemToParse = item + "}"
                        const itemData = JSON.parse(itemToParse)
                        data[itemData.ggId] = itemData
                        const resultsDiv = document.getElementById('results');
                                resultsDiv.innerHTML = ''; 

                                
                                Object.values(data).forEach((item) => {
                                    const resultCard = document.createElement('div');
                                    resultCard.classList.add('result-card');
                                
                                    // Create an image element
                                    const imageUrlElement = document.createElement('img');
                                    imageUrlElement.src = item.imageUrl; // Assuming the image URL is in the 'imageUrl' property
                                    imageUrlElement.alt = `Image for ${item.name}`;
                                    imageUrlElement.classList.add('card-image');
                                
                                    // Create a container for text content
                                    const textContent = document.createElement('div');
                                    textContent.classList.add('card-text-content');
                                
                                    // Add name
                                    const nameElement = document.createElement('h2');
                                    nameElement.textContent = `${item.name}`;
                                    textContent.appendChild(nameElement);
                                
                                    // Add professional headline
                                    const headlineElement = document.createElement('p');
                                    headlineElement.textContent = ` ${item.professionalHeadline}`;
                                    textContent.appendChild(headlineElement);
                                
                                    // Add a "View Profile" link
                                    const viewProfileButton = document.createElement('a');
                                    viewProfileButton.textContent = 'View Profile';
                                    viewProfileButton.href = `https://torre.ai/${item.username}`;
                                    viewProfileButton.target = '_blank';
                                    viewProfileButton.classList.add('view-profile-button'); 
                                    textContent.appendChild(viewProfileButton);

                                    
                                
                                    // Append the image and text content to the result card
                                    resultCard.appendChild(imageUrlElement);
                                    resultCard.appendChild(textContent);
                                
                                    // Create an "Add to Favorites" button
                                    const addToFavoritesButton = document.createElement('button');
                                    addToFavoritesButton.textContent = 'Add to Favorites';
                                    addToFavoritesButton.classList.add('add-to-favorites-button'); // Add the class for styling
                                    
                                    // Add click event listener for "Add to Favorites" button
                                    addToFavoritesButton.addEventListener('click', () => {
                                        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                                    
                                        if (!favorites.some((fav) => fav.ggId === item.ggId)) {
                                            favorites.push(item);
                                            localStorage.setItem('favorites', JSON.stringify(favorites));
                                            alert('Added to Favorites!');
                                        } else {
                                            alert('This item is already in your Favorites.');
                                        }
                                    });
                                
                                    // Append the result card and button to the result container
                                    resultCard.appendChild(addToFavoritesButton);
                                    document.getElementById('results').appendChild(resultCard);
                                });
                                
                                
                            
                            

                        
                        
                    }catch(err) {
                        console.error(err)
                    }
                })
                console.log(data)
                console.log(Object.values(data))
                /* const newResult = result.slice(0, 632)
                console.log(JSON.parse(newResult))
                console.log( result.slice(0, 640))
                console.log(newResult.length) */
            }catch(err) {
                console.error(err)
            }
        
               
            

/*                     .catch((error)=> {
                        console.error(error);
                        resultsDiv.innerHTML = 'An error occurred while fetching results.';
                    
                    }) */
             
        });
    });

function getFavorites() {
    const favoritesJSON = localStorage.getItem('favorites');
    return JSON.parse(favoritesJSON) || [];
}


function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = getFavorites();


    favoritesList.innerHTML = '';


    favorites.forEach((favorite) => {
        const listItem = document.createElement('li');
        listItem.textContent = favorite.name; 
    });
}

displayFavorites();


document.addEventListener('DOMContentLoaded', function () {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    // Check if favorites exist and are not empty
    if (favorites && favorites.length > 0) {
        const favoritesList = document.getElementById('favoritesList');

        // Clear any existing items in the list
        favoritesList.innerHTML = '';

        // Add each favorite to the list with the card template
        favorites.forEach((favorite) => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');

            // Create an image element
            const imageUrlElement = document.createElement('img');
            imageUrlElement.src = favorite.imageUrl; // Assuming the image URL is in the 'imageUrl' property
            imageUrlElement.alt = `Image for ${favorite.name}`;
            imageUrlElement.classList.add('card-image');

            // Create a container for text content
            const textContent = document.createElement('div');
            textContent.classList.add('card-text-content');

            // Add name
            const nameElement = document.createElement('h2');
            nameElement.textContent = `${favorite.name}`;
            textContent.appendChild(nameElement);

            // Add professional headline
            const headlineElement = document.createElement('p');
            headlineElement.textContent = ` ${favorite.professionalHeadline}`;
            textContent.appendChild(headlineElement);

            // Add a "View Profile" link
            const viewProfileButton = document.createElement('a');
            viewProfileButton.textContent = 'View Profile';
            viewProfileButton.href = `https://torre.ai/${favorite.username}`;
            viewProfileButton.target = '_blank';
            viewProfileButton.classList.add('view-profile-button');
            textContent.appendChild(viewProfileButton);

            // Append the image and text content to the result card
            resultCard.appendChild(imageUrlElement);
            resultCard.appendChild(textContent);

            // Append the result card to the favorites list
            favoritesList.appendChild(resultCard);
        });
    }
});