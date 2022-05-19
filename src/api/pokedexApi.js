import axiosClient from './axiosClient';

const pokedexApi = {
    getPokedex: (offset, limit) => {
        const url = `/?offset=${offset}&limit=${limit}`;
        return axiosClient.get(url);
    },
    getDetailPokemon: (id) => {
        const url = `/${id}`;
        return axiosClient.get(url);
    },
};

export default pokedexApi;
