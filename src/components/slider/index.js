import React, { Component } from 'react';
import { Menu } from 'antd';
import {Layout} from "antd/lib/index";
import { mapStateToProps, mapDispatchToProps } from '@/store/connect'
import {connect} from "react-redux";
import { filterData } from '@/utils/index.js'
import { menus as menusConfig } from '@/router/index'
import slideMenu from '@/components/slideMenu'
import {withRouter} from 'react-router-dom'
const { Sider } = Layout;
@withRouter
class MySlider extends Component {
    constructor(props) {
		super(props)
		this.state = {
            defaultOpenKeys: sessionStorage.getItem('openKey') ? sessionStorage.getItem('openKey') : '/index'
        }
    }
    render() {
        let { slidecollapsed, getRouterConfig } = this.props
        slidecollapsed =  filterData(slidecollapsed, 'slidecollapsed')
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={ slidecollapsed }
            >
                <div className="logo" />
                <div onClick={getRouterConfig}>
                    <Menu theme="dark" mode="inline" 
                        defaultSelectedKeys={['/index']}
                        selectedKeys={[this.props.location.pathname]}
                        defaultOpenKeys={[this.state.defaultOpenKeys]}>
                        {slideMenu(menusConfig)}
                    </Menu>
                </div>

            </Sider>

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MySlider);