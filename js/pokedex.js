'use strict';

/* render on load */
window.addEventListener('load', () => {
	getDex();
	createButton();
});

/* capitalize first letter */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

let next = '';

async function getDex() {
	const url = next || 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=60';
	const response = await fetch(url);
	const data = await response.json();
	next = data.next;

	const promisses = [];

	data.results.map(result => {
		promisses.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${result.name}`).then(response => response.json())
		);
	});

	// https://dmitripavlutin.com/promise-all/
	Promise.all(promisses).then(results => {
		const pokemon = results.map(data => ({
			id: data.id,
			name: data.name,
			img: data.sprites.front_default,
			stats: data.stats,
			types: data.types,
		}));
		createPokemon(pokemon);
	});
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

function createPokemon(pkmn) {
	let pokedex = document.getElementById('pokedex');

	let dexDiv = `
		${pkmn
			.map(pkm => {
				return `
					<div class='dex-container'>
						<span class='dex-n'>#${pkm.id}</span>
						<div class='img-container'>
							<img src ='${pkm.img}'>
							<div class='dex-types'>
							${pkm.types
								.map(type => {
									return `<p class='type type-wrapper ${setClassType(type.type.name)}'>${capitalize(
										type.type.name
									)}</p>`;
								})
								.join('')}
						</div>
						</div>
						<div>
							<h1>${capitalize(pkm.name)}</h1>
						</div>	
					</div>
			`;
			})
			.join('')}`;

	pokedex.insertAdjacentHTML('beforeend', dexDiv);
}

function createButton() {
	let pokedex = document.getElementById('pokedex');

	let more = `<div class='more'>
					<button id="more" onClick="getMore()">Load More</button>
				</div>`;

	pokedex.insertAdjacentHTML('afterend', more);
}

function getMore() {
	getDex();
}
