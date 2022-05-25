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

    //Bug
    const gif = apiConfig.originalGif(detail.id);
    const img = apiConfig.originalImg(detail.id);

    const entriesPokemon = id.length === 0 ? null : entries;
    const abilities = detail.abilities;
    const types = detail.types;
    const stats = detail.stats;

    useEffect(() => {
        const getDetait = async () => {
            try {
                const resDetail = await pokedexApi.getDetailPokemon(id);
                const resEntries = await pokedexApi.getEntriesPokemon(id);

                if (id.length === 0) {
                    setDetail({});
                    setEntries({});
                } else {
                    setDetail(resDetail);
                    setEntries(resEntries.flavor_text_entries.slice(0, 1));
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
                            src={gif || img}></img>

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
                            <div>
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
                    </>
                )}
            </div>
        </Affix>
    );
}
