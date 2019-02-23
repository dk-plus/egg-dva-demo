import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    console.log('error: ', e)
  },
  // onAction: createLogger(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
