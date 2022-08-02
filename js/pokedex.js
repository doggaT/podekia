async function getAllPokemon() {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

	const data = await response.json();

	createDex(data);
}

getAllPokemon();

function createDex(data) {
	let pokedex = document.getElementById('pokedex');

	let pokemon = data;
	console.log(pokemon);
}
