function converPokemonTypes(pokemonTypes) {
    return pokemonTypes.map(typeSlot => {
        return `<li class="tipo">${typeSlot.type.name}</li>`
    })
}

function converPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <div class="identificacao">
                <span class="nome">${pokemon.name}</span>
                <span class="numero">#${pokemon.order}</span>
            </div>

            <div class="detalhe">
                <ul class="tipos">
                    ${converPokemonTypes(pokemon.types).join(' ')}
                </ul>
                <img src="${
                    pokemon.sprites.other.dream_world.front_default
                }" alt="Imagem do pokemon ${pokemon.name}" />
            </div>
        </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
    const newList = pokemons.map(pokemon => {
        return converPokemonToLi(pokemon)
    })

    const newHTML = newList.join('') // junta tudo numa string sem separação

    listaHTML = document.getElementById('lista-de-pokemons')
    listaHTML.innerHTML += newHTML
})
