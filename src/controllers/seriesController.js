const serieService = require('../services/serieService');

module.exports = {
    async listarSeries(req, res) {
        try {
            const series = await serieService.listarSeries();
            res.status(200).json(series);
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar séries', detail: err.message});
        }
    },

    async buscarSeriePorId(req, res) {
        try {
            const {id} = req.params;
            const serie = await serieService.buscarSeriePorId(id);
            if (!serie) {
                return res.status(404).json({error: 'Série não encontrada'});
            }
            res.status(200).json(serie);
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar série', detail: err.message});
        }
    },

    async salvarSerie(req, res) {
        try {
            const novaSerie = await serieService.criarSerie(req.body);
            res.status(201).json(novaSerie);
        } catch (err) {
            res.status(400).json({error: 'Erro ao criar serie', detail: err.message});
        }
    },

    async atualizarSerie(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const atualizado = await serieService.atualizarSerie(id, dados);

            if (!atualizado) {
                return res.status(404).json({ error: 'Série não encontrada para atualizar.'});
            }
            return res.status(200).json(atualizado);
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao atualizar série.', detail: err.message});
        }
    },

    async deletarSerie(req, res) {
        try {
            const {id} = req.params;
            const removido = await serieService.deletarSerie(id);
            if (!removido) {
                return res.status(404).json({error: 'Série não encontrado para deletar'});
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({error: 'Erro ao deletar série', detail: err.message});
        }
    },

    async buscarSugestoes(req, res) {
        try {
            const {q} = req.query;
            if (!q) return res.status(400).json({error: 'Parâmetro "q" é obrigatório'});
            const sugestoes = await serieService.buscarSugestoesExternas(q);
            res.status(200).json(sugestoes);
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar sugestões', detail: err.message});
        }
    }
};