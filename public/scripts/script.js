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
                                resultsDiv.innerHTML = ''; // Clear previous results

                                
                                Object.values(data).forEach((item) => {
                                const resultElement = document.createElement('div');
                                resultElement.classList.add('result'); // Add a CSS class for styling

                                
                                const nameElement = document.createElement('h2');
                                nameElement.textContent = `Name: ${item.name}`;
                                resultElement.appendChild(nameElement);

                                const headlineElement = document.createElement('p');
                                headlineElement.textContent = `Professional Headline: ${item.professionalHeadline}`;
                                resultElement.appendChild(headlineElement);

                                
                                const profileLink = document.createElement('a');
                                profileLink.textContent = 'View Profile';
                                profileLink.href = `https://torre.ai/${item.username}`;
                                profileLink.target = '_blank'; 
                                resultElement.appendChild(profileLink);

                                resultsDiv.appendChild(resultElement);
                                
                                const addToFavoritesButton = document.createElement('button');
                                addToFavoritesButton.textContent = 'Add to Favorites';
                                addToFavoritesButton.addEventListener('click', () => {
                                    // Retrieve the user's favorites from localStorage or initialize an empty array
                                    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                            
                                    // Check if the item is not already in the favorites
                                    if (!favorites.some((fav) => fav.ggId === item.ggId)) {
                                        // Add the current item to the favorites array
                                        favorites.push(item);
                            
                                        // Update localStorage with the updated favorites
                                        localStorage.setItem('favorites', JSON.stringify(favorites));
                                        alert('Added to Favorites!');
                                    } else {
                                        alert('This item is already in your Favorites.');
                                    }
                                });
                            
                                resultElement.appendChild(addToFavoritesButton);
                                resultsDiv.appendChild(resultElement);
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

