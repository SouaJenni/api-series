const SerieModel = require('../models/seriesModel');
const imdbClient = require('../utils/imdbClient');

function validarId(id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('ID inválido');
    }
}

function validarNotas(notaImdb, notaUsuario) {
    if(notaImdb < 0 || notaImdb > 5) {
        throw new Error('Nota IMDB deve ser um número entre 0 e 5');
    }
    if(notaUsuario < 0 || notaUsuario > 5) {
        throw new Error('A nota deve ser um número entre 0 e 5');
    }
}

function validarSerie(data) {
    const { titulo, notaUsuario, idImdb, notaImdb, tipo } = data;

    if (typeof titulo !== 'string' || !titulo.trim()) {
        throw new Error('Título é obrigatório e deve ser uma string.');
    }

    if (typeof notaUsuario !== 'number') {
        throw new Error('Nota do usuário é obrigatória e deve ser um número.');
    }

    if (typeof idImdb != 'string' || !idImdb.trim()) {
        throw new Error('ID do IMDb é obrigatório.');
    }

    if (typeof notaImdb !== 'number') {
        throw new Error('Nota do IMDb é obrigatória e deve ser um número.');
    }

    if (typeof tipo !== 'string' || !['filme', 'serie'].includes(tipo)) {
        throw new Error('Tipo é obrigatório e deve ser "filme" ou "serie".');
    }
}

module.exports = {
    async listarSeries(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 5;

        return SerieModel.find({ deletado: false })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    },

    async buscarSeriePorId(id) {
        validarId(id);
        return SerieModel.findOne({ _id: id, deletado: false });
    },

    async criarSerie(data) {
        const {titulo, notaUsuario, idImdb, notaImdb, tipo} = data;
        if (!titulo || !notaUsuario || !idImdb || !notaImdb || !tipo) {
            throw new Error('Título, nota e informações da série são obrigatórios.');
        }

        validarSerie(data);
        validarNotas(notaImdb, notaUsuario);

        const serieExistente = await SerieModel.findOne({ idImdb, deletado: false });

        if (serieExistente) {
            throw new Error('Esta série já foi cadastrada.');
        }

        const serie = new SerieModel(data);

        return serie.save();
    },

    async atualizarSerie(id, data) {
        validarId(id);

        const { notaUsuario, comentario } = data;

        if (notaUsuario === undefined && comentario === undefined) {
            throw new Error ('É necessário fornecer ao menos "nota" ou "comentario" para atualizar.');
        }

        const dadosAtualizar = {};
        if (notaUsuario !== undefined) dadosAtualizar.notaUsuario = notaUsuario;
        if (comentario !== undefined) dadosAtualizar.comentario = comentario;

        return SerieModel.findByIdAndUpdate({ _id: id, deletado: false }, dadosAtualizar, { new: true });
    },

    async deletarSerie(_id) {
        validarId(_id);

        return SerieModel.findByIdAndUpdate(_id, { deletado: true }, { new: true });
    },

    async buscarSugestoesExternas(query) {
        const resultados = await imdbClient.buscarSugestoes(query);
        if (!resultados || resultados.length === 0) {
            throw new Error('Nenhum resultado encontrado para a busca.');
        }
        return resultados;
    }
};