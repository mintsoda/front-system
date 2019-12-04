import React, {Component} from 'react';
import '../style/notFound.less'

class NotFound extends Component {
  render() {
    return (
      <div className="container-not-found">
        <div className="not-found-left">
          <div className="pic-404">
            <img className="pic-404-parent" src={process.env.PUBLIC_URL + '/images/404.png'} alt="404"/>
            <img className="pic-404-child left" src={process.env.PUBLIC_URL + '/images/404_cloud.png'} alt="404"/>
            <img className="pic-404-child mid" src={process.env.PUBLIC_URL + '/images/404_cloud.png'} alt="404"/>
            <img className="pic-404-child right" src={process.env.PUBLIC_URL + '/images/404_cloud.png'} alt="404"/>
          </div>
          <div className="bullshit">
            <div className="bullshit-oops">OOPS!</div>
            <div className="bullshit-headline">您所访问的页面走丢啦～</div>
            <a href="/" className="bullshit-return-home">回到首页</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
