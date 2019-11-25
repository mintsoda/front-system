import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './addBug.less';
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import Editor from 'wangeditor'
import XHR from "../../../api/apis";

const { Option } = Select;

class addBug extends React.Component {
    state = {
        // tag列表
        tagList: [],
        // 标题
        title: '',
        // 描述
        description: '',
        // 标签
        tag: '',
        // 解决办法
        answer: ''
    };
    handleChange = (e) => {
        e.persist();
        this.setState({
            title: e.target.value
        })
    };
    handleSelectChange = (value)=>{
        this.setState({
          tag: value
      })
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                XHR.publishBug(values).then((res) => {
                   console.log()
                })
            }
        });
    };
    getTagList= ()=>{
        XHR.getTags({}).then((res) => {
            this.setState({
                tagList: res.data
            })
        })
    };
    validateEditorFrom = (rule, value, callback) => {
        //此处根据富文本框的text值进行验证，但注意富文本框中输入空格，使用‘&nbsp‘表示，此方法不能处理只输入空格的验证。
        // if (this.state.editorText.trim() === '') {
        //     callback('不能为空');
        // }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 2,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label={'标题'}
                >
                    {
                        getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入标题!', whitespace: true }],
                    })(<Input placeholder={'请输入标题'}/>)
                    }
                </Form.Item>
                <Form.Item
                    label={'描述'}
                >
                    {
                        getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入描述!' }],
                        },{
                            // 使用自定义的校验规则
                            validator: this.validateEditorFrom
                        })(<div ref={(ref) => this.editorElem = ref} style={{textAlign: 'left'}}></div>)
                    }
                </Form.Item>
                <Form.Item label={'标签'}>
                    {
                        getFieldDecorator('tag',{
                            rules: [{ required: true, message: '请选择一个类型!' }],
                        })(<Select placeholder={'请选择一个类型'} style={{ width: 200 }}>
                            {this.state.tagList.map((tag) => (
                                <Option value={tag.id} key={tag.id}>{tag.name}</Option>
                            ))}
                        </Select>)
                    }
                </Form.Item>
                <Form.Item label={'解决办法'}>
                    {
                        getFieldDecorator('answer', {
                            rules: [{ required: true, message: '请输入描述!' }],
                        },{
                            // 使用自定义的校验规则
                            validator: this.validateEditorFrom
                        })(<div ref={(ref) => this.editorElemSolve = ref} style={{textAlign: 'left'}}></div>)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        );
    }
    componentDidMount() {
        this.getTagList()
        const elem = ReactDOM.findDOMNode(this.editorElem)
        const editor = new Editor(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            //将html值设为form表单的desc属性值
            this.props.form.setFieldsValue({
                'description': html
            });
        }
        editor.create()

        const editorElemSolve = ReactDOM.findDOMNode(this.editorElemSolve)
        const editorSolve = new Editor(editorElemSolve)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editorSolve.customConfig.onchange = html => {
            // this.setState({
            //     answer: html
            // })
            this.props.form.setFieldsValue({
                'answer': html
            });
        }
        editorSolve.create()
    }
}

const addBugForm = Form.create({ name: 'add' })(addBug);

export default addBugForm;


