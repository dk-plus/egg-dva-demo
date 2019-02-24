import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from "dva/router";
import { arrayToKeyValue } from '../../utils/utils';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class MyMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMenu(menu) {
    return menu.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={
            <Fragment>
              <Icon type={item.icon} /> <span>{item.title}</span>
            </Fragment>
          }>
            {
              item.children && this.renderMenu(item.children)
            }
          </SubMenu>
        );
      } else {
        return <MenuItem key={item.key}>
          <Link to={item.url}><Icon type={item.icon} /><span>{item.title}</span></Link>
        </MenuItem>
      }
    });
  }

  getSelectKey(path) {
    return path.split('/')[1]
  }

  render() {
    const { menu, location } = this.props;

    return <Fragment>
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.getSelectKey(location.pathname)]}
        style={{ height: '100%', borderRight: 0 }}
        theme="dark"
      >
      {
        this.renderMenu(menu)
      }
      </Menu>
    </Fragment>
  }
}

export default MyMenu;