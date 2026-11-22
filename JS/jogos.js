import { banco } from './supabase.js';

function verificar(resultado) {
    if (resultado.error) throw resultado.error;
    return resultado.data;
}

export async function buscarCatalogo() {
    let jogos = verificar(await banco.from('jogos').select('*').order('nome'));
    let generos = verificar(await banco.from('generos').select('*').order('nome'));
    let plataformas = verificar(await banco.from('plataformas').select('*').order('nome'));
    let jogosGeneros = verificar(await banco.from('jogos_generos').select('*'));
    let jogosPlataformas = verificar(await banco.from('jogos_plataformas').select('*'));

    let lista = [];
    jogos.forEach(function(jogo) {
        let nomeGenero = 'Sem gênero';
        let plataformasJogo = [];
        let idGenero = null;

        jogosGeneros.forEach(function(relacao) {
            if (relacao.id_jogo === jogo.id_jogo && idGenero === null) {
                idGenero = relacao.id_genero;
            }
        });
        generos.forEach(function(genero) {
            if (genero.id_genero === idGenero) nomeGenero = genero.nome;
        });
        jogosPlataformas.forEach(function(relacao) {
            if (relacao.id_jogo === jogo.id_jogo) {
                plataformas.forEach(function(plataforma) {
                    if (plataforma.id_plataforma === relacao.id_plataforma) {
                        plataformasJogo.push(plataforma.nome);
                    }
                });
            }
        });

        lista.push({
            id: jogo.id_jogo,
            nome: jogo.nome,
            descricao: jogo.descricao || '',
            desenvolvedora: jogo.desenvolvedora,
            ano: jogo.ano_lancamento,
            genero: nomeGenero,
            plataformas: plataformasJogo,
            criadoPor: jogo.id_usuario_criador || null
        });
    });
    return { jogos: lista, generos: generos, plataformas: plataformas };
}

export async function salvarJogoBanco(jogo, plataformasEscolhidas, editando, idUsuario) {

    let repetido = await banco.from('jogos').select('id_jogo, nome');
    if (repetido.error) throw repetido.error;
    let nomeNormalizado = jogo.nome.trim().toLowerCase().replace(/\s+/g, ' ');
    let mesmoNome = repetido.data.find(function(item) {
        return item.nome.trim().toLowerCase().replace(/\s+/g, ' ') === nomeNormalizado
            && item.id_jogo !== editando;
    });
    if (mesmoNome) throw new Error('Já existe um jogo com esse nome no catálogo.');

    let dadosJogo = {
        nome: jogo.nome,
        descricao: jogo.descricao,
        desenvolvedora: jogo.desenvolvedora,
        ano_lancamento: jogo.ano
    };
    let idJogo;
    if (editando === null) {
        dadosJogo.id_usuario_criador = idUsuario;
        let resposta = await banco.from('jogos').insert(dadosJogo).select('id_jogo').single();
        if (resposta.error) throw resposta.error;
        idJogo = resposta.data.id_jogo;
    } else {
        let resposta = await banco.from('jogos').update(dadosJogo)
            .eq('id_jogo', editando).eq('id_usuario_criador', idUsuario).select('id_jogo').single();
        if (resposta.error) throw resposta.error;
        idJogo = resposta.data.id_jogo;
        let apagarGenero = await banco.from('jogos_generos').delete().eq('id_jogo', idJogo);
        if (apagarGenero.error) throw apagarGenero.error;
        let apagarPlataformas = await banco.from('jogos_plataformas').delete().eq('id_jogo', idJogo);
        if (apagarPlataformas.error) throw apagarPlataformas.error;
    }

    let respostaGenero = await banco.from('jogos_generos')
        .insert({ id_jogo: idJogo, id_genero: jogo.idGenero });
    if (respostaGenero.error) throw respostaGenero.error;

    let relacoes = [];
    plataformasEscolhidas.forEach(function(idPlataforma) {
        relacoes.push({ id_jogo: idJogo, id_plataforma: idPlataforma });
    });
    let respostaPlataforma = await banco.from('jogos_plataformas').insert(relacoes);
    if (respostaPlataforma.error) throw respostaPlataforma.error;
    return idJogo;
}
