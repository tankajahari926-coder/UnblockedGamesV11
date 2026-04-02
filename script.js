// Variable to store the full list of games
let allGames = [];

// DOM Elements
const gameContainer = document.getElementById('game-container');
const searchBar = document.getElementById('searchBar');
const gameModal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');

// 1. Load games from JSON
fetch('games.json')
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        allGames = data;
        renderGames(allGames);
    })
    .catch(function(error) {
        console.error('Error fetching games:', error);
        gameContainer.innerHTML = `<p style="color: #ff4757; text-align: center; width: 100%;">Error loading games. Please check if games.json exists and is valid.</p>`;
    });

// 2. Function to create the game cards on the screen
function renderGames(gamesToDisplay) {
    gameContainer.innerHTML = ''; // Clear current games
    
    if (gamesToDisplay.length === 0) {
        gameContainer.innerHTML = `<p style="color: #888; text-align: center; width: 100%;">No games found matching your search.</p>`;
        return;
    }

    gamesToDisplay.forEach(function(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}" referrerPolicy="no-referrer">
            <h3>${game.title}</h3>
        `;
        
        card.onclick = function() {
            openGame(game.url);
        };
        
        gameContainer.appendChild(card);
    });
}

// 3. Search Logic
searchBar.onkeyup = function() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredGames = allGames.filter(function(game) {
        return game.title.toLowerCase().includes(searchTerm);
    });
    renderGames(filteredGames);
};

// 4. Modal Controls
function openGame(url) {
    gameFrame.src = url;
    gameModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling background
}

function closeGame() {
    gameFrame.src = ""; // Stop game audio/loading
    gameModal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Global function for the close button in HTML
window.closeGame = closeGame;

// Close if user clicks background
window.onclick = function(event) {
    if (event.target == gameModal) {
        closeGame();
    }
};
