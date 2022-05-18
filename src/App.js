import { Row, Col, DatePicker, Button } from 'antd';
import { useState, useEffect } from 'react';

import pokedexApi from './api/pokedexApi';
import SearchBar from './components/SearchBar';

function App() {
    const [listPokedex, setListPokedex] = useState({});

    useEffect(() => {
        const getPokedex = async () => {
            try {
                const response = await pokedexApi.getPokedex(0, 40);
                setListPokedex(response);
            } catch {
                console.log('error');
            }
        };
        getPokedex();
    }, []);

    return (
        <div className='App' style={{ background: '#f6f8fc' }}>
            <Row>
                <Col xl={14} span={20} offset={2}>
                    <SearchBar />
                </Col>
            </Row>
            <Row justify='center' gutter={14} style={{ marginTop: '80px' }}>
                <Col xl={14} md={14} xs={20}>
                    <Row gutter={[16, 16]}>
                        <Col xl={6} md={8} xs={12}>
                            <div style={{ background: 'red' }}>1</div>
                        </Col>
                        <Col xl={6} md={8} xs={12}>
                            <div style={{ background: 'red' }}>1</div>
                        </Col>
                        <Col xl={6} md={8} xs={12}>
                            <div style={{ background: 'red' }}>1</div>
                        </Col>
                        <Col xl={6} md={8} xs={12}>
                            <div style={{ background: 'red' }}>1</div>
                        </Col>
                    </Row>
                </Col>
                <Col xl={6} md={6} span={0}>
                    <div style={{ background: 'blue' }}> 6</div>
                </Col>
            </Row>
        </div>
    );
}

export default App;
