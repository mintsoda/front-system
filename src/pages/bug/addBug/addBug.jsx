import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import bugList from "../bugList/bugList";
import E from 'wangeditor'

const { Option } = Select;
const { TextArea } = Input;

class addBug extends React.Component {
    state = {
        checkNick: '',
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleChange = e => {
        console.log(e)
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 5,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label={'标题'}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入标题!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label={'描述'}
                >
                    {
                        <div ref="editorElem" style={{textAlign: 'left'}}>
                        </div>
                    }
                </Form.Item>
                <Form.Item label={'标签'}>
                    {
                        getFieldDecorator('select',{
                            rules: [{ required: true, message: '请选择一个类型!' }],
                        })(<Select placeholder={'请选择一个类型'} style={{ width: 200 }} onChange={this.handleChange}>
                            <Option value="ios">Ios</Option>
                            <Option value="android">Android</Option>
                            <Option value="css">css</Option>
                            <Option value="javascript">javascript</Option>
                            <Option value="vue">vue</Option>
                            <Option value="react">react</Option>
                        </Select>)
                    }
                </Form.Item>
                <Form.Item label={'解决办法'}>
                    {getFieldDecorator('solution', {
                        rules: [{ required: true, message: '请输入解决办法!', whitespace: true }],
                    })(<TextArea rows={4} />)}
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
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        editor.create()
    }
}

const addBugForm = Form.create({ name: 'add' })(addBug);

export default addBugForm;


