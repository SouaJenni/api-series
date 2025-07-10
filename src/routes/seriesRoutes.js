const express = require('express');
const router = express.Router();

const seriesController = require('../controllers/seriesController');

router.get('/sugestoes/busca', seriesController.buscarSugestoes);

router.get('/', seriesController.listarSeries);
router.get('/:id', seriesController.buscarSeriePorId);
router.post('/', seriesController.salvarSerie);
router.put('/:id', seriesController.atualizarSerie);
router.delete('/:id', seriesController.deletarSerie);

module.exports = router;