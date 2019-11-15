import React from 'react';
import Login from '@/views/login/index'
import Index from '@/views/index/index'
import Register from '@/views/register/index' // +
import User from '@/views/users/index'  // 引入文件
// import { Login, Index, User, Register } from './toComponent'
import { RenderRoutes } from '@/router/utils'

const Ui = ({routes}) => (<div>
    <RenderRoutes routes={routes}></RenderRoutes> 
</div>)
const Button = () => <h3>Button</h3>
const Icon = () => <h3>Icon</h3>
const Animation = () => <h3>Animation</h3>
const From = () => <h3>From</h3>
export const menus = [    // 菜单相关路由
    { path: '/index/UI', name: 'UI', icon:'mail', component: Ui , 
        routes: [
            {path: '/index/UI/button', name: '按钮', icon: 'calendar', component: Button },
            {path: '/index/UI/users', name: '用户列表', icon: 'wallet', component: User },
            {path: '/index/UI/Icon', name: '图标', icon: 'video-camera', component: Icon }
        ]
    },
    { path: '/index/animation', name: '动画', icon: 'appstore', component: Animation },
    { path: '/index/form', name: '表格', icon: 'setting', component: From },
]
export const main = [
    { path: '/login', exact: true, name: '登录', component: Login, meta: {isAuth: true}},
    { path: '/register', exact: true, name: '注册', component: Register, meta: {isAuth: true}},
    { path: '/', exact: true,  name: '首页', Redirect: '/index'},
    {
        path: '/index', name: '首页', component: Index,  // 这里exact!=true， 因为需要模糊匹配， 然后下一级才能匹配到这个路由，才能继续往下寻找组件
        routes: menus
    }
]

export const routerConfig =  {
    main, menus
}
