const listaHTML = document.getElementById('lista-de-pokemons')
const btnPaginacao = document.getElementById('load-more')
const btnMode = document.getElementById('night-mode')
const icon = document.getElementById('icon-moon')
const body = document.getElementsByTagName('body')
const h1 = document.getElementsByTagName('h1')
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

function loadNightMode() {
    h1[0].classList = []
    body[0].classList = []
    btnMode.classList.remove('light-mode')
    icon.classList.remove('moon-light')
}

function loadLightMode() {
    btnMode.classList.add('light-mode')
    icon.classList.add('moon-light')
    h1[0].classList.add('h1-light')
    body[0].classList.add('body-light')
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

btnMode.addEventListener('click', () => {
    if (btnMode.classList.length == 1) {
        loadLightMode()
    } else {
        loadNightMode()
    }
})
