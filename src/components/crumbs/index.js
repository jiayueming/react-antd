import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux'
import { getRouterConfig } from "@/store/config/actionCreators";
import { filterData, deleObj } from '@/utils/index.js'
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : ( typeof v === 'object' ? (Array.isArray(v.routes) ? deepFlatten(v.routes.concat(deleObj(v, 'routes'))) : v) : v )));  // +-
let breadcrumbNameMap = []
@withRouter
@connect(
    state => {
        return {
            slidecollapsed: state.get('config').toObject().slidecollapsed,
            routerConfig: state.get('config').toObject().routerConfig.toJS()
        }
    },
    {getRouterConfig}
)
class Crumbs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pathSnippets: '',
            routerConfig: []
        }
    }
    componentWillMount () {
        this.props.getRouterConfig()
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.routerConfig !== this.props.routerConfig) {
            return true
        }
    }
    onTrun () {}
    render() {
        let { location, routerConfig } = this.props
        console.log('routerConfig', routerConfig)
        routerConfig = filterData(routerConfig, 'routerConfig')
        this.onTrun = getRouterConfig
        routerConfig = routerConfig ? routerConfig.menus : null;
        breadcrumbNameMap = (Array.isArray(routerConfig) && deepFlatten(routerConfig)) || []
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            let ItemName = Array.isArray(breadcrumbNameMap) && breadcrumbNameMap.map(item =>
                    (item.path === url) ? item.name : ''
                )
            ItemName = ItemName.join('')
            return (
            (ItemName && (<Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {ItemName}
                    </Link>
            </Breadcrumb.Item>)) || ''
            );
        });   
        return (
            <div className="my-breadcrumb">
                <Breadcrumb>
                    {this.props.routerConfig ? extraBreadcrumbItems : null}
                </Breadcrumb>
            </div>
        )
    }
}
export default Crumbs
