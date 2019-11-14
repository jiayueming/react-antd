import React from 'react';
import { Row, Col } from 'antd';
import './index.css'
import {connect} from "react-redux";
import { Redirect, Link } from "react-router-dom";  // +
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { handleLogin } from '@/store/common/actionCreators'
const FormItem = Form.Item;
// @connect(
//     loginMap.mapStateToProps, 
//     loginMap.mapDispatchToProps
// )
@connect(
    state => state.get('common').toObject(),
    {handleLogin}
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.handleLogin(values)  // 拿到注入的事件， 进行请求
            } else {
                return
            }
        });
    }
    componentDidMount() {
        // console.log('loginData', this.props)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { from } = this.props.location.state || { from: { pathname: "/" } }; // 获取来源， 当已经登录， 跳转到这个来源页面。
        let { loginData }  = this.props; // 获取登录接口后返回的数据
        if (typeof loginData === 'object' && loginData.code === 200) { // 判断是否登录成功， 
            sessionStorage.setItem('isAuthenticated', true) // 设置登录凭证
        }
        let isAuthenticated  = sessionStorage.getItem('isAuthenticated') // 获取登录凭证
        // 判断是否登录， 如果已经登录， 则进行重定向到来源页面， 如果来源页面是登录页面， 则定向到首页。
        if (isAuthenticated) {
            from.pathname = from.pathname === '/login' ? '/' :  from.pathname
            return <Redirect to={from} />;
        }
        return (
            <div className="login">
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '用户名为admin!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码为123456!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Row gutter={24}>
                                <Col span={12}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                                </Col>
                                <Col span={12} className="tr">
                                <a className="login-form-forgot" href="/">忘记密码</a>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row gutter={24}>
                                    <Col span={6}>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            登录
                                        </Button>
                                    </Col>
                                <Col span={18} className="tr">
                                    <Link to="/register">还没有账号？ 去注册</Link>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(Login)
export default WrappedRegistrationForm
