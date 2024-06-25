document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '73ce5b4d6872b4a093314bef3aa1daf3';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w200'; // Base URL for images with a width of 200px

    const loadMoviesButton = document.getElementById('load-movies');
    const hideMoviesButton = document.getElementById('hide-movies');
    const moviesTable = document.getElementById('movies-table');

    loadMoviesButton.addEventListener('click', () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                const tableBody = moviesTable.getElementsByTagName('tbody')[0];

                // Clear previous table rows
                tableBody.innerHTML = '';

                movies.forEach(movie => {
                    const row = tableBody.insertRow();

                    const cellImage = row.insertCell(0);
                    const cellTitle = row.insertCell(1);
                    const cellReleaseDate = row.insertCell(2);
                    const cellOverview = row.insertCell(3);

                    const imageUrl = `${imageBaseUrl}${movie.poster_path}`;
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = movie.title;
                    img.style.width = '100px'; // Adjust the width as necessary
                    cellImage.appendChild(img);

                    cellTitle.textContent = movie.title;
                    cellReleaseDate.textContent = movie.release_date;
                    cellOverview.textContent = movie.overview;
                });

                // Show the table and hide movies button
                moviesTable.style.display = 'table';
                hideMoviesButton.style.display = 'inline-block';
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    hideMoviesButton.addEventListener('click', () => {
        // Hide the table and hide movies button
        moviesTable.style.display = 'none';
        hideMoviesButton.style.display = 'none';
    });
});
