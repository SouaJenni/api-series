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
    async criarSerie(data) {
        const {titulo, notaUsuario, idImdb, notaImdb, tipo} = data;
        if (!titulo || !notaUsuario || !idImdb || !notaImdb || !tipo) {
            throw new Error('Título, nota e informações da série são obrigatórios.');
        }

        const serie = new Series(data);

        return await serie.save();
    },

    async atualizarSerie(id, data) {
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