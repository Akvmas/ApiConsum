// Quand le formulaire est soumis, on appelle la fonction 'fetchJoke' pour récupérer une blague.
document.getElementById('jokeForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Empêche le formulaire d'être soumis de la manière traditionnelle.
    fetchJoke();  // Appelle la fonction qui récupère une blague de l'API.
});

// Quand le bouton 'clearTable' est cliqué, on vide le tableau et le LocalStorage.
document.getElementById('clearTable').addEventListener('click', function() {
    document.querySelector('#resultsTable tbody').innerHTML = '';  // Vide le tableau.
    localStorage.removeItem('jokes');  // Supprime les blagues du LocalStorage.
});

// Si il y a des blagues dans le LocalStorage lors du chargement de la page, elles sont affichées.
if(localStorage.getItem('jokes')) {
    const jokes = JSON.parse(localStorage.getItem('jokes'));  // Récupère les blagues du LocalStorage.
    jokes.forEach(joke => displayJoke(joke));  // Affiche chaque blague dans le tableau.
}

// Fonction pour récupérer une blague de l'API.
function fetchJoke() {
    // Récupère les catégories et drapeaux choisis par l'utilisateur.
    const categories = Array.from(document.getElementById('jokeCategory').selectedOptions)
                        .map(option => option.value)
                        .join(',');
    const flags = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(input => input.value)
                .join(',');

    // Construit l'URL pour la requête API avec les catégories et drapeaux.
    const apiUrl = `https://v2.jokeapi.dev/joke/${categories}?lang=fr&blacklistFlags=${flags}`;

    // Effectue la requête API.
    fetch(apiUrl)
        .then(response => response.json())  // Convertit la réponse de l'API en objet JavaScript.
        .then(data => {
            // Récupère et affiche la blague, puis la sauvegarde.
            const joke = data.joke || data.setup + ' ' + data.delivery;
            displayJoke(joke);
            saveJoke(joke);
        })
        .catch(error => console.error('Error fetching data: ', error));  // Affiche les erreurs dans la console.
}

// Fonction pour afficher une blague dans le tableau.
function displayJoke(joke) {
    const tableBody = document.querySelector('#resultsTable tbody');
    const rowCount = tableBody.rows.length;
    const row = tableBody.insertRow(rowCount);
    row.insertCell(0).textContent = rowCount + 1;  // Numéro de la blague.
    row.insertCell(1).textContent = joke;  // Texte de la blague.
}

// Fonction pour sauvegarder une blague dans le LocalStorage.
function saveJoke(joke) {
    let jokes = localStorage.getItem('jokes') ? JSON.parse(localStorage.getItem('jokes')) : [];  // Récupère les blagues existantes ou initialise un tableau vide.
    jokes.push(joke);  // Ajoute la nouvelle blague au tableau.
    localStorage.setItem('jokes', JSON.stringify(jokes));  // Sauvegarde le tableau mis à jour dans le LocalStorage.
}
