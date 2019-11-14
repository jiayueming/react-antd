import React from 'react';
import { Menu } from 'antd';
import { OldSchoolMenuLink } from '@/router/utils'
import './index.css'
const SubMenu = Menu.SubMenu;
const myMenu = (item) => <Menu.Item key={item.path}>
            <OldSchoolMenuLink route={item}>
        </OldSchoolMenuLink></Menu.Item>
const openSub = (par) => {
    console.log('===',par)
    sessionStorage.setItem('openKey', par)
}
const slideMenu = (routes) => Array.isArray(routes) && routes.map(item => (
        (!Array.isArray(item.routes) &&  myMenu(item) ) || (
            <SubMenu key={item.path}
                style={{color: '#fff !important'}}
                onTitleClick={() => {openSub(item.path)}}
                title={(<OldSchoolMenuLink route={item}></OldSchoolMenuLink>)}>
                {slideMenu(item.routes)}
            </SubMenu>)
    )
);


export default slideMenu