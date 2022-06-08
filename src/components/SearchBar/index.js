import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

export default function SearchBar({ resSearch, callBackChildren }) {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        const results = resSearch.filter(
            (item) =>
                item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                -1
        );

        callBackChildren(results, !!searchValue);
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');

        inputRef.current.focus();
    };

    return (
        <div className={cx('wrapper')}>
            <input
                ref={inputRef}
                value={searchValue}
                className={cx('search-input')}
                placeholder="Search your Pokemon"
                onChange={(e) => setSearchValue(e.target.value)}
            ></input>

            {!!searchValue && (
                <span className={cx('search-clear')}>
                    <CloseCircleOutlined onClick={handleClear} />
                </span>
            )}

            <button className={cx('search-btn')}>
                <SearchOutlined />
            </button>
        </div>
    );
}
