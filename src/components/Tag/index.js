import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Tag.module.scss';
import pokedexApi from '../../api/pokedexApi';

const cx = classNames.bind(styles);

export default function Tag({ id }) {
    const [listDetailPokedex, setListDetailPokedex] = useState([]);
    const types = listDetailPokedex.types;

    useEffect(() => {
        const getListDetaitPokedex = async () => {
            try {
                const response = await pokedexApi.getDetailPokemon(id);

                setListDetailPokedex(response);
            } catch {
                console.log('error');
            }
        };
        getListDetaitPokedex();
    }, []);

    return (
        <>
            {types?.map((type, i) => (
                <span key={i}>{type.type.name}</span>
            ))}
        </>
    );
}
