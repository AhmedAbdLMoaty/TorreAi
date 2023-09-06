 document.addEventListener('DOMContentLoaded', () => {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const resultsDiv = document.getElementById('results');
    
    
    
        searchForm.addEventListener('submit',  async (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value;
            const storageHistory = JSON.parse(localStorage.getItem("searchHistory")).data
            const searchHistory = storageHistory ? storageHistory : []
            searchHistory.push(searchTerm)
            localStorage.setItem("searchHistory", JSON.stringify({data:searchHistory}))
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

                                    // Loop through the data and create a formatted display for each entry
                                    Object.values(data).forEach((item) => {
                                    const resultElement = document.createElement('div');
                                    resultElement.classList.add('result'); // Add a CSS class for styling

                                    // Create and populate HTML elements with data
                                    const nameElement = document.createElement('h2');
                                    nameElement.textContent = `Name: ${item.name}`;
                                    resultElement.appendChild(nameElement);

                                    const headlineElement = document.createElement('p');
                                    headlineElement.textContent = `Professional Headline: ${item.professionalHeadline}`;
                                    resultElement.appendChild(headlineElement);

                                    // Add more data fields as needed

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
