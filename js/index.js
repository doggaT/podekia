'use strict';

/* search and display favorite pokemon */
let searchbar = document.getElementById('searchbar');
let pokemonStored;
let searchedPokemon = '';
let errorMessage = '';

searchbar.addEventListener('keyup', e => {
	searchedPokemon = e.target.value;
});

async function getPokemon() {
	clear();

	if (searchedPokemon.trim() !== '') {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`);

		const data = await response.json();

		let pokemon = {
			id: data.id,
			name: data.name,
			img: data.sprites.front_default,
			stats: data.stats,
			types: data.types,
			weight: data.weight,
		};
		console.log(data);

		localStorage.setItem('favoritePokemon', JSON.stringify(pokemon));
		createPokemon();
	} else {
		errorMessage = 'Enter a Pokémon';
	}
}

/* on load check if local storage contains a favorite Pokemon and render it if true */
window.addEventListener('load', () => {
	if (localStorage.getItem('favoritePokemon') !== null) {
		createPokemon();
	}
});

/* capitalize first letter */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/* return the highest stat */
function getHighestStat() {
	let highestStat = 0;
	pokemonStored.stats.forEach(stat => {
		let currentStat = stat.base_stat;
		highestStat = Math.max(currentStat, highestStat);
	});

	return highestStat;
}

/* set the stat bar width according to the highest stat */
function setWidth(stat) {
	const highestStat = getHighestStat();

	if (highestStat > 100) {
		return `${(stat / highestStat) * 100}`;
	} else {
		return stat;
	}
}

function setClassType(type) {
	const PokemonTypes = {
		'normal': 'normal',
		'fire': 'fire',
		'water': 'water',
		'grass': 'grass',
		'electric': 'electric',
		'ice': 'ice',
		'fighting': 'fighting',
		'poison': 'poison',
		'ground': 'ground',
		'flying': 'flying',
		'psychic': 'psychic',
		'bug': 'bug',
		'rock': 'rock',
		'ghost': 'ghost',
		'dark': 'dark',
		'dragon': 'dragon',
		'steel': 'steel',
		'fairy': 'fairy',
	};
	return PokemonTypes[type];
}

function setClassStat(stat) {
	const PokemonStat = {
		'hp': 'hp',
		'attack': 'attack',
		'defense': 'defense',
		'special-attack': 'special-attack',
		'special-defense': 'special-defense',
		'speed': 'speed',
	};
	return PokemonStat[stat];
}

function createPokemon() {
	pokemonStored = JSON.parse(localStorage.getItem('favoritePokemon'));

	let resultDiv = document.getElementById('content-result');

	let PokeCard = `
		<div id="card">
			<div class="card-heading">
				<span> No: ${pokemonStored.id}</span>
				<h2>${capitalize(pokemonStored.name)}</h2>
			</div>
			<div class="card-content">
				<div class="card-types">
					${pokemonStored.types
						.map(type => {
							return `<p class="type type-wrapper ${setClassType(type.type.name)}">${capitalize(
								type.type.name
							)}</p>`;
						})
						.join('')}
				</div>
				<div class="card-img">
					<img src="${pokemonStored.img}" alt="${pokemonStored.name}">
				</div>
			</div>
			<div class="card-stats">
	

			${pokemonStored.stats
				.map(stat => {
					return `<div class="wrap">
								<p class="stats-name">${capitalize(stat.stat.name)}</p>
								<div class="stat ${setClassStat(stat.stat.name)}-b ">
									<div style="width:${setWidth(stat.base_stat)}%;" class="stat-name ${setClassStat(
						stat.stat.name
					)}">${stat.base_stat}</div>
								</div>
							</div>
							`;
				})
				.join('')}
			</div>
			<div class="card-weight">
				<span>Weight: ${pokemonStored.weight}</span>
			</div>
		</div>
	`;

	resultDiv.insertAdjacentHTML('afterbegin', PokeCard);
}

function clear() {
	let resultDiv = document.getElementById('content-result');
	let card = document.getElementById('card');

	if (resultDiv.contains(card)) {
		resultDiv.removeChild(card);
	}
}
