import React from 'react';
import { Router, Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Card, Spin, LocaleProvider } from 'antd';
import MyLayout from './components/MyLayout';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { parseQuery } from './utils/utils';

moment.locale('zh-cn');

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

  history.listen((location) => {
    location.query = parseQuery(location.search);
  });

  return (
      <LocaleProvider locale={zh_CN}>
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
      </LocaleProvider>
  );
}

export default RouterConfig;
