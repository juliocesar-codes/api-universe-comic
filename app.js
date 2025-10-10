'use strict'



async function buscarImagem(personagem) {
    const url = `https://www.superheroapi.com/api.php/0092bd3d8f30eabe0f235a3da1fc3470/search/${personagem}`;
    const response = await fetch(url);
    const imagens = await response.json();
    // imagens.results.forEach(item => {})

    return imagens.results

}

async function afiliacaoHeroi() {

    main.textContent = ''
}

async function detalheHeroi(heroi) {


    const main = document.getElementById('main')
    main.textContent = ''

    let divDetalhes = document.createElement('div')
    divDetalhes.className = 'pagina-detalhes'

    let detalhesText = document.createElement('div')
    divDetalhes.className = 'detalhesText'

    const h2 = document.createElement('h2')
    h2.textContent = "Página de Detalhes"

    const afiliacoesString = heroi.connections['group-affiliation']

    const afiliacoesArray = afiliacoesString.split(',').map(item => item.trim())

    const nome = document.createElement('h3')
    nome.textContent = heroi.name

    const image = document.createElement('img')
    image.src = 'https://corsproxy.io/?' + heroi.image.url

    main.appendChild(h2)
    divDetalhes.appendChild(image)
    divDetalhes.appendChild(nome)
    main.appendChild(divDetalhes)

    afiliacoesArray.forEach(afiliacao => {
        const p = document.createElement('p')
        p.textContent = afiliacao


        const a = document.createElement('a')
        a.addEventListener('click', function() {
            afiliacaoHeroi()


        })
        divDetalhes.appendChild(a)
        a.appendChild(p)
    })




}
async function criarImagem() {
    const main = document.getElementById('main')
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