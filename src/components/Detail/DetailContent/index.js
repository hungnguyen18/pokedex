import React, { useCallback, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './DetailContent.module.scss';
import Tag from '../../Tag';
import apiConfig from '../../../api/apiConfig';
import { IdContext } from '../../../App';
import Evolution from '../../Evolution';

const cx = classNames.bind(styles);

export default function DetailContent({ id, detail, entries, chainEvolution }) {
    //Image and gif
    const gif = id >= 650 ? apiConfig.originalImg : apiConfig.originalGif;
    const img = apiConfig.originalImg;

    // Set info pokemon
    const entriesPokemon = id > 0 ? entries : null;

    const entry = entriesPokemon
        .filter((item) => item.language.name.toLowerCase().indexOf('en') !== -1)
        .slice(10, 11);

    const height =
        detail.height.toString().replace(/\B(?=(?!\d{2})+(\d))/g, ',') + 'm';

    const weight =
        detail.weight.toString().replace(/\B(?=(?!\d{2})+(\d))/g, ',') + 'kg';

    const abilities = id > 0 ? detail.abilities?.slice(0, 2) : null;
    const types = detail.types;
    const stats = detail.stats;

    //Function callback
    const funcCallbackId = useContext(IdContext);

    const handleSetIdDetail = useCallback(
        (idChainImg) => {
            funcCallbackId(idChainImg);
        },
        [funcCallbackId]
    );

    return (
        <>
            <img
                className={cx('detail-gif')}
                src={gif(detail.id)}
                alt={detail.name}
            ></img>

            <div className={cx('detail-wrapper')}>
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
                    <span>{entry.map((item) => item.flavor_text)}</span>
                </div>

                <div className={cx('detail-info', 'detail__mt')}>
                    <div>
                        <h3>Height</h3>
                        <div className={cx('detail-properties')}>{height}</div>
                    </div>
                    <div>
                        <h3>Weight</h3>
                        <div className={cx('detail-properties')}>{weight}</div>
                    </div>
                </div>

                <div className={cx('detail-abilities', 'detail__mt')}>
                    <h3>Abilities</h3>
                    <div className={cx('detail-info')}>
                        {abilities.map((item, i) => (
                            <div key={i}>
                                <div className={cx('detail-properties')}>
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
                                    <Tag stats statName={item.stat.name}>
                                        {item}
                                    </Tag>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={cx('detail-evolution', 'detail__mt')}>
                    <Evolution
                        id={id}
                        onSetDetail={handleSetIdDetail}
                        chainEvolution={chainEvolution}
                        img={img}
                    />
                </div>
            </div>
        </>
    );
}
