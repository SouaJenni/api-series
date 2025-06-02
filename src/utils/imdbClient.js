const axios = require('axios');

const API_KEY = 'sua_chave_aqui';
const BASE_URL = 'http://www.omdbapi.com/';

const imdbClient = {
    async searchSeriesByTitle(title) {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    apikey: API_KEY,
                    s: title,
                    type: 'series'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar série:', error.message);
            throw error;
        }
    },

    async getSeriesById(imdbID) {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    apikey: API_KEY,
                    i: imdbID,
                    plot: 'full'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes da série:', error.message);
            throw error;
        }
    }
};

module.exports = imdbClient;