import React, { Component } from 'react';
import { Menu } from 'antd';
import {Layout, Switch} from "antd/lib/index";
import { onSlidecollapsed } from '@/store/config/actionCreators'
import {connect} from "react-redux";
import { filterData } from '@/utils/index.js'
import { menus as menusConfig } from '@/router/index'
import slideMenu from '@/components/slideMenu'
import {withRouter} from 'react-router-dom'
const { Sider } = Layout;
@withRouter
@connect(
    state => {
        return {
            slidecollapsed: state.get('config').toObject().slidecollapsed
        }
    },
	{onSlidecollapsed}
)
class MySlider extends Component {
    constructor(props) {
		super(props)
		this.state = {
            theme: 'light',
            defaultOpenKeys: sessionStorage.getItem('openKey') ? sessionStorage.getItem('openKey') : '/index'
        }
    }
    changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light'
        })
    }
    render() {
        let { slidecollapsed, getRouterConfig } = this.props
        slidecollapsed =  filterData(slidecollapsed, 'slidecollapsed')
        console.log('header', slidecollapsed)
        const style = {
            position: 'relative',
            paddingTop: '60px',
            top:'0',
            bottom:'0',
            maxWidth: '200px',
            height: '100vh'
        }
        return (
            <Sider
                trigger={null}
                collapsed={ slidecollapsed }
            >
                <div className="logo" />
                <div onClick={getRouterConfig} className="sideBar">
                    <Menu mode="inline"
                        style={style}
                        theme={this.state.theme}
                        defaultSelectedKeys={['/index']}
                        selectedKeys={[this.props.location.pathname]}
                        defaultOpenKeys={[this.state.defaultOpenKeys]}>
                        {slideMenu(menusConfig)}
                    </Menu>
                    {
                        !slidecollapsed ? 
                        <div className="switch">
                            <Switch checkedChildren="Drak" unCheckedChildren="Light" onChange={this.changeTheme} />  Switch Theme
                        </div> : null
                    }
                    
                </div>
            </Sider>

        )
    }
}
export default MySlider