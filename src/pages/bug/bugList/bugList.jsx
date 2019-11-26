import React, { Component } from 'react';
import { Select,Table, Divider,Button,Input } from 'antd';
import './bugList.less';
import XHR from "../../../api/apis";
const { Search } = Input;
const { Option } = Select;

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="./bugDetail">{text}</a>,
    },
    {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
    },
    {
        title: '发布人',
        dataIndex: 'publisher_name',
        key: 'publisher_name',
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    }
];
class bugList extends Component {
    state = {
        // 部门列表
        departmentList: [],
        // 列表类型
        status: 0,
        // 部门
        department: 0,
        // 搜索内容
        search: '',
        // 列表数据
        data: [],
        pagination: {
            pageSize: 15,
            current: 1
        },
        loading: false,
    };
    // 状态值改变
    handleStatusChange = (value)=>{
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
            status: value
        },()=>{
            this.fetch();
        })
    }
    // 部门值改变
    handleDepChange = (value)=>{
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
            department: value
        },()=>{
            this.fetch();
        })
    }
    // 搜索值改变
    onSearch = (value)=>{
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
            search: value
        },()=>{
            this.fetch();
        })
    };
    // 表格分页改变
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        },()=>{
            this.fetch();
        });
    };
    // 获取部门
    getDepartment= ()=>{
        XHR.getDepartment({}).then((res) => {
            this.setState({
                departmentList: res.data
            })
        })
    };
    fetch = (params = {}) => {
        this.setState({ loading: true });
        XHR.getBugList({
            ...params,
            status:  this.state.status,
            department: this.state.department,
            search: this.state.search,
            pageSize: this.state.pagination.pageSize,
            page: this.state.pagination.current
        }).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.total;
            this.setState({
                loading: false,
                data: res.data.list,
                pagination,
            });
        });
    };

    // 获取列表
    // getList = ()=>{
    //     XHR.getBugList({
    //         status: this.state.status,
    //         search: this.state.search,
    //         page: this.state.page,
    //         pageSize: this.state.pageSize,
    //     }).then((res) => {
    //         console.log(res.data.list)
    //         this.setState({
    //             list: [...this.state.list,...res.data.list]
    //         })
    //     })
    // }
    render() {
        return (
            <div>
                <div className="header">
                    <div className='header-left'>
                        状态：
                        <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleStatusChange}>
                            <Option value="0">全部</Option>
                            <Option value="1">已解决</Option>
                            <Option value="2">未解决</Option>
                        </Select>
                        部门：
                        <Select defaultValue="0" placeholder={'请选择一个部门'} style={{ width: 180 }}  onChange={this.handleDepChange}>
                            <Option value="0">全部</Option>
                            {this.state.departmentList.map((department) => (
                                <Option value={department.id} key={department.id}>{department.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="header-right">
                        <Search
                            placeholder="请输入搜索关键词"
                            onSearch={this.onSearch}
                            style={{ width: 400 }} enterButton
                        />
                        <div className="button">
                            <Button type="primary">提问题</Button>
                            <Button>发布问题</Button>
                        </div>
                    </div>
                </div>
                <Table columns={columns} dataSource={this.state.data}
                       rowKey="id"
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange} />
            </div>
        );
    }
    componentDidMount () {
        this.fetch();
        this.getDepartment()
    }
}

export default bugList;
