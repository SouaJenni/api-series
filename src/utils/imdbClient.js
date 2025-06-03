const _ = require("lodash");
const API_KEY = process.env.TMDB_KEY;
const BASE_URL_FILMES = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1';
const BASE_URL_SERIES = 'https://api.themoviedb.org/3/search/tv?include_adult=false&page=1';

const imdbClient = {
    async buscarSugestoes(query) {
        try {
            const params = {
                headers: {
                    Authorization: API_KEY
                }
            }
            const urlFilmes = `${BASE_URL_FILMES}&query=${encodeURIComponent(query)}`;
            const responseFilmes = await fetch(urlFilmes, params);
            const dataFilmes = await responseFilmes.json();

            const urlSeries = `${BASE_URL_SERIES}&query=${encodeURIComponent(query)}`;
            const responseSeries = await fetch(urlSeries, params);
            const dataSeries = await responseSeries.json();

            if (!dataFilmes.results && !dataSeries.results) return [];

            const nomeFilmes = _.map(dataFilmes.results, filme => (filme.title));
            const nomeSeries = _.map(dataSeries.results, serie => (serie.name));

            return [...nomeFilmes, ...nomeSeries].sort();
        } catch (error) {
            console.error('Erro ao buscar série:', error.message);
            throw error;
        }
    },

    async getSeriesById(imdbID) {
        try {
            const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
            const response = await fetch(url);
            const data = await response.json();

            return {
                title: data.Title,
                summary: data.Plot,
                cover: data.Poster
            };
        } catch (error) {
            console.error('Erro ao buscar detalhes da série:', error.message);
            throw error;
        }
    }
};

module.exports = imdbClient;
