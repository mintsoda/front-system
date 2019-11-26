import React, { Component } from 'react';
import { Divider,List,Radio,Button } from 'antd';
// import AnswerItem from '../../../components/AnswerItem'
import './bugDetail.less';
import Editor from 'wangeditor'
import ReactDOM from "react-dom";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
class bugDetail extends Component {
    state = {
        // 排序
        order: '0',
        pagination: {
            pageSize: 15,
            current: 1,
            total: 100
        },
    }
    handleOrderChange=()=>{
        console.log('改变排序')
    }
    render() {
        return (
            <div className='detail'>
                <header>
                    <h2>input在dispaly：flex失效超出整体宽度</h2>
                    <div className="title-more">
                        <span>作者：余尚辉</span>
                        <span>类型：app</span>
                        <span>时间：2018-08-09</span>
                    </div>
                </header>
                <article>
                    <h4>问题场景：</h4>
                    <section>
                        最外层的盒子设置为弹性盒子，左边和右边的写成固定宽度，中间的input输入框设置为flex:1，希望input的宽度是所剩下的长度，结果是它比所剩下的长度要大，验证码这三个字就显示成两行了
                        原因：input兼容弹性盒子有问题，它会有一个自己默认的最小长度，所以会导致验证码显示成两行
                        解决办法：我们可以给input输入框加一个div父元素，然后这个div设置flex:1,input设置width:100%；即可解决问题
                    </section>
                </article>
                <div className="answer">
                    <div className="title">
                        <h2>1个回答</h2>
                        <Radio.Group value={this.state.order} onChange={this.handleOrderChange}>
                            <Radio.Button value="0">默认排序</Radio.Button>
                            <Radio.Button value="1">时间排序</Radio.Button>
                        </Radio.Group>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        pagination={this.state.pagination}
                        renderItem={item => (
                            <List.Item actions={[<a key="list-loadmore-edit">设为答案</a>]}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <div className="reply">
                    <div className="title">
                        <h2>编写答案</h2>
                        <Button>发布</Button>
                    </div>
                    <div className="reply-content" ref='reply'>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        const elem = this.refs.reply
        const editor = new Editor(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            //将html值设为form表单的desc属性值
            this.props.form.setFieldsValue({
                'description': html
            });
        }
        editor.create()
    }
}

export default bugDetail;
