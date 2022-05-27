import { Row, Col, Button } from 'antd';
import { useState, useEffect } from 'react';

import pokedexApi from './api/pokedexApi';
import Card from './components/Card';
import Detail from './components/Detail';
import SearchBar from './components/SearchBar';

function App() {
    const [listPokedex, setListPokedex] = useState([]);
    const [limit, setLimit] = useState(50);
    const [limitDefault, setLimitDefault] = useState(50);
    const [isDisabled, setIsDisabled] = useState(false);
    const [detailPokedex, setDetailPokedex] = useState([]);

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

    return (
        <div className='App' style={{ background: '#f6f8fc' }}>
            <Row>
                <Col xl={14} span={20} offset={2}>
                    <SearchBar />
                </Col>
            </Row>
            <Row justify='center' style={{ marginTop: '80px' }}>
                <Col xl={14} md={14} xs={20}>
                    <Row gutter={[20, 55]}>
                        {listPokedex.map((data, i) => {
                            const id = i + 1;
                            return (
                                <Card
                                    onClick={() => setDetailPokedex(id)}
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
            </Row>
        </div>
    );
}

export default App;
