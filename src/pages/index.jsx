import React, {Component} from 'react';
import Background from '../components/Background'
import {Button} from 'antd';
import {
  Link
} from "react-router-dom";
import '../style/index.less'

const ButtonGroup = Button.Group;

class Index extends Component {
  bugClick = () => {
    this.props.history.push('/pages/bugList')
  }

  render() {
    return (
      <div className="container">
        <div className="user">
          <ButtonGroup>
            <Link to="/register"><Button>注册</Button></Link>
            <Link to="/login"><Button>登录</Button></Link>
          </ButtonGroup>
        </div>
        <div className="index-content">
          <div ref={'title'} className="title">卡车之家<span style={{paddingLeft: '30px'}}>前端工具</span>
          </div>
          <div className='tags'>
            <Button onClick={this.bugClick}>bug库</Button>
            <Button>灯塔系统</Button>
            <Button>组件模版</Button>
            <Button>css背景颜色属性值转换</Button>
            <Button>字符串转换</Button>
          </div>
        </div>
        <div>
          <Background/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('组件渲染', window.location.href)
    var mouseX, mouseY;
    var traX, traY;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
      traX = ((2 * mouseX) / 200) + 10;
      traY = ((2 * mouseY) / 200) + 30;
      if (this.refs.title) {
        this.refs.title.style.backgroundPosition = traX + "%" + traY + "%"
      }
    })
  }
}

export default Index;
