import classNames from 'classnames/bind';
import { Col } from 'antd';

import styles from './Card.module.scss';
import apiConfig from '../../api/apiConfig';
import Tag from '../Tag';

const cx = classNames.bind(styles);

export default function Card({ data, id, onClick }) {
    const imgPokemon = apiConfig.originalImg(id);

    return (
        <Col xl={6} md={8} xs={12}>
            <div className={cx('card')} onClick={onClick}>
                <img
                    className={cx('card-img')}
                    src={imgPokemon}
                    alt={data.name}></img>

                <p>N° {id}</p>

                <h3>{data.name}</h3>

                <div className={cx('card-tag')}>
                    <Tag id={id} />
                </div>
            </div>
        </Col>
    );
}
