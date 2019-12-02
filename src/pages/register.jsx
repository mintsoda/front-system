import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import '../style/register.less';
import XHR from "../api/apis";
import Background from '../components/Background'


class register extends Component {
    state = {
        confirmDirty: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                XHR.register({
                    username: values.username,
                    password: values.password
                }).then((res) => {
                    console.log(res);
                    if(res.data){
                        window.location.href = '/login'
                    }
                }).catch(() => {

                })
            }
        });
    };
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码请输入一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
          <div className="container">
              <div className='register-form-content'>
                  <header className='register-header'>
                      <Icon type="html5"/>
                      <h5>注册</h5>
                  </header>
                  <Form onSubmit={this.handleSubmit} className="register-form">
                      <Form.Item>
                          {getFieldDecorator('username', {
                              rules: [{required: true, message: '请输入用户名!'}],
                          })(
                            <Input
                              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                              placeholder="用户名"
                            />,
                          )}
                      </Form.Item>
                      <Form.Item hasFeedback>
                          {getFieldDecorator('password', {
                              rules: [
                                  {
                                      required: true,
                                      message: '请输入密码!',
                                  },
                                  {
                                      validator: this.validateToNextPassword,
                                  },
                              ],
                          })(<Input.Password placeholder={'请输入密码'}/>)}
                      </Form.Item>
                      <Form.Item hasFeedback>
                          {getFieldDecorator('confirm', {
                              rules: [
                                  {
                                      required: true,
                                      message: '请再次输入密码!',
                                  },
                                  {
                                      validator: this.compareToFirstPassword,
                                  },
                              ],
                          })(<Input.Password placeholder={'请再次输入密码'} onBlur={this.handleConfirmBlur}/>)}
                      </Form.Item>
                      <Form.Item>
                          <Button type="primary" htmlType="submit" className="register-form-button">
                              注册
                          </Button>
                      </Form.Item>
                  </Form>
              </div>
              <div>
                  <Background/>
              </div>
          </div>
        );
    }
    componentDidMount () {
    }

    componentWillUnmount () {
    }
}

const registerForm = Form.create({name: 'register'})(register);

export default registerForm;
