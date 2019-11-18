import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less';

class login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-form-content'>
                <header className='login-header'>
                    <Icon type="html5" />
                    <h5>卡车之家前端系统</h5>
                </header>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input.Password
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <a href="./register">注册</a>
                </Form.Item>
            </Form>
            </div>
        );
    }
}
const loginForm = Form.create({ name: 'login' })(login);

export default loginForm;
