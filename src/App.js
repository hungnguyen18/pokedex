import { useState, useEffect, createContext } from 'react';
import { Row, Col, Button, Affix, BackTop } from 'antd';
import classNames from 'classnames/bind';

import styles from './App.scss';
import pokedexApi from './api/pokedexApi';
import Card from './components/Card';
import DetailPC from './components/Detail/DetailPC';
import DetailMobile from './components/Detail/DetailMobile';
import SearchBar from './components/SearchBar';
import { ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export const IdContext = createContext();

function App() {
    //List Pokemon
    const [listPokedex, setListPokedex] = useState([]);

    //Set limit render
    const [limit, setLimit] = useState(50);
    const [limitDefault, setLimitDefault] = useState(50);

    //Set detail pokemon
    const [detailPokedex, setDetailPokedex] = useState([]);

    //Set modal datail
    const [modalVisible, setModalVisible] = useState('none');

    //Set disabled button load more
    const [isDisabled, setIsDisabled] = useState(false);

    //Animation
    const [aniDetail, setAniDetail] = useState('');

    //Search
    const [resSearch, setResSearch] = useState([]);
    const [listSearch, setListSearch] = useState([]);
    const [isInputSearch, setIsInputSearch] = useState(false);

    //Call api
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
    const funcCallbackSearch = (listSearchPokedex, callBackInput) => {
        setTimeout(() => {
            setListSearch(listSearchPokedex);

            setIsInputSearch(callBackInput);
        }, 0);
    };

    //Send data DetailContent component to App component
    const funcCallbackId = (idEvolution) => {
        setTimeout(() => {
            setAniDetail('slideIn');

            setDetailPokedex(idEvolution);
        }, 0);
    };

    return (
        <IdContext.Provider value={funcCallbackId}>
            <div className="App">
                <div className={cx('app-wrapper')}>
                    <Row>
                        <Col xl={14} span={20} offset={2}>
                            <SearchBar
                                resSearch={resSearch}
                                callBackChildren={funcCallbackSearch}
                            />
                        </Col>
                    </Row>
                    <Row className={cx('app-content')} justify="center">
                        <Col xl={14} md={10} xs={20}>
                            {isInputSearch ? (
                                <Row gutter={[20, 55]}>
                                    {listSearch.map((data, i) => {
                                        const id = data.url
                                            .slice(34)
                                            .replace('/', '');

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

                            <Row justify="center">
                                {!isInputSearch && (
                                    <Button
                                        type="primary"
                                        danger
                                        size="large"
                                        onClick={handleSetLimit}
                                        style={{
                                            margin: '80px',
                                            borderRadius: '10px',
                                        }}
                                        disabled={isDisabled}
                                    >
                                        Load more
                                    </Button>
                                )}
                            </Row>
                        </Col>

                        <Col xl={6} md={10} span={0}>
                            <div onAnimationEnd={() => setAniDetail('')}>
                                <DetailPC
                                    slideIn={aniDetail}
                                    id={detailPokedex}
                                />
                            </div>
                        </Col>

                        <Col xl={0} md={0} xs={24} span={0}>
                            <div
                                style={{
                                    display: modalVisible,
                                    marginTop: '500px',
                                }}
                            >
                                <Affix offsetBottom={0}>
                                    <div className={cx('detail-mobile')}>
                                        <div className={cx('detail-action')}>
                                            <Button
                                                type="primary"
                                                danger
                                                className={cx('detail-btn')}
                                                onClick={() => {
                                                    setModalVisible('none');
                                                }}
                                            >
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
                <BackTop className={cx('back-top')}>
                    <Button className={cx('btn-top')} danger title="Go to top">
                        <ArrowUpOutlined />
                    </Button>
                </BackTop>
            </div>
        </IdContext.Provider>
    );
}

export default App;
