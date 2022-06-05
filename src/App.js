import { Row, Col, Button, Affix } from 'antd';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './App.scss';
import pokedexApi from './api/pokedexApi';
import Card from './components/Card';
import DetailPC from './components/Detail/DetailPC';
import DetailMobile from './components/Detail/DetailMobile';
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

    //Animation
    const [aniDetail, setAniDetail] = useState('');

    //Search
    const [resSearch, setResSearch] = useState([]);
    const [listSearch, setListSearch] = useState([]);
    const [isInputSearch, setIsInputSearch] = useState(false);

    useEffect(() => {
        const getPokedex = async () => {
            try {
                if (limit >= 800) {
                    setLimitDefault(898 - limit);
                }

                const response = await pokedexApi.getPokedex(0, limit);
                const resSearch = await pokedexApi.getPokedex(0, 898);

                setListPokedex(response.results);
                setResSearch(resSearch.results);
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
        const isVisible = modalVisible === 'none' ? 'block' : 'none';

        setDetailPokedex(id);

        setModalVisible(isVisible);
    };

    //Send data searchBar component to App component
    const funcCallbackChildren = (listSearchPokedex, callBackInput) => {
        setTimeout(() => {
            setListSearch(listSearchPokedex);

            setIsInputSearch(callBackInput);
        }, 0);
    };

    return (
        <div className='App'>
            <div className={cx('app-wrapper')}>
                <Row>
                    <Col xl={14} span={20} offset={2}>
                        <SearchBar
                            resSearch={resSearch}
                            callBackChildren={funcCallbackChildren}
                        />
                    </Col>
                </Row>
                <Row className={cx('app-content')} justify='center'>
                    <Col xl={14} md={10} xs={20}>
                        {isInputSearch ? (
                            <Row gutter={[20, 55]}>
                                {listSearch.map((data, i) => {
                                    const id = data.url
                                        .slice(34)
                                        .replace('/', '');

                                    console.log();
                                    return (
                                        <Card
                                            onClick={() => {
                                                setAniDetail('slideIn');

                                                handleSetDetail(id);
                                            }}
                                            key={i}
                                            data={data}
                                            id={id}
                                        />
                                    );
                                })}
                            </Row>
                        ) : (
                            <Row gutter={[20, 55]}>
                                {listPokedex.map((data, i) => {
                                    const id = i + 1;
                                    return (
                                        <Card
                                            onClick={() => {
                                                setAniDetail('slideIn');

                                                handleSetDetail(id);
                                            }}
                                            key={id}
                                            data={data}
                                            id={id}
                                        />
                                    );
                                })}
                            </Row>
                        )}

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

                    <Col xl={6} md={10} span={0}>
                        <div onAnimationEnd={() => setAniDetail('')}>
                            <DetailPC slideIn={aniDetail} id={detailPokedex} />
                        </div>
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
