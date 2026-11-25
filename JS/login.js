import { banco } from './supabase.js';

// cadastra um novo usuário

export async function criarUsuario(nome) {
    verificarNome(nome);

    let consulta = await banco.from('usuarios')
        .select('id_usuario')
        .ilike('nome', nome);

    if (consulta.error) {
        throw consulta.error;
    }

    if (consulta.data.length > 0) {
        throw new Error('Esse nome já está cadastrado.');
    }

    let resposta = await banco.from('usuarios')
        .insert({ nome: nome })
        .select('id_usuario, nome')
        .single();

    if (resposta.error) {
        throw resposta.error;
    }

    return resposta.data;
}

// faz login com um usuário já cadastrado

export async function entrarUsuario(nome) {
    verificarNome(nome);

    let resposta = await banco.from('usuarios')
        .select('id_usuario, nome')
        .eq('nome', nome)
        .limit(1)
        .maybeSingle();

    if (resposta.error) {
        throw resposta.error;
    }

    if (!resposta.data) {
        throw new Error('Nome não encontrado. Verifique como escreveu seu nome.');
    }

    return resposta.data;
}

// verifica se o nome foi digitado corretamente

function verificarNome(nome) {
    if (!nome.trim()) {
        throw new Error('Digite seu nome.');
    }

    if (nome !== nome.trim()) {
        throw new Error('O nome não pode começar ou terminar com espaços.');
    }
}