import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Affix } from 'antd';

import styles from './DetailPC.module.scss';
import pokedexApi from '../../../api/pokedexApi';

import DetailContent from '../DetailContent';

const cx = classNames.bind(styles);

export default function DetailPC({ id, slideIn }) {
    // const [idDetail, setIdDetail] = useState(id);
    const [detail, setDetail] = useState({});
    const [entries, setEntries] = useState({});
    const [chainEvolution, setChainEvolution] = useState({});

    //Call api
    useEffect(() => {
        const getDetait = async () => {
            try {
                // if (id) {
                //     setIdDetail(id);
                // }

                const resDetail = await pokedexApi.getDetailPokemon(id);
                const resEntries = await pokedexApi.getEntriesPokemon(id);

                //Set response
                if (id.length === 0) {
                    setDetail({});
                    setEntries({});
                    setChainEvolution({});
                } else {
                    //Call url evolution pokemon
                    const resEvolutionChain = await fetch(
                        resEntries.evolution_chain.url
                    );
                    const resChain = await resEvolutionChain.json();

                    setDetail(resDetail);
                    setEntries(resEntries.flavor_text_entries);
                    setChainEvolution(resChain.chain);
                }
            } catch {
                console.log('error');
            }
        };
        getDetait();
    }, [id]);

    // const handleSetId = (idChainImg1) => {
    //     setIdDetail(idChainImg1);
    // };

    return (
        <Affix offsetTop={150}>
            <div className={cx('detail', slideIn)}>
                {JSON.stringify(detail) === '{}' ? (
                    <>
                        <img
                            className={cx('detail-img')}
                            src="https://js-pokedex-virid.vercel.app/src/no-pokemon-selected-image.png"
                            alt="Img detail"
                        ></img>

                        <span className={cx('detail-text')}>
                            Select a Pokemon to display here.
                        </span>
                    </>
                ) : (
                    <DetailContent
                        id={id}
                        detail={detail}
                        entries={entries}
                        chainEvolution={chainEvolution}
                    />
                )}
            </div>
        </Affix>
    );
}
