import React, { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

function Tag({ children, className, stats, statName }) {
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
        case 'tdt':
            statName = 'TDT';
            break;
        default:
            statName = null;
    }

    return (
        <>
            {stats ? (
                <div className={cx('tag-stats')}>
                    <div className={cx('tag-stat-name', statName)}>
                        {statName}
                    </div>
                    <p>{children.base_stat}</p>
                </div>
            ) : (
                <span className={cx('tag-span', className)}>{children}</span>
            )}
        </>
    );
}

export default memo(Tag);
