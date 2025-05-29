// src/services/filmeService.js
const Series = require('../models/seriesModel');
const imdbClient = require('../utils/imdbClient.js');

module.exports = {
// Listar todos os filmes comentados
    async listarFilmes() {
        return await Series.find().sort({ createdAt: -1 }); // mais recentes primeiro
    },

// Buscar um filme por ID
    async buscarFilmePorId(id) {
        return await Series.findById(id);
    },

// Criar novo filme com comentário do usuário
    async criarFilme(data) {
        const {titulo, nota, comentario} = data;
        if (!titulo || !nota || !comentario) {
            throw new Error('Título, nota e comentário são obrigatórios');
        }

// Buscar informações adicionais do filme via API externa
        const dadosExternos = await imdbClient.buscarFilmePorTitulo(titulo);

        const filme = new Series({
            titulo,
            notaUsuario: nota,
            comentario,
            capa: dadosExternos.Poster,
            resumo: dadosExternos.Plot,
            notaImdb: dadosExternos.imdbRating
        });

        return await filme.save();
    },

    async atualizarFilme(id, data) {
        return await Series.findByIdAndUpdate(id, data, { new: true });
    },

// Deletar um filme/comentário
    async deletarFilme(id) {
        return await Series.findByIdAndDelete(id);
    },

// Buscar sugestões por nome de filme via API externa
    async buscarSugestoesExternas(query) {
        const resultados = await imdbClient.buscarSugestoes(query);
        return resultados;
    }
};