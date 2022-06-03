import React from 'react';
import classNames from 'classnames/bind';

import styles from './DetailContent.module.scss';
import Tag from '../../Tag';

const cx = classNames.bind(styles);

export default function DetailContent({
    gif,
    img,
    detail,
    types,
    entriesPokemon,
    abilities,
    stats,
    chainEvolution,
    idChainImg1,
    idChainImg2,
    idChainImg3,
}) {
    return (
        <>
            <img
                className={cx('detail-gif')}
                src={gif(detail.id) || img(detail.id)}
                alt={detail.name}></img>

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
                    <h3>Evolution</h3>
                    <div className={cx('detail-chain')}>
                        {idChainImg1 > 0 && (
                            <div>
                                <img
                                    src={img(idChainImg1)}
                                    alt='Evolution Chain'
                                />
                            </div>
                        )}

                        {chainEvolution.evolves_to.slice(0, 1).map((item) => {
                            return item.evolution_details
                                .slice(0, 1)
                                .map((item, i) => (
                                    <div
                                        key={i}
                                        className={cx('detail-properties')}>
                                        {item.min_level || '?'}
                                    </div>
                                ));
                        })}

                        {idChainImg2 > 0 && (
                            <img src={img(idChainImg2)} alt='Evolution Chain' />
                        )}

                        {chainEvolution.evolves_to.map((item) =>
                            item.evolves_to.slice(0, 1).map((item) =>
                                item.evolution_details
                                    .slice(0, 1)
                                    .map((item, i) => (
                                        <div
                                            key={i}
                                            className={cx('detail-properties')}>
                                            {item.min_level || '?'}
                                        </div>
                                    ))
                            )
                        )}

                        {idChainImg3 > 0 && (
                            <img src={img(idChainImg3)} alt='Evolution Chain' />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
