const express = require('express');

const seriesRoutes = require('./seriesRoutes.js');

const router = express.Router();

router.use('/series', seriesRoutes);

router.get('/', (req, res) => {
    res.send('API de Séries ativa 🎬');
});

module.exports = router;