// src/services/filmeService.js
const SerieModel = require('../models/seriesModel');
const imdbClient = require('../utils/imdbClient.js');

module.exports = {
// Listar todos os filmes comentados
    async listarFilmes() {
        return SerieModel.find().sort({ createdAt: -1 }); // mais recentes primeiro
    },

    // Buscar um filme por ID
    async buscarFilmePorId(id) {
        return SerieModel.findById(id);
    },

    // Criar novo filme com comentário do usuário
    async criarSerie(data) {
        const {titulo, notaUsuario, idImdb, notaImdb, tipo} = data;
        if (!titulo || !notaUsuario || !idImdb || !notaImdb || !tipo) {
            throw new Error('Título, nota e informações da série são obrigatórios.');
        }

        const serie = new SerieModel(data);

        return serie.save();
    },

    async atualizarSerie(id, data) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error ('ID inválido');
        }

        const { notaUsuario, comentario } = data;

        if (notaUsuario === undefined && comentario === undefined) {
            throw new Error ('É necessário fornecer ao menos "nota" ou "comentario" para atualizar.');
        }

        const dadosAtualizar = {};
        if (notaUsuario !== undefined) dadosAtualizar.notaUsuario = notaUsuario;
        if (comentario !== undefined) dadosAtualizar.comentario = comentario;

        return SerieModel.findByIdAndUpdate(id, dadosAtualizar, { new: true });
    },

    // Deletar um filme/comentário
    async deletarFilme(id) {
        return SerieModel.findByIdAndDelete(id);
    },

    // Buscar sugestões por nome de filme via API externa
    async buscarSugestoesExternas(query) {
        const resultados = await imdbClient.buscarSugestoes(query);
        return resultados;
    }
};