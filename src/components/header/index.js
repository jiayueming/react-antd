import React, { Component } from 'react';
import { Layout, Menu, Icon, Badge } from 'antd';
import { Redirect } from "react-router-dom";
import { connect  } from 'react-redux'
import { filterData } from '@/utils/index.js'
// import { mapStateToProps, mapDispatchToProps } from '../../store/connect'
import { onSlidecollapsed } from '@/store/config/actionCreators'
import { onLogout } from '@/store/common/actionCreators'
import Crumbs  from '../crumbs'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
@connect(
    state => {
        return {
            slidecollapsed: state.get('config').toObject().slidecollapsed
        }
    },
	{onSlidecollapsed, onLogout}
)
class MyHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            onSlidecollapsed: this.props.onSlidecollapsed,
            current: 'mail',
            isAuthenticated: true
        };
    }
    toggle = () => {
        this.state.onSlidecollapsed()
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    logout = (e) => { // +
        this.props.onLogout({})  // 退出登录， 如果是正常项目中， 应该会传递一些数据过去，这里没有用户数据， 因此传递个空对象
        sessionStorage.removeItem('isAuthenticated')  // 发出退出请求后， 直接退出， 无需等待后台返回响应。
        this.setState({
            isAuthenticated: false // 判断是否登录
        })
    }
    render() {
        const style = {
            background: '#fff', 
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
        let { slidecollapsed } = this.props
        slidecollapsed = filterData(slidecollapsed, 'slidecollapsed')
        let avater = require('@/logo.svg')
        if (!this.state.isAuthenticated) {  // 退出后就重定向
            return <Redirect to="/login" />;
        }
        return (
                <Header style={style}>
                    <div className="flex">
                        <Icon
                            className="trigger"
                            type={ slidecollapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Crumbs></Crumbs>
                    </div>
                    {/* 添加菜单组件 */}
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="1">
                            <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                                <Icon type="notification" />
                            </Badge>
                        </Menu.Item>
                        <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                            <MenuItemGroup title="用户中心">
                                <Menu.Item key="setting:1">你好 -</Menu.Item>
                                <Menu.Item key="setting:2">个人信息</Menu.Item>
                                <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="设置中心">
                                <Menu.Item key="setting:3">个人设置</Menu.Item>
                                <Menu.Item key="setting:4">系统设置</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                </Header>
        )
    }
}
export default MyHeader