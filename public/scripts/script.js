document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    document.getElementById("startButton").addEventListener("click", function() {
        window.location.href = "/search";
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;

        try {
            const response = await fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ term: searchTerm }),
            });

            const data = await response.json();
            resultsDiv.innerHTML = JSON.stringify(data, null, 2);
        } catch (error) {
            console.error(error);
            resultsDiv.innerHTML = 'An error occurred while fetching results.';
        }
    });
});