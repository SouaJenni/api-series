const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');

// CRUD de filmes comentados pelo usuário
router.get('/', ()=>{
    console.log('getGetchado');
}); // Listar todos os filmes
// router.get('/:id', filmeController.getFilmePorId); // Buscar filme por ID
// router.post('/', filmeController.criarFilme); // Criar novo comentário de filme
// router.put('/:id', filmeController.atualizarFilme); // Atualizar comentário
// router.delete('/:id', filmeController.deletarFilme); // Remover comentário
//
// // Autocomplete de sugestões (busca externa, ex: OMDb ou TMDb)
// router.get('/sugestoes/busca', filmeController.buscarSugestoes); // Ex: ?q=batman

module.exports = router;