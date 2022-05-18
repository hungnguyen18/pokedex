const apiConfig = {
    baseUrl: 'https://pokeapi.co/api/v2/pokemon',
    originalImg: (originalImg) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${originalImg}.png`,
    originalGif: (gifPath) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${gifPath}.gif`,
};

export default apiConfig;
