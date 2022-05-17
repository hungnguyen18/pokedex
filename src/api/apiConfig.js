const apiConfig = {
    baseUrl: 'https://pokeapi.co/api/v2/pokemon',
    originalGif: (gifPath) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${gifPath}.gif`,
};

export default apiConfig;
