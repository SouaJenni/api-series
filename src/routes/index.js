const express = require('express');
const router = express.Router();

const seriesRoutes = require('./seriesRoutes.js');

router.use('/series', seriesRoutes);

router.get('/', (req, res) => {
    res.send('API de Séries ativa 🎬');
});

module.exports = router;