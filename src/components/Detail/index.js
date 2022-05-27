import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Detail.module.scss';
import apiConfig from '../../api/apiConfig';
import pokedexApi from '../../api/pokedexApi';
import Tag from '../Tag';
import { Affix } from 'antd';

const cx = classNames.bind(styles);

export default function Detail({ id }) {
    const [detail, setDetail] = useState({});
    const [entries, setEntries] = useState({});
    const [chainEvolution, setChainEvolution] = useState({});

    //Image and gif
    const gif = apiConfig.originalGif;
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
        <Affix offsetTop={150}>
            <div className={cx('detail')}>
                {JSON.stringify(detail) === '{}' ? (
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
                            className={cx('detail-gif')}
                            src={gif(detail.id) || img(detail.id)}></img>

                        <p className={cx('detail-id')}>N° {detail.id}</p>

                        <h2 className={cx('detail-name', 'detail__mt')}>
                            {detail.name}
                        </h2>

                        <div className={cx('detail-tag', 'detail__mt')}>
                            {types.map((item, i) => (
                                <Tag key={i} className={item.type.name}>
                                    {item.type.name}
                                </Tag>
                            ))}
                        </div>

                        <div className={cx('detail-entry', 'detail__mt')}>
                            <h3>Pokedex Entry</h3>
                            <span>
                                {entriesPokemon.map((entry) =>
                                    entry.flavor_text.toString()
                                )}
                            </span>
                        </div>

                        <div className={cx('detail-info', 'detail__mt')}>
                            <div>
                                <h3>Height</h3>
                                <div className={cx('detail-properties')}>
                                    {detail.height}
                                </div>
                            </div>
                            <div>
                                <h3>Weight</h3>
                                <div className={cx('detail-properties')}>
                                    {detail.weight}
                                </div>
                            </div>
                        </div>

                        <div className={cx('detail-abilities', 'detail__mt')}>
                            <h3>Abilities</h3>
                            <div className={cx('detail-info')}>
                                {abilities.map((item, i) => (
                                    <div key={i}>
                                        <div
                                            className={cx('detail-properties')}>
                                            {item.ability.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('detail-stats', 'detail__mt')}>
                            <h3>Stats</h3>
                            <div className={cx('stats')}>
                                {stats.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <Tag
                                                stats
                                                statName={item.stat.name}>
                                                {item}
                                            </Tag>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={cx('detail-evolution', 'detail__mt')}>
                            <h3>Evolution</h3>
                            <div className={cx('detail-chain')}>
                                {idChainImg1 > 0 && (
                                    <img src={img(idChainImg1)} />
                                )}

                                <div>
                                    {chainEvolution.evolves_to.map((item) => {
                                        return item.evolution_details
                                            .slice(0, 1)
                                            .map((item, i) => (
                                                <div
                                                    key={i}
                                                    className={cx(
                                                        'detail-properties'
                                                    )}>
                                                    {item.min_level || '?'}
                                                </div>
                                            ));
                                    })}
                                </div>

                                {idChainImg2 > 0 && (
                                    <img src={img(idChainImg2)} />
                                )}

                                <div>
                                    {chainEvolution.evolves_to.map((item) =>
                                        item.evolves_to.map((item) =>
                                            item.evolution_details
                                                .slice(0, 1)
                                                .map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className={cx(
                                                            'detail-properties'
                                                        )}>
                                                        {item.min_level || '?'}
                                                    </div>
                                                ))
                                        )
                                    )}
                                </div>

                                {idChainImg3 > 0 && (
                                    <img src={img(idChainImg3)} />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Affix>
    );
}
