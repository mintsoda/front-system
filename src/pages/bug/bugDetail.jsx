import React, {Component} from 'react';
import {List, Radio, Button, Pagination, message, Spin, Tag} from 'antd';
import ReplyContent from '../../components/ReplyContent'
import '../../style/bugDetail.less';
import XHR from "../../api/apis";

class bugDetail extends Component {
  state = {
    id: 0,
    // 详情
    detailObj: {},
    // 答案列表
    answerList: [],
    // 排序
    order: '0',
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0
    },
    // 我回答的问题
    myAnswer: '',
    answerLoading: true,
    loading: true,
  }
  renderListAction = (item) => {
    if (this.state.detailObj.is_my && !this.state.detailObj.answer_id) {
      return <Button onClick={
        this.setFinallyAnswer.bind(this, item)
      }>设为答案</Button>
    } else if (this.state.detailObj.answer_id === item.id) {
      return <Tag color="blue">最终答案</Tag>
    }
  }
  renderReplyContent = () => {
    if (!this.state.detailObj.answer_id) {
      return <div className="reply">
        <div className="title">
          <h2>编写答案</h2>
          <Button onClick={this.answerBug}>发布</Button>
        </div>
        <ReplyContent transferMsg={myAnswer => this.transferMsg(myAnswer)}></ReplyContent>
      </div>;
    }
  }
  renderPagination = () => {
    if (this.state.pagination.total) {
      return <Pagination style={{textAlign: 'right'}} current={this.state.pagination.current}
                         pageSize={this.state.pagination.pageSize} total={this.state.pagination.total}
                         onChange={this.handleListChange}/>;
    }
  }
  setFinallyAnswer = (item) => {
    XHR.setFinallyAnswer({
      bug_id: this.state.id,
      answer_id: item.id
    }).then((res) => {
      message.success('设置最终答案成功！');
      const detailObj = {...this.state.detailObj};
      detailObj.answer_id = item.id;
      this.setState({
        detailObj: detailObj
      })
    })
  }
  transferMsg = (myAnswer) => {
    this.setState({
      myAnswer
    });
  }
  handleOrderChange = (event) => {
    const pager = {...this.state.pagination};
    pager.current = 1;
    this.setState({
      pagination: pager,
      order: event.target.value
    }, () => {
      this.getAnswer()
    })
  }

  // 获取问题详情
  getDetail() {
    XHR.getBugDetail({
      id: this.state.id
    }).then((res) => {
      this.setState({
        loading: false,
        detailObj: res.data
      })
    })
    this.getAnswer()
  }

  // 获取答案列表
  getAnswer = () => {
    this.setState({answerLoading: true});
    XHR.getBugAnswers({
      order: this.state.order,
      bug_id: this.state.id,
      page: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize
    }).then((res) => {
      const pagination = {...this.state.pagination};
      pagination.total = res.data.total;
      this.setState({
        answerLoading: false,
        answerList: res.data.list,
        pagination
      })
    })
  }
  handleListChange = (pagination) => {
    const pager = {...this.state.pagination};
    pager.current = pagination;
    this.setState({
      pagination: pager,
    }, () => {
      this.getAnswer();
    });
  }
  // 回答答案
  answerBug = () => {
    XHR.setBugAnswer({
      bug_id: this.state.id,
      content: this.state.myAnswer
    }).then((res) => {
      message.success('发布答案成功！');
      this.getAnswer();
    })
  }

  render() {
    return (
      <div className='detail'>
        <Spin spinning={this.state.loading}>
          <header>
            <h2>{this.state.detailObj.title}</h2>
            <div className="title-more">
              <span>作者：{this.state.detailObj.publisher_name}</span>
              <span
                style={{display: (!this.state.detailObj.tag ? 'none' : 'initial')}}>类型：{this.state.detailObj.tag}</span>
              <span
                style={{display: (!this.state.detailObj.show_time ? 'none' : 'initial')}}>时间：{this.state.detailObj.show_time}</span>
            </div>
          </header>
          <article>
            <h4>问题场景：</h4>
            <section dangerouslySetInnerHTML={{__html: this.state.detailObj.description}}>
            </section>
          </article>
        </Spin>
        <div className="answer">
          <div className="title">
            <h2>{this.state.pagination.total}个回答</h2>
            <Radio.Group value={this.state.order} onChange={this.handleOrderChange}>
              <Radio.Button value="0">默认排序</Radio.Button>
              <Radio.Button value="1">时间排序</Radio.Button>
            </Radio.Group>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={this.state.answerList}
            renderItem={item => (
              <List.Item actions={[this.renderListAction(item)]}>
                <List.Item.Meta
                  title={`${item.publisher_name} ${item.show_time ? '发布于' : ''}${item.show_time}`}
                  description={<div dangerouslySetInnerHTML={{__html: item.content}}></div>}
                />
              </List.Item>
            )}
            loading={this.state.answerLoading}
          />
          {this.renderPagination()}
        </div>
        {this.renderReplyContent()}
      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.setState({
      id: parseInt(id)
    }, () => {
      this.getDetail()
    })
    // const elem = this.refs.reply
    // const editor = new Editor(elem)
    // // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    // editor.customConfig.onchange = html => {
    //     this.setState({
    //         myAnswer: html
    //     })
    // }
    // editor.create()
  }
}

export default bugDetail;
