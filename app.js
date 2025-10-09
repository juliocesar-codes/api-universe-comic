'use strict'

async function buscarImagem(personagem) {
    const url = `https://www.superheroapi.com/api.php/0092bd3d8f30eabe0f235a3da1fc3470/search/${personagem}`;
    const response = await fetch(url);
    const imagens = await response.json();
    imagens.results.forEach(item => {})

    return imagens.results

}

async function detalheHeroi(url) {
    const main = document.getElementById('main')
    main.textContent = ''

    let divDetalhes = document.createElement('div')
    divDetalhes.className = 'divDetalhes'

    const h2 = document.createElement('h2')
    h2.textContent = "Página de Detalhes"

    console.log(url)
    // console.log(url.connections.group-affiliation)

    const nome = document.createElement('p')
    nome.textContent = url.name

    const image = document.createElement('img')
    image.src = 'https://corsproxy.io/?' + url.image.url

    main.appendChild(h2)
    divDetalhes.appendChild(image)
    divDetalhes.appendChild(nome)
    main.appendChild(divDetalhes)

}

async function criarImagem() {
    main.textContent = ''

    const heroi = document.getElementById('inputHeroi').value

    const herois = await buscarImagem(heroi)

    const div = document.createElement('div')

    herois.forEach((url) => {
        const img = document.createElement('img')
            // Usando proxy alternativo
        img.src = 'https://corsproxy.io/?' + url.image.url

        const a = document.createElement('a')
        a.addEventListener('click', function() {

            detalheHeroi(url);
        })

        main.appendChild(div)
        div.appendChild(a)
        a.appendChild(img)

    })

}

const btn = function(event) {
    if (event.key === 'Enter') {
        criarImagem()
    }
}