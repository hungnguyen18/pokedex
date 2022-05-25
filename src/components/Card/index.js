import classNames from 'classnames/bind';
import { Col, Skeleton } from 'antd';

import styles from './Card.module.scss';
import apiConfig from '../../api/apiConfig';
import Tag from '../Tag';
import { useState, useEffect } from 'react';
import pokedexApi from '../../api/pokedexApi';

const cx = classNames.bind(styles);

export default function Card({ data, id, onClick }) {
    const [listDetailPokedex, setListDetailPokedex] = useState([]);
    const [showSkeleton, setShowSkeleton] = useState(true);

    const types = listDetailPokedex.types;

    const imgPokemon = apiConfig.originalImg(id);

    useEffect(() => {
        const getListDetaitPokedex = async () => {
            try {
                const response = await pokedexApi.getDetailPokemon(id);

                setListDetailPokedex(response);
                setShowSkeleton(false);
            } catch {
                setShowSkeleton(true);
                console.log('error');
            }
        };
        getListDetaitPokedex();
    }, [id]);

    return (
        <Col xl={6} md={8} xs={12}>
            <Skeleton active loading={showSkeleton}>
                <div className={cx('card')} onClick={onClick}>
                    <img
                        className={cx('card-img')}
                        src={imgPokemon}
                        alt={data.name}></img>

                    <p>N° {id}</p>

                    <h3>{data.name}</h3>

                    <div className={cx('card-tag')}>
                        {types?.map((type, i) => (
                            <Tag key={i} className={type.type.name}>
                                {type.type.name}
                            </Tag>
                        ))}
                    </div>
                </div>
            </Skeleton>
        </Col>
    );
}
