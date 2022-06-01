import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './DetailMobile.module.scss';
import { Affix, Button } from 'antd';

const cx = classNames.bind(styles);

export default function DetailMobile({ modalVisible }) {
    return (
        <div className={cx('detail-overlay')}>
            <div className={cx('detail-content')}>
                <h1>OK</h1>
            </div>
        </div>
    );
}
