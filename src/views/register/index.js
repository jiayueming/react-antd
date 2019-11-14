import React from 'react'   // +
import { Redirect } from "react-router-dom";  // +
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { validatorPhone } from '@/utils/index'  // +
import {connect} from "react-redux";  // +
import { handleLogin, hanleRegister } from '@/store/common/actionCreators'
import './index.css'  // +
const FormItem = Form.Item;
const Option = Select.Option;
@connect(
    state => state.get('common').toObject(),
    {handleLogin, hanleRegister}
)
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        formValue: [],  // 添加保存内容
        isLoginLoading: false // 添加是否已经请求
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.hanleRegister(values)
                this.setState({  // 注册完毕， 保存内容，并修改状态。
                    formValue: values,
                    isLoginLoading: false
                })
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    // 获取验证码， 传递给父组件
    getCaptcha = (e) => {  // +
        var num = Math.floor(Math.random()*10000)
        this.props.handleCaptcha(num)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        let { reigsterData, loginData } = this.props  // 新增注入的数据
        // 注册成功， 自动登录
        if (typeof reigsterData === 'object' && reigsterData.code === 200) {
            if (!this.state.isLoginLoading) { // 判断是否已经请求过，
                this.props.handleLogin(this.state.formValue) // 请求登录。
                this.setState({
                    isLoginLoading: true
                })
            }
            if (typeof loginData === 'object' && loginData.code === 200) { // 登录成功， 跳转页面。
                sessionStorage.setItem('isAuthenticated', true)
                let from = {}
                from.pathname = '/';
                return <Redirect to={from} />;
            }
        }    
        return (
            <div className="register">
                <div className="register-form">
                <Form onSubmit={this.handleSubmit} >
                    <FormItem
                        {...formItemLayout}
                        label="用户别名"
                    >
                        {getFieldDecorator('username', {
                            rules: [{
                                message: '请输入用户名称',
                            }, {
                                required: true, message: '用户名称必填',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入用户密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请验证密码',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号码"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入正确的手机号码' },
                                {validator: validatorPhone.bind(this)()} //  + 添加了验证手机正则
                            ],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="验证码"
                        extra="点击获取验证码， 验证码将会自动填写"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入正确的验证码' }],
                                })(
                                    <Input disabled/>  // +  只读
                                )}
                            </Col>
                            <Col span={12}>
                                <Button onClick={this.getCaptcha}>获取验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span> 电子邮箱</span>
                        )}
                    >
                        {getFieldDecorator('email', {
                            rules: [{ required: false, message: '请输入电子邮箱', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">注册</Button>
                    </FormItem>
                </Form>
                </div>
            </div>
        );
    }
}

// 当input发生改变时， 调用父传递过来的事件。
const onFieldsChange = (props, changeFields) => {
    props.onChange(changeFields)
}
// 接受到值， 并注入Form组件内
const mapPropsToFields = props => {
    let captcha = props.captcha
    captcha && captcha.value && captcha.errors && delete captcha.errors  // 当存在值的时候， 删除errors
    return {
        username: Form.createFormField({
            ...props.username,
        }),
        password: Form.createFormField({
            ...props.password
        }),
        confirm: Form.createFormField({
            ...props.confirm
        }),
        phone: Form.createFormField({
            ...props.phone
        }),
        captcha: Form.createFormField({
            ...props.captcha
        }),
        email: Form.createFormField({
            ...props.email
        })
    }
}
// value改变事件
const onValuesChange = (_, values) => {
}

const WrappedRegistrationForm = Form.create({onFieldsChange, mapPropsToFields, onValuesChange})(RegistrationForm);

// 传递参数给form组件
class Register extends React.Component {
    state = {
        fields: {
            username: {
                value: '我是useranme默认值'
            }
        }
    }
    // 当input的value发生改变， 就改变值，
    handleFormChange = (changedFields) => {
        this.setState(({fields}) => {
            return {
                fields: {...fields, ...changedFields}
            }
        })
    }
    // 点击获取验证码事件。
    handleCaptcha = (captchaValue) => {
        this.setState(({fields}) => {
            let captcha = { // 合并captcha对象， 修改value
                ...((typeof fields.captcha === 'object') ? fields.captcha : {}),
                value: captchaValue
            }
            return {
                fields: {...fields, captcha}
            }
        })
    }
    render () {
        let fields = this.state.fields
        return (
            <div>
                <WrappedRegistrationForm {...fields} onChange={this.handleFormChange} handleCaptcha={this.handleCaptcha}></WrappedRegistrationForm>
            </div>
        )
    }
}

export default Register