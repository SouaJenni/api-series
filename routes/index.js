const express = require('express');
const router = express.Router();

const filmeRoutes = require('./seriesRoutes');

// Todas as rotas da aplicação
router.use('/series', seriesRoutes);

// Rota padrão para teste
router.get('/', (req, res) => {
    res.send('API de Filmes ativa 🎬');
});

module.exports = router;