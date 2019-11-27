import React from 'react';
import Editor from 'wangeditor'

class ReplyContent extends React.Component {
    state = {
    }
    render() {
        return (<div className="reply-content" ref='reply'>
        </div>)
    }
    componentDidMount(){
        console.log('组件渲染完成')
        const elem = this.refs.reply
        const editor = new Editor(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.props.transferMsg(html)
        }
        editor.create()
    }
}
export default ReplyContent;
