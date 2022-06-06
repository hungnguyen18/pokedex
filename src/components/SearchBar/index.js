import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

export default function SearchBar({ resSearch, callBackChildren }) {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const results = resSearch.filter(
            (item) =>
                item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                -1
        );

        callBackChildren(results, !!searchValue);
    }, [searchValue]);

    return (
        <div className={cx('wrapper')}>
            <input
                value={searchValue}
                className={cx('search-input')}
                placeholder='Search your Pokemon'
                onChange={(e) => setSearchValue(e.target.value)}></input>
            <button className={cx('search-btn')}>
                <SearchOutlined />
            </button>
        </div>
    );
}
