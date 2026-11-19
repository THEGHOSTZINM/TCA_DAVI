
import { carregarJogos } from './jogos.js';

async function iniciar() {
    let jogos = await carregarJogos();
    let lista = document.querySelector('#lista');

    lista.replaceChildren();

    jogos.forEach(function(jogo) {
        let card = document.createElement('article');
        card.className = 'jogo';
    
    let titulo = document.createElement('h3');
    titulo.textContent = jogo.nome;
    
    let desenvolvedora = document.createElement('p');
    desenvolvedora.textContent = jogo.desenvolvedora;
    
    let descricao = document.createElement('p');
    descricao.textContent = jogo.descricao;

    card.appendChild(titulo);
    card.appendChild(desenvolvedora);
    card.appendChild(descricao);
    lista.appendChild(card);
    });
}

iniciar();