import axiosClient from './axiosClient';

const pokedexApi = {
    getPokedex: () => {
        const url = '/?limit=1126';
        return axiosClient.get(url);
    },
    getDetailPokemon: (pokemonName) => {
        return axiosClient.get(pokemonName);
    },
};

export default pokedexApi;
