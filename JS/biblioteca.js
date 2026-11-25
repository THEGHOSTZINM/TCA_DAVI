import { banco } from './supabase.js';

// busca os jogos da biblioteca de um usuário

export async function buscarBiblioteca(idUsuario) {
    let resultado = await banco.from('biblioteca')
        .select('id_jogo, status')
        .eq('id_usuario', idUsuario);

    if (resultado.error) {
        throw resultado.error;
    }

    return resultado.data;
}

// adiciona, altera ou remove jogos da biblioteca

export async function salvarStatus(idUsuario, idJogo, status) {

    // remove o jogo da biblioteca

    if (status === '') {
        let resultado = await banco.from('biblioteca')
            .delete()
            .eq('id_usuario', idUsuario)
            .eq('id_jogo', idJogo);

        if (resultado.error) {
            throw resultado.error;
        }

    } else {

        // adiciona ou altera o status do jogo
        
        let resultado = await banco.from('biblioteca')
            .upsert({
                id_usuario: idUsuario,
                id_jogo: idJogo,
                status: status
            }, { onConflict: 'id_usuario,id_jogo' });

        if (resultado.error) {
            throw resultado.error;
        }
    }
}