import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { arrayToKeyValue } from '../../utils/utils';
import { Link, withRouter } from "dva/router";
import './index.css';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;
const BreadcrumbItem = Breadcrumb.Item;
const { Header, Content, Sider } = Layout;

const menu = [{
  key: 'home',
  title: '首页',
  url: '/home',
}, {
//   key: 'activity',
//   title: '活动管理',
//   url: '/activity',
//   children: [{
//     key: 'template',
//     title: 'h5模板',
//     url: '/template',
//   }],
// },{
  key: 'template',
  title: 'h5模板',
  url: '/template',
}];

const menuMap = arrayToKeyValue(menu, 'url', 'title');
const siderMap = arrayToKeyValue(menu, 'url', 'key');

class MyLayout extends React.Component {

  render() {
    const { children, history: { location } } = this.props;
    console.log(location)
    console.log(siderMap)

    return (
      <Layout>
        <Header>
          <div style={{color: '#fff'}}>dva-demo</div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[siderMap[location.pathname]]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                menu.map(item => {
                  return (
                    item.children &&
                    <SubMenu key={item.key} title={item.title}>
                      {
                        item.children && item.children.map(child => {
                          return (
                            <MenuItem key={child.key}>
                              {/* <a href={child.url}>{child.title}</a> */}
                              <Link to={child.url}>{child.title}</Link>
                            </MenuItem>
                          )
                        })
                      }
                    </SubMenu> ||
                    <MenuItem key={item.key}>
                      {/* <a href={item.url}>{item.title}</a> */}
                      <Link to={item.url}>{item.title}</Link>
                    </MenuItem>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <BreadcrumbItem>{menuMap[location.pathname]}</BreadcrumbItem>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect()(MyLayout));