import React, {Suspense, useState} from 'react'
import {Breadcrumb, Layout, Menu} from 'antd/es'
import {Content, Footer, Header} from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import MenuItem from "antd/es/menu/MenuItem"
import {
  PieChartOutlined,
} from '@ant-design/icons'
import {Link, Route, Switch} from 'react-router-dom'
import {Routers, routes} from "../../routers"
// @ts-ignore
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css'

import './Layouts.less'
import {Col, Row, message} from "antd"

const Layouts = (props: any) => {
  console.log(222, props)
  const [color, setColor] = useState(localStorage.getItem('themeColor') || '#1890ff')
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className='logo' />
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='inline'
        >
          {
            routes.map(v => (
              <MenuItem
                key={v.path}
                icon={<PieChartOutlined />}
              >
                <Link to={v.path}>{v.path}</Link>
              </MenuItem>
            ))
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: '0 20px'}}>
          <Row justify='space-between' align='middle'>
            <Col></Col>
            <Col>
              <ColorPicker
                color={color}
                onChange={(val: any) => {
                  window.less.modifyVars({
                    '@primary-color': val.color
                  })
                    .then(() => {
                      setColor(val.color)
                      localStorage.setItem('themeColor', val.color)
                    })
                    .catch(() => message.error(`修改失败`))
                }}
              />
            </Col>
          </Row>
        </Header>
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360, background: '#fff'}}>
            <Switch>
              <Suspense fallback={<div>4444</div>}>
                {
                  routes.map((v: Routers) => (
                    <Route
                      path={v.path}
                      key={v.path}
                      render={(renderProps) => <v.component {...renderProps} />}
                    >
                    </Route>
                  ))
                }
              </Suspense>
            </Switch>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
export default Layouts
