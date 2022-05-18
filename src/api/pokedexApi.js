import axiosClient from './axiosClient';

const pokedexApi = {
    getPokedex: (offset, limit) => {
        const url = `/?offset=${offset}&limit=${limit}`;
        return axiosClient.get(url);
    },
    getDetailPokemon: (pokemonName) => {
        return axiosClient.get(pokemonName);
    },
};

export default pokedexApi;
