import { Row, Col, Button, Affix } from 'antd';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './App.scss';
import pokedexApi from './api/pokedexApi';
import Card from './components/Card';
import Detail from './components/Detail';
import DetailMobile from './components/DetailMobile';
import SearchBar from './components/SearchBar';
import { CloseOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function App() {
    const [listPokedex, setListPokedex] = useState([]);
    const [limit, setLimit] = useState(50);
    const [limitDefault, setLimitDefault] = useState(50);
    const [isDisabled, setIsDisabled] = useState(false);
    const [detailPokedex, setDetailPokedex] = useState([]);
    const [modalVisible, setModalVisible] = useState('none');

    useEffect(() => {
        const getPokedex = async () => {
            try {
                if (limit >= 800) {
                    setLimitDefault(898 - limit);
                }

                const response = await pokedexApi.getPokedex(0, limit);

                setListPokedex(response.results);
            } catch {
                console.log('error');
            }
        };
        getPokedex();
    }, [limit]);

    const handleSetLimit = () => {
        if (limit >= 800) {
            setIsDisabled(true);
        }
        setLimit((prev) => prev + limitDefault);
    };

    const handleSetDetail = (id) => {
        setDetailPokedex(id);

        const isVisible = modalVisible === 'none' ? 'block' : 'none';
        setModalVisible(isVisible);
    };

    return (
        <div className='App'>
            <div className={cx('app-wrapper')}>
                <Row>
                    <Col xl={14} span={20} offset={2}>
                        <SearchBar />
                    </Col>
                </Row>
                <Row className={cx('app-content')} justify='center'>
                    <Col xl={14} md={14} xs={20}>
                        <Row gutter={[20, 55]}>
                            {listPokedex.map((data, i) => {
                                const id = i + 1;
                                return (
                                    <Card
                                        onClick={() => handleSetDetail(id)}
                                        key={id}
                                        data={data}
                                        id={id}
                                    />
                                );
                            })}
                        </Row>

                        <Row justify='center'>
                            <Button
                                type='primary'
                                danger
                                size='large'
                                onClick={handleSetLimit}
                                style={{ margin: '80px', borderRadius: '10px' }}
                                disabled={isDisabled}>
                                Load more
                            </Button>
                        </Row>
                    </Col>

                    <Col xl={6} md={6} span={0}>
                        <Detail id={detailPokedex} />
                    </Col>

                    <Col xl={0} md={0} xs={24} span={0}>
                        <div style={{ display: modalVisible }}>
                            <Affix offsetBottom={0}>
                                <div className={cx('detail-mobile')}>
                                    <div className={cx('detail-action')}>
                                        <Button
                                            type='primary'
                                            danger
                                            className={cx('detail-btn')}
                                            onClick={() => {
                                                setModalVisible('none');
                                            }}>
                                            <CloseOutlined />
                                        </Button>
                                    </div>

                                    <div className={cx('detail-content')}>
                                        <DetailMobile id={detailPokedex} />
                                    </div>
                                </div>
                            </Affix>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default App;
