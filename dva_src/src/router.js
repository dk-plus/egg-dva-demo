import React from 'react';
import { Router, Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Card, Spin } from 'antd';
import MyLayout from './components/MyLayout';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large"/>;
  // return <Card loading={true}/>;
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props => <Component {...props}/>
  }/>
);

function RouterConfig({ history, app }) {
  const Login = dynamic({
    app,
    component: () => import('./routes/Login'),
  });
  const routes = [
    {
      path: '/home',
      component: () => import('./routes/IndexPage'),
    },
    {
      path: '/products',
      models: () => [import('./models/products')],
      component: () => import('./routes/Products'),
    },
    {
      path: '/template',
      models: () => [import('./models/template')],
      component: () => import('./routes/activity/Template'),
    },
    {
      path: '/template/edit',
      models: () => [import('./models/template')],
      component: () => import('./routes/activity/Edit'),
    }
  ];
  return (
      <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <MyLayout history={history}>
          {
            routes.map(({ path, ...dynamics }, key) => (
              <PrivateRoute exact key={key} path={path} component={dynamic({
                app,
                ...dynamics
              })} />
            ))
          }
        </MyLayout>
      </Switch>
      </Router>
  );
}

export default RouterConfig;
