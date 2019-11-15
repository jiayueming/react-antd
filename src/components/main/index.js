import React, { Component } from 'react';
import {Layout} from "antd/lib/index";
import { RenderRoutes } from '@/router/utils' // +
const { Content } = Layout;

class MyMain extends Component {
    render() {
        let { routes } = this.props;
        return (
            <div>
                <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff' }}>
                    <RenderRoutes routes={routes}></RenderRoutes> 
                </Content>
            </div>
        )
    }
}
export default MyMain;