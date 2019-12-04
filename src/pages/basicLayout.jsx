import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import {Layout, Icon} from 'antd';
// 引入组件
import '../style/basicLayout.less'
import storage from "../utils/storage";
import {withRouter} from "react-router";
import NotFound from "./notFound";

const {Header, Content} = Layout;

class BasicLayout extends React.Component {
  exitLogin = () => {
    storage.remove('token');
    this.props.history.replace('/');
  }

  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Layout>
          <Header style={{background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between'}}>
            <span style={{marginLeft: '20px'}}>{'卡车之家前端系统'}</span>
            <div className="exit" onClick={this.exitLogin}><Icon type="import"/>退出登录</div>
          </Header>
          <Content style={{margin: '16px', minWidth: 900}}>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              <Switch>
                {this.props.routes.map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                    render={props => (
                      <route.component {...props} routes={route.routes}/>
                    )}
                  />
                ))}
                <Route path="*">
                  <NotFound></NotFound>
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }

  componentDidMount() {
  }
}

export default withRouter(BasicLayout);
