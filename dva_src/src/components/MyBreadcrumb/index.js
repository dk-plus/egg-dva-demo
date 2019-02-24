import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from "dva/router";

const BreadcrumbItem = Breadcrumb.Item;

class MyBreadcrumb extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem(path, map) {
    const pathArr = path.split('/');
    let pathStack = [];
    return pathArr.map((path, index, arr) => {
      pathStack.push(path);
      console.log(path, map, map[path])
      return <BreadcrumbItem key={path}>
        {
          index === arr.length - 1 &&
          <span>{map[path]}</span> ||
          <Link to={pathStack.join('/')}>{map[path]}</Link>
        }
      </BreadcrumbItem>
    });
  }

  render() {
    const { path, map, ...restProps } = this.props;

    return <Breadcrumb 
      {...restProps}
    >
    {
      this.renderItem(path, map)
    }
    </Breadcrumb>
  }
}

export default MyBreadcrumb;