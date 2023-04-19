const pokeApi = {}

pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url).then(response => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
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
