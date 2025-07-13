const serieService = require('../services/serieService');

module.exports = {
    async listarSeries(req, res) {
        try {
            const series = await serieService.listarSeries();
            console.log('Listando séries.');
            res.status(200).json(series);
        } catch (err) {
            console.log('Séries não encontradas para listar.');
            res.status(500).json({error: 'Erro ao buscar séries', detail: err.message});
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
            console.log('Listando série.');
            res.status(200).json(serie);
        } catch (err) {
            console.log('Erro ao buscar série para listar.');
            res.status(500).json({error: 'Erro ao buscar série', detail: err.message});
        }
    },

    async salvarSerie(req, res) {
        try {
            const novaSerie = await serieService.criarSerie(req.body);
            console.log('Adicionando nova série.');
            res.status(201).json(novaSerie);
        } catch (err) {
            console.log('Erro ao adicionar série.');
            res.status(400).json({error: 'Erro ao criar serie', detail: err.message});
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
            console.log('Deletando série.');
            res.status(204).send();
        } catch (err) {
            console.log('Erro ao deletar série.');
            res.status(500).json({error: 'Erro ao deletar série', detail: err.message});
        }
    },

    async buscarSugestoes(req, res) {
        try {
            const {q} = req.query;
            if (!q) {

                console.log('Erro: parâmetro "q" ausente.');
                return res.status(400).json({ error: 'Parâmetro "q" é obrigatório' });
            }

            if (q.trim().length === 0 || q === '') {

                console.log('Parâmetro "q" está presente, mas vazio.');
                return res.status(200).json([]);
            }

            const sugestoes = await serieService.buscarSugestoesExternas(q);
            console.log('Buscando sugestões.');
            res.status(200).json(sugestoes);
        } catch (err) {
            console.log('Erro ao buscar sugestões.');
            res.status(500).json({error: 'Erro ao buscar sugestões', detail: err.message});
        }
    }
};