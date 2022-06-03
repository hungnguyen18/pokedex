import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './DetailMobile.module.scss';
import apiConfig from '../../../api/apiConfig';
import pokedexApi from '../../../api/pokedexApi';
import DetailContent from '../DetailContent';

const cx = classNames.bind(styles);

export default function DetailMobile({ id }) {
    // const [idDetail, setIdDetail] = useState(id);
    const [detail, setDetail] = useState({});
    const [entries, setEntries] = useState({});
    const [chainEvolution, setChainEvolution] = useState({});

    //Image and gif
    const gif = id >= 650 ? apiConfig.originalImg : apiConfig.originalGif;
    const img = apiConfig.originalImg;

    // Set info pokemon
    const entriesPokemon = id > 0 ? entries : null;
    const abilities = id > 0 ? detail.abilities?.slice(0, 2) : null;
    const types = detail.types;
    const stats = detail.stats;

    //Set id img evolution chain
    const idChainImg1 =
        id > 0
            ? chainEvolution.species?.url?.slice(42)?.replace('/', '')
            : null;
    const idChainImg2 =
        id > 0
            ? chainEvolution.evolves_to?.map((item) =>
                  item.species?.url?.slice(42)?.toString().replace('/', '')
              )
            : null;
    const idChainImg3 =
        id > 0
            ? chainEvolution.evolves_to?.map((item) =>
                  item.evolves_to
                      ?.map((item) => item.species?.url?.slice(42))
                      ?.toString()
                      .replace('/', '')
              )
            : null;

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
                    setEntries(resEntries.flavor_text_entries.slice(0, 1));
                    setChainEvolution(resChain.chain);
                }
            } catch {
                console.log('error');
            }
        };
        getDetait();
    }, [id]);

    return (
        <div className={cx('detail-overlay')}>
            <div className={cx('detail-content')}>
                {JSON.stringify(detail) !== '{}' && (
                    <DetailContent
                        gif={gif}
                        img={img}
                        detail={detail}
                        types={types}
                        entriesPokemon={entriesPokemon}
                        abilities={abilities}
                        stats={stats}
                        chainEvolution={chainEvolution}
                        idChainImg1={idChainImg1}
                        idChainImg2={idChainImg2}
                        idChainImg3={idChainImg3}
                    />
                )}
            </div>
        </div>
    );
}
