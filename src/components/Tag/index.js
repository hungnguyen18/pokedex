import React from 'react';
import classNames from 'classnames/bind';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

export default function Tag({ children, className, stats, statName }) {
    switch (statName) {
        case 'hp':
            statName = 'HP';
            break;
        case 'attack':
            statName = 'ATK';
            break;
        case 'defense':
            statName = 'DEF';
            break;
        case 'special-attack':
            statName = 'SpA';
            break;
        case 'special-defense':
            statName = 'SpA';
            break;
        case 'speed':
            statName = 'SPD';
            break;
        default:
            statName = null;
    }

    return (
        <>
            {stats ? (
                <div className={cx('tag-stats')}>
                    <span className={cx(statName)}>{statName}</span>
                    <p>{children.base_stat}</p>
                </div>
            ) : (
                <span className={cx('tag-span', className)}>{children}</span>
            )}
        </>
    );
}
