import { banco } from './supabase.js';

export async function criarUsuario(nome) {
    nome = nome.trim();
    if (!nome) throw new Error('Digite seu nome.');

    let consulta = await banco.from('usuarios')
        .select('id_usuario').eq('nome', nome);

    if (consulta.error) throw consulta.error;
    if (consulta.data.length > 0) throw new Error('Esse nome já está cadastrado.');

    let resposta = await banco.from('usuarios')
        .insert({ nome: nome }).select('id_usuario, nome').single();

    if (resposta.error) throw resposta.error;
    return resposta.data;
}

export async function entrarUsuario(nome) {
    nome = nome.trim();
    if (!nome) throw new Error('Digite seu nome.');

    let resposta = await banco.from('usuarios')
        .select('id_usuario, nome').eq('nome', nome).maybeSingle();

    if (resposta.error) throw resposta.error;
    if (!resposta.data) throw new Error('Nome não encontrado. Crie uma conta.');

    return resposta.data;
}