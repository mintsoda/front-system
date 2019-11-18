import React, { Component } from 'react';
import { Table, Divider,Button,Input } from 'antd';
import './bugList.less';
const { Search } = Input;

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="./bugDetail">{text}</a>,
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '分类',
        dataIndex: 'kind',
        key: 'kind',
    },
    {
        title: '解决方法',
        dataIndex: 'resolution',
        key: 'resolution',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
        <a>编辑</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
        ),
    },
];

const data = [
    {
        key: '1',
        title: 'css兼容性问题',
        description:'这是一个比较难解决的问题',
        kind: 'css',
        resolution: 'New York No. 1 Lake Park'
    },
    {
        key: '2',
        title: '小程序兼容性问题',
        description:'这是一个比较难解决的问题',
        kind: 'css',
        resolution: 'New York No. 1 Lake Park'
    },
    {
        key: '3',
        title: 'js兼容性问题',
        description:'这是一个比较难解决的问题',
        kind: 'css',
        resolution: 'New York No. 1 Lake Park'
    }
    ];
class bugList extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 400 }} enterButton
                    />
                    <div className="button">
                        <Button type="primary">提问题</Button>
                        <Button>发布问题</Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default bugList;