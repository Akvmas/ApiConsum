
# Générateur de Blagues

## Présentation du Projet

Le générateur de blagues est une application web interactive permettant aux utilisateurs de récupérer et d'afficher des blagues en utilisant l'API JokeAPI. Les blagues sont récupérées en fonction des préférences de l'utilisateur et sont affichées dans un tableau sur la page web, elles sont également stockées dans le LocalStorage pour les visites futures.

## Objectifs du Projet

1. **Concevoir un formulaire** : Mettre en place un formulaire permettant à l'utilisateur de spécifier ses préférences pour la requête API.
2. **Consommation de l'API** : Utiliser les choix de l'utilisateur pour générer une requête bien formée et récupérer des données depuis l'API JokeAPI.
3. **Affichage des Blagues** : Montrer les blagues récupérées dans un tableau sur la page web.
4. **Gestion du Tableau** : Fournir une option pour vider le tableau à l'aide d'un bouton.
5. **Utilisation du LocalStorage** : Sauvegarder les blagues dans le LocalStorage et les afficher lors des visites ultérieures de l'utilisateur.

## Détails Techniques avec Exemples de Code

### 1. Conception du Formulaire

#### HTML
Un formulaire avec un menu déroulant pour les catégories et des cases à cocher pour les drapeaux.

```html
<form id="jokeForm">
    <select class="form-select" id="jokeCategory" required multiple>
        <option value="Misc">Misc</option>
        <!-- ... autres options ... -->
    </select>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="nsfw" id="nsfw">
        <label class="form-check-label" for="nsfw">NSFW</label>
    </div>
    <!-- ... autres cases à cocher ... -->
    <button type="submit" class="btn btn-primary">Get Joke</button>
</form>
```

### 2. Consommation de l'API

#### JavaScript
Récupérer les valeurs du formulaire et faire une requête API.

```javascript
function fetchJoke() {
    // Récupère les catégories et flags choisis par l'utilisateur.
    const categories = Array.from(document.getElementById('jokeCategory').selectedOptions)
                        .map(option => option.value)
                        .join(',');
    const flags = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(input => input.value)
                .join(',');

    // Construit l'URL pour la requête API avec les catégories et flags.
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
```

### 3. Affichage des Blagues

Utiliser JavaScript pour insérer les blagues dans un tableau HTML.

```javascript
function displayJoke(joke) {
    const tableBody = document.querySelector('#resultsTable tbody');
    const rowCount = tableBody.rows.length;
    const row = tableBody.insertRow(rowCount);
    row.insertCell(0).textContent = rowCount + 1;
    row.insertCell(1).textContent = joke;
}
```

### 4. Gestion du Tableau

Un bouton HTML qui, lorsqu'il est cliqué, appelle une fonction JavaScript pour vider le tableau.

```html
<button type="button" id="clearTable" class="btn btn-secondary">Clear Table</button>
```

```javascript
document.getElementById('clearTable').addEventListener('click', function() {
    document.querySelector('#resultsTable tbody').innerHTML = '';
});
```

### 5. Utilisation du LocalStorage

Sauvegarder et récupérer des blagues avec le LocalStorage en JavaScript.

```javascript
function saveJoke(joke) {
    let jokes = localStorage.getItem('jokes') ? JSON.parse(localStorage.getItem('jokes')) : [];
    jokes.push(joke);
    localStorage.setItem('jokes', JSON.stringify(jokes));
}
```

## Conclusion

L'application web "Générateur de Blagues" est conçue pour fournir une interface utilisateur simple mais interactive, permettant de récupérer, d'afficher et de sauvegarder des blagues basées sur les préférences de l'utilisateur en utilisant les technologies HTML, JavaScript et Bootstrap pour le style.