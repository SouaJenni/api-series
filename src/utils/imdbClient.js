const _ = require('lodash');

const API_KEY = process.env.TMDB_KEY;

const BASE_URL_FILMES = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1';
const BASE_URL_SERIES = 'https://api.themoviedb.org/3/search/tv?include_adult=false&page=1';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

function normalizarNota(nota) {
    if (!nota || nota === -1) return 0;
    return (nota - 1) * (4 / 9) + 1;
}

const imdbClient = {
    async buscarSugestoes(query) {
        try {
            const params = {
                headers: {
                    Authorization: API_KEY
                }
            };
            const urlFilmes = `${BASE_URL_FILMES}&query=${encodeURIComponent(query)}`;
            const responseFilmes = await fetch(urlFilmes, params);
            const dataFilmes = await responseFilmes.json();

            const urlSeries = `${BASE_URL_SERIES}&query=${encodeURIComponent(query)}`;
            const responseSeries = await fetch(urlSeries, params);
            const dataSeries = await responseSeries.json();

            if (!dataFilmes.results && !dataSeries.results) return [];

            const nomeFilmes = _.map(dataFilmes.results, filme => ({
                titulo: filme.title,
                popularidade: filme.popularity,
                ano: new Date(filme.release_date).getFullYear(),
                tipo: 'filme',
                notaImdb: normalizarNota(filme.vote_average),
                capa: `${IMAGE_URL}${filme.poster_path}`,
                idImdb: filme.id.toString()
            }));
            const nomeSeries = _.map(dataSeries.results, serie => ({
                titulo: serie.name,
                popularidade: serie.popularity,
                ano: new Date(serie.first_air_date).getFullYear(),
                tipo: 'serie',
                notaImdb: normalizarNota(serie.vote_average),
                capa: `${IMAGE_URL}${serie.poster_path}`,
                idImdb: serie.id.toString()
            }));

            return _.sortBy([...nomeFilmes, ...nomeSeries], 'popularidade').reverse().slice(0, 6);
        } catch (error) {
            console.error('Erro ao buscar série:', error.message);
            throw error;
        }
    },

};

module.exports = imdbClient;
