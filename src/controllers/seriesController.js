const serieService = require('../services/serieService');

module.exports = {
// GET /filmes
    async getTodosFilmes(req, res) {
        try {
            const filmes = await serieService.listarFilmes();
            res.status(200).json(filmes);
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar filmes', detail: err.message});
        }
    },

    // GET /filmes/:id
    async getFilmePorId(req, res) {
        try {
            const {id} = req.params;
            const filme = await serieService.buscarFilmePorId(id);
            if (!filme) {
                return res.status(404).json({error: 'Filme não encontrado'});
            }
            res.status(200).json(filme);
        } catch (err) {
            res.status(500).json({error: 'Erro ao buscar filme', detail: err.message});
        }
    },

    // POST /filmes
    async salvarSerie(req, res) {
        try {
            const novaSerie = await serieService.criarSerie(req.body);
            res.status(201).json(novaSerie);
        } catch (err) {
            res.status(400).json({error: 'Erro ao criar serie', detail: err.message});
        }
    },

    // PUT /series/:id
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

    // DELETE /filmes/:id
    async deletarFilme(req, res) {
        try {
            const {id} = req.params;
            const removido = await serieService.deletarFilme(id);
            if (!removido) {
                return res.status(404).json({error: 'Filme não encontrado para deletar'});
            }
            res.status(204).send(); // Sem conteúdo
        } catch (err) {
            res.status(500).json({error: 'Erro ao deletar filme', detail: err.message});
        }
    },

    // GET /filmes/sugestoes/busca?q=nome
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