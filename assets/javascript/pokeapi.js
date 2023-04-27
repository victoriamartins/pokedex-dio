const pokeApi = {}

function convertToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.name = pokeDetail.name
    pokemon.num = pokeDetail.id
    /*
        Type é array com n tipos, cada tipo tem um slot, que é um identificador,
        e tem tbm um type que contém nome do tipo e url do tipo
    */
    pokemon.types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    pokemon.main_type = pokemon.types[0]
    pokemon.picture = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then(response => {
            // body da response é readableStream, mas precisa converter para JSON
            return response.json()
        })
        .then(jsonBody => {
            // executado com o return do then acima
            // results é o nome do array que armazena os pokemons
            return jsonBody.results
        })
        .then(pokemons => {
            // pokemons até aqui têm nome e url, aqui, o url é acessado para pegar + dados
            return pokemons.map(pokemon => pokeApi.getPokemonDetail(pokemon))
        })
        .then(detailRequest => {
            // executa as promises
            return Promise.all(detailRequest)
        })
        .then(pokeDetails => {
            console.log(pokeDetails)
            return pokeDetails
        })
        .catch(error => console.log(error))
}
