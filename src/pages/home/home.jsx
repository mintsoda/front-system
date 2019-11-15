import React, { Component } from 'react';
import { Statistic, Row, Col } from 'antd';

const { Countdown } = Statistic;
const deadline = new Date().setFullYear(2020,1,1)

function onFinish() {
    console.log('finished!');
}
class home extends Component {
    render() {
        return (
            <Row gutter={16}>
                <Col span={24} style={{ marginTop: 10 }}>
                    <Countdown title="距离2020年还有" value={deadline} format="D 天 H 时 m 分 s 秒" />
                </Col>
            </Row>
        );
    }
}

export default home;
