const API_KEY = 'sua_chave_aqui';
const BASE_URL = 'http://www.omdbapi.com/';

const imdbClient = {
    async buscarSugestoes(query) {
        try {
            const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}&type=series`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.Search) return [];

            return data.Search.map(serie => ({
                title: serie.Title,
                year: serie.Year,
                imdbID: serie.imdbID,
                cover: serie.Poster
            }));
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
