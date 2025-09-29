'use strict'

async function buscarImagem(personagem) {
    const url = `https://www.superheroapi.com/api.php/0092bd3d8f30eabe0f235a3da1fc3470/search/${personagem}`;
    const response = await fetch(url);
    const imagens = await response.json();    
    imagens.results.forEach(item =>{
        console.log(item.image.url) 
    })

    return imagens.results
    
}

async function criarImagem(){

    const main = document.getElementById('main')
    main.textContent = ''
    const heroi = document.getElementById( 'inputHeroi').value

    const herois = await buscarImagem(heroi)

    const div = document.createElement('div')
    
    herois.forEach((url)=>{
        const img = document.createElement('img')
        // Usando proxy alternativo
        img.src = 'https://corsproxy.io/?' + url.image.url
        main.appendChild(div)
        div.appendChild(img)
    })

}

const btn = function(event){
    if (event.key === 'Enter'){
        criarImagem()
    }
}