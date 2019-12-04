import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../style/addBug.less';
import {
  Form,
  Input,
  Select,
  Button, message,
} from 'antd';
import Editor from 'wangeditor'
import XHR from "../../api/apis";
import SolveContent from '../../components/SolveContent'

const {Option} = Select;

class addBug extends Component {
  state = {
    // 类型
    type: 0,
    // 部门列表
    departmentList: [],
    // 标题
    title: '',
    // 描述
    description: '',
    // 标签
    tag: '',
    // 部门
    department: '',
    // 解决办法
    answer: ''
  };
  // 渲染解决办法，类型为0没有解决办法，类型为1有解决办法
  renderSolveContent = () => {
    const {getFieldDecorator} = this.props.form;
    if (this.state.type === 'bug') {
      return <Form.Item label={'解决办法'}>
        {
          getFieldDecorator('answer', {
            rules: [{required: true, message: '请输入描述!'}],
          })(<SolveContent changeSolve={solve => this.changeSolve(solve)}></SolveContent>)
        }
      </Form.Item>;
    }
  }
  // 改变解决办法
  changeSolve = (solve) => {
    this.props.form.setFieldsValue({
      'answer': solve
    });
  }
  // 部门选择框改变
  handleSelectChange = (value) => {
    this.setState({
      department: value
    })
  };
  // 表单保存
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        XHR.publishBug(values).then((res) => {
          let tip = `${this.state.type === 'bug' ? '发布' : '提'}问题成功！`;
          message.success(tip);
          if (document.referrer.indexOf('bugList') > -1) {
            window.history.go(-1);
          } else {
            window.location.replace('./bugList');
          }
        })
      }
    });
  };
  // 获取部门
  getDepartment = () => {
    XHR.getDepartment({}).then((res) => {
      this.setState({
        departmentList: res.data
      })
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 16},
        sm: {span: 2},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
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
              rules: [{required: true, message: '请输入标题!', whitespace: true}],
            })(<Input placeholder={'请输入标题'}/>)
          }
        </Form.Item>
        <Form.Item
          label={'描述'}
        >
          {
            getFieldDecorator('description', {
              rules: [{required: true, message: '请输入描述!'}],
            })(<div ref={(ref) => this.editorElem = ref} style={{textAlign: 'left'}}></div>)
          }
        </Form.Item>
        <Form.Item
          label={'标签'}
        >
          {
            getFieldDecorator('tag')(<Input placeholder={'请输入标签'}/>)
          }
        </Form.Item>
        <Form.Item label={'部门'}>
          {
            getFieldDecorator('department', {
              rules: [{required: true, message: '请选择一个部门!'}],
            })(<Select placeholder={'请选择一个部门'} style={{width: 200}}>
              {this.state.departmentList.map((department) => (
                <Option value={department.id} key={department.id}>{department.name}</Option>
              ))}
            </Select>)
          }
        </Form.Item>
        {this.renderSolveContent()}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }

  componentDidMount() {
    let type = this.props.match.params.type
    this.setState({
      type: type
    })
    this.getDepartment()
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
    //
    // const editorElemSolve = ReactDOM.findDOMNode(this.editorElemSolve)
    // const editorSolve = new Editor(editorElemSolve)
    // // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    // editorSolve.customConfig.onchange = html => {
    //     // this.setState({
    //     //     answer: html
    //     // })
    //     this.props.form.setFieldsValue({
    //         'answer': html
    //     });
    // }
    // editorSolve.create()
  }
}

const addBugForm = Form.create({name: 'add'})(addBug);

export default addBugForm;


