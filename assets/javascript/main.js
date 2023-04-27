const listaHTML = document.getElementById('lista-de-pokemons')
const btnPaginacao = document.getElementById('load-more')
const limit = 5
let offset = 0
const maxRecords = 151

function converPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.main_type}">
            <div class="identificacao">
                <span class="nome">${pokemon.name}</span>
                <span class="numero">#${pokemon.num}</span>
            </div>

            <div class="detalhe">
                <ul class="tipos">
                    ${pokemon.types
                        .map(
                            type =>
                                `<li class="tipo ${'tipo-'.concat(
                                    pokemon.main_type
                                )}">${type}</li>`
                        )
                        .join(' ')}
                </ul>
                <img src="${pokemon.picture}" alt="Imagem do pokemon ${
        pokemon.name
    }" />
            </div>
        </li>
    `
}

function loadPokeItems(offset = 0, limit = 5) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map(pokemon => {
            return converPokemonToLi(pokemon)
        })

        const newHTML = newList.join('') // junta tudo numa string sem separação
        listaHTML.innerHTML += newHTML
    })
}

loadPokeItems(offset, limit)

btnPaginacao.addEventListener('click', () => {
    offset += limit

    let qtdPokemon = offset + limit

    if (qtdPokemon >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokeItems(offset, newLimit)
        btnPaginacao.parentElement.removeChild(btnPaginacao)
    } else loadPokeItems(offset, limit)
})
