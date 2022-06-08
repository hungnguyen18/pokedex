import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './DetailMobile.module.scss';
import pokedexApi from '../../../api/pokedexApi';
import DetailContent from '../DetailContent';

const cx = classNames.bind(styles);

export default function DetailMobile({ id }) {
    // const [idDetail, setIdDetail] = useState(id);
    const [detail, setDetail] = useState({});
    const [entries, setEntries] = useState({});
    const [chainEvolution, setChainEvolution] = useState({});

    const typeOverlay =
        id > 0
            ? detail.types
                  ?.slice(0, 1)
                  .map((item) => item.type.name)
                  .toString()
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
                    setEntries(resEntries.flavor_text_entries);
                    setChainEvolution(resChain.chain);
                }
            } catch {
                console.log('error');
            }
        };
        getDetait();
    }, [id]);

    return (
        <div className={cx('detail-overlay', typeOverlay)}>
            <div className={cx('detail-content')}>
                {JSON.stringify(detail) !== '{}' && (
                    <DetailContent
                        id={id}
                        detail={detail}
                        entries={entries}
                        chainEvolution={chainEvolution}
                    />
                )}
            </div>
        </div>
    );
}
