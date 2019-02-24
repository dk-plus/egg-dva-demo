import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { arrayToKeyValue } from '../../utils/utils';
import { Link, withRouter } from "dva/router";
import MyBreadcrumb from "../MyBreadcrumb";
import MyMenu from "../MyMenu";
import './index.css';

const { Header, Content, Sider } = Layout;

const menu = [{
  key: 'home',
  title: '首页',
  url: '/home',
  icon: 'home',
}, {
//   key: 'activity',
//   title: '活动管理',
//   url: '/activity',
//   icon: 'file',
//   children: [{
//     key: 'template',
//     title: 'h5模板',
//     url: '/template',
//     icon: 'file',
//   }],
// }, {
  key: 'template',
  title: 'h5模板',
  url: '/template',
  icon: 'file',
}];

const breadcrumbMap = {
  'home': '首页',
  'template': 'h5模板',
  'edit': '编辑',
};

class MyLayout extends React.Component {

  state = {
    collapse: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { children, history: { location } } = this.props;
    const { pathname } = location;
    // console.log(location)
    // console.log(siderMap)
    // console.log(pathname.split('/'))

    return (
      <Layout>
        <Header>
          <div style={{color: '#fff'}}>dva-demo</div>
        </Header>
        <Layout>
          <Sider 
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <MyMenu menu={menu} location={location}/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <MyBreadcrumb style={{margin: '16px 0'}} path={pathname} map={breadcrumbMap} />
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