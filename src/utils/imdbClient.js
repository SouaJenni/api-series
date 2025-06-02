const axios = require('axios');

const API_KEY = process.env.KEY;
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
            const data = response.data;

            return {
                title: data.Title,
                plot: data.Plot,
                rating: data.imdbRating,
                poster: data.Poster
            };
        } catch (error) {
            console.error('Erro ao buscar detalhes da série:', error.message);
            throw error;
        }
    }
};

module.exports = imdbClient;