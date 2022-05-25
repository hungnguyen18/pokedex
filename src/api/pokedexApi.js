import axiosClient from './axiosClient';

const pokedexApi = {
    getPokedex: (offset, limit) => {
        const url = `/pokemon/?offset=${offset}&limit=${limit}`;
        return axiosClient.get(url);
    },
    getDetailPokemon: (id) => {
        const url = `/pokemon/${id}`;
        return axiosClient.get(url);
    },
    getEntriesPokemon: (id) => {
        const url = `/pokemon-species/${id}`;
        return axiosClient.get(url);
    },
};

export default pokedexApi;
