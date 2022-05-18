import React from 'react';
import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import { SearchOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export default function SearchBar() {
    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('search-input')}
                placeholder='Search your Pokemon'></input>
            <button className={cx('search-btn')}>
                <SearchOutlined />
            </button>
        </div>
    );
}
