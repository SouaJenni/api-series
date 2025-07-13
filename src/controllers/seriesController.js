const serieService = require('../services/serieService');

module.exports = {
    async listarSeries(req, res) {
        try {
            const series = await serieService.listarSeries();
            res.status(200).json(series);
            console.log('Listando séries.');
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar séries', detail: err.message});
            console.log('Séries não encontradas para listar.');
        }
    },

    async buscarSeriePorId(req, res) {
        try {
            const {id} = req.params;
            const serie = await serieService.buscarSeriePorId(id);
            if (!serie) {
                console.log('Sem séries para este ID.');
                return res.status(404).json({error: 'Série não encontrada'});
            }
            res.status(200).json(serie);
            console.log('Listando série.');
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar série', detail: err.message});
            console.log('Erro ao buscar série para listar.');
        }
    },

    async salvarSerie(req, res) {
        try {
            const novaSerie = await serieService.criarSerie(req.body);
            res.status(201).json(novaSerie);
            console.log('Adicionando nova série.');
        } catch (err) {
            res.status(400).json({error: 'Erro ao criar serie', detail: err.message});
            console.log('Erro ao adicionar série.');
        }

    },

    async atualizarSerie(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const atualizado = await serieService.atualizarSerie(id, dados);

            if (!atualizado) {
                console.log('Série não encontrada para atualizar.');
                return res.status(404).json({ error: 'Série não encontrada para atualizar.'});
            }
            console.log('Atualizando série.');
            return res.status(200).json(atualizado);
        } catch (err) {
            console.log('Erro ao atualizar série.');
            return res.status(400).json({ error: 'Erro ao atualizar série.', detail: err.message});
        }
    },

    async deletarSerie(req, res) {
        try {
            const {id} = req.params;
            const removido = await serieService.deletarSerie(id);
            if (!removido) {
                console.log('Série não encontrada para deletar.');
                return res.status(404).json({error: 'Série não encontrado para deletar'});
            }
            res.status(204).send();
            console.log('Deletando série.');
        } catch (err) {
            res.status(500).json({error: 'Erro ao deletar série', detail: err.message});
            console.log('Erro ao deletar série.');
        }
    },

    async buscarSugestoes(req, res) {
        try {
            const {q} = req.query;
            if (!q) return res.status(400).json({error: 'Parâmetro "q" é obrigatório'});
            console.log('Erro: parâmetro "q" ausente.');

            const sugestoes = await serieService.buscarSugestoesExternas(q);
            res.status(200).json(sugestoes);
            console.log('Buscando sugestões.');
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar sugestões', detail: err.message});
            console.log('Erro ao buscar sugestões.');
        }
    }
};