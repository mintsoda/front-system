import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Layout,Icon } from 'antd';
// 引入子页面
import home from '../home/home';
import addBug from '../bug/addBug/addBug';
import bugList from '../bug/bugList/bugList';
import bugDetail from '../bug/bugDetail/bugDetail';
import other from '../other/other';
// 引入组件
import SiderMenu from "../../components/SiderMenu/index";
import './basicLayout.less';
import storage from "../../utils/storage";

const { Header, Content, Sider } = Layout;
const menus = [
    {
        title: '首页',
        icon: 'home',
        key: '/'
    },
    {
        title: 'bug列表',
        icon: 'bug',
        key: '/bug',
        subs: [
            {key: '/bug/bugList', title: '列表', icon: '',},
            {key: '/bug/addBug', title: '新增', icon: '',}
            ]
    },
    {
        title: '其他',
        icon: 'ellipsis',
        key: '/other'
    }
]

const routes = [
    {
        path: "/",
        exact: true,
        main: home
    },
    {
        path: "/bug/addBug",
        exact: true,
        main: addBug
    },
    {
        path: "/bug/bugList",
        exact: true,
        main: bugList
    },
    {
        path: "/bug/bugDetail",
        exact: true,
        main: bugDetail
    },
    {
        path: "/other",
        exact: true,
        main: other
    }
];
class BasicLayout extends React.Component{
    state = {
        collapsed: false,
        openKeys: [],
        selectedKeys: []
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    exitLogin(){
        console.log('退出登录')
        storage.remove('token');
        window.location.href = '/login'
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <SiderMenu  menus={menus}></SiderMenu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,display:'flex',justifyContent:'space-between'}}>
                        <span style={{ marginLeft: '20px'}}>{'卡车之家前端系统'}</span>
                        <div className="exit" onClick={this.exitLogin}><Icon type="import" />退出登录</div>
                    </Header>
                    <Content style={{ margin: '16px', minWidth: 900}}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default BasicLayout
