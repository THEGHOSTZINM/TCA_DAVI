import { banco } from './supabase.js';

export async function carregarjogos() {
const { data, error } = await banco
    .from('jogos')
    .select('*')
    .order('nome');

    if (error) {
        console.log('Erro ao carregar jogos:',
            error.message);
            return [];
        }

        return data;
    }

