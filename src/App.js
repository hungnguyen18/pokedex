import { useState, useEffect } from 'react';
import pokedexApi from './api/pokedexApi';

function App() {
    const [listPokedex, setListPokedex] = useState({});

    useEffect(() => {
        const getPokedex = async () => {
            try {
                const response = await pokedexApi.getPokedex();
                setListPokedex(response.results.slice(0, 10));
            } catch {
                console.log('error');
            }
        };
        getPokedex();
    }, []);

    console.log(listPokedex);

    return <div className='App'></div>;
}

export default App;
