import React from 'react';
import Editor from 'wangeditor'
import ReactDOM from 'react-dom';

class SolveContent extends React.Component {
    render() {
    return (<div ref={(ref) => this.editorElemSolve = ref} style={{textAlign: 'left'}}></div>)
    }
    componentDidMount(){
        console.log('组件渲染完成')
        const editorElemSolve = ReactDOM.findDOMNode(this.editorElemSolve)
        const editorSolve = new Editor(editorElemSolve)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editorSolve.customConfig.onchange = html => {
            // this.setState({
            //     answer: html
            // })
            this.props.changeSolve(html)
        }
        editorSolve.create()
    }
}
export default SolveContent;
