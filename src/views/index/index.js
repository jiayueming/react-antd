import React, { Component } from 'react';
import { Layout } from 'antd';
import MyHeader  from '@/components/header'
import MyMain  from '@/components/main'
import MySlider  from '@/components/slider'
import './index.css'

class Index extends Component {
    render() {
        console.log('55')
        let { routes } = this.props
        return (
            <Layout style={{flexDirection: 'inherit', minHeight: '100vh'}}>
                <MySlider></MySlider>
                <Layout style={{flexDirection: 'column'}}>
                    <MyHeader></MyHeader>
                    <MyMain routes={routes}></MyMain>
                </Layout>
            </Layout>
        );
    }
}

export default Index;