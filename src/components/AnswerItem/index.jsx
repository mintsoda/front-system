import React from 'react';
import { Divider,Button,Radio } from 'antd';

class AnswerItem extends React.Component {
    state = {
        openKeys: [],
        selectedKeys: []
    }
    render() {
        return (<div className="answer-item">
            这个一个答案
            <Divider />
        </div>)
    }
}
export default AnswerItem;
