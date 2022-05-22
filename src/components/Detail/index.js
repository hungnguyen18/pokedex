import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Detail.module.scss';
import apiConfig from '../../api/apiConfig';
import pokedexApi from '../../api/pokedexApi';

const cx = classNames.bind(styles);

export default function Detail({ id }) {
    const [Detail, setDetail] = useState({});

    useEffect(() => {
        const getDetait = async () => {
            try {
                const response = await pokedexApi.getDetailPokemon(id);

                if (id.length === 0) {
                    setDetail({});
                } else {
                    setDetail(response);
                }
            } catch {
                console.log('error');
            }
        };
        getDetait();
    }, [id]);

    console.log();

    return (
        <div className={cx('detail')}>
            {JSON.stringify(Detail) === '{}' ? (
                <>
                    <img
                        className={cx('detail-img')}
                        src='https://js-pokedex-virid.vercel.app/src/no-pokemon-selected-image.png'
                        alt='Img detail'></img>

                    <span className={cx('detail-text')}>
                        Select a Pokemon to display here.
                    </span>
                </>
            ) : (
                <>
                    <img
                        className={cx('detail-img')}
                        src={apiConfig.originalGif(Detail.id)}
                        alt='Img detail'></img>
                </>
            )}
        </div>
    );
}
