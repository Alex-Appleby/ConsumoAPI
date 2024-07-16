const API_URL = 'https://hp-api.onrender.com/api/characters';
const characterCards = document.getElementById('characterCards');
const searchInput = document.getElementById('searchInput');
const houseFilter = document.getElementById('houseFilter');
let characters = [];

// Función para obtener los personajes de la API
async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        characters = await response.json();
        displayCharacters(characters);
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
    }
}

// Función para mostrar los personajes
function displayCharacters(chars) {
    characterCards.innerHTML = '';
    chars.forEach(char => {
        const card = createCharacterCard(char);
        characterCards.appendChild(card);
    });
}

// Función para crear una tarjeta de personaje
function createCharacterCard(char) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="card">
            <img src="${char.image || 'https://via.placeholder.com/300x400?text=No+Image'}" class="card-img-top" alt="${char.name}">
            <div class="card-body">
                <h5 class="card-title">${char.name}</h5>
                <p class="card-text">
                    Casa: ${char.house || 'Desconocida'}<br>
                    Actor: ${char.actor || 'Desconocido'}<br>
                    Especie: ${char.species || 'Desconocida'}<br>
                    Patronus: ${char.patronus || 'Desconocido'}
                </p>
            </div>
        </div>
    `;
    
    return col;
}

// Función para filtrar personajes
function filterCharacters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedHouse = houseFilter.value;
    
    const filteredChars = characters.filter(char => {
        const matchesSearch = char.name.toLowerCase().includes(searchTerm) ||
                              (char.house && char.house.toLowerCase().includes(searchTerm)) ||
                              (char.actor && char.actor.toLowerCase().includes(searchTerm));
        
        const matchesHouse = !selectedHouse || char.house === selectedHouse;
        
        return matchesSearch && matchesHouse;
    });
    
    displayCharacters(filteredChars);
}

// Event listeners
searchInput.addEventListener('input', filterCharacters);
houseFilter.addEventListener('change', filterCharacters);

// Inicializar la aplicación
fetchCharacters();