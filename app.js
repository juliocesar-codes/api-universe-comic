'use strict'



async function buscarImagem(personagem) {
    const url = `https://www.superheroapi.com/api.php/0092bd3d8f30eabe0f235a3da1fc3470/search/${personagem}`;
    const response = await fetch(url);
    const imagens = await response.json();
    // imagens.results.forEach(item => {})

    return imagens.results

}

async function afiliacaoHeroi(afiliacao) {

    const main = document.getElementById('main')

    const url2 = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`
    const response = await fetch(url2);
    const imagens = await response.json();


    main.textContent = ''

    console.log(afiliacao)


    const div = document.createElement('div')


    imagens.forEach(item => {
        // console.log(item.connections.groupAffiliation)
        if (item.connections.groupAffiliation.includes(afiliacao)) {
            console.log(item.name)

// 
            const img = document.createElement('img')
                // Usando proxy alternativo
            img.src = 'https://corsproxy.io/?' + item.images.lg

            const heroi = item

            const a = document.createElement('a')
            a.href = '#'
            a.addEventListener('click', function() {

                detalheHeroi(heroi);
            })

            main.appendChild(div)
            div.appendChild(a)
            a.appendChild(img)
        }

    })
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

    const afiliacoesString = heroi.connections.groupAffiliation || heroi.connections['group-affiliation'];

    const urlImagem = heroi.image ? heroi.image.url : heroi.images.lg;
    // Esta linha é equivalente a um if/else porém mais conciso

    const afiliacoesArray = afiliacoesString.split(',').map(item => item.trim())

    console.log(afiliacoesArray)

    const nome = document.createElement('h3')
    nome.textContent = heroi.name

    const image = document.createElement('img')
    image.src = 'https://corsproxy.io/?' + urlImagem

    main.appendChild(h2)
    divDetalhes.appendChild(image)
    divDetalhes.appendChild(nome)
    main.appendChild(divDetalhes)

    afiliacoesArray.forEach(afiliacao => {
        const p = document.createElement('p')
        p.textContent = afiliacao


        const a = document.createElement('a')
        a.href = '#'
        a.addEventListener('click', function() {
            afiliacaoHeroi(afiliacao)


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
    main.appendChild(div)

    herois.forEach((url) => {
        const img = document.createElement('img')
            // Usando proxy alternativo
        img.src = 'https://corsproxy.io/?' + url.image.url

        const a = document.createElement('a')
        a.href = '#'
        a.addEventListener('click', function(event) {
            event.preventDefault()
            detalheHeroi(url);
        })

        
        div.appendChild(a)
        a.appendChild(img)

    })

}

const btn = function(event) {
    if (event.key === 'Enter') {
        criarImagem()
    }
}