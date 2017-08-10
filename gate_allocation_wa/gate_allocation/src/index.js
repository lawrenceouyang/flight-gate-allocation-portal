import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import LayoutContainer from './Containers/LayoutContainer';
import LoginContainer from './Containers/LoginContainer';
import appReducer from './Redux/reducers';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import './Style/base.css';
import theme from './Theme/theme';
import './Theme/theme.css';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);


let store = createStore(appReducer,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                        applyMiddleware(thunk),
                        applyMiddleware(historyMiddleware));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <div class="flex-root">
            <Switch>
              <Route exact path="/" component={LoginContainer} />
              <Route path="/" render={(props) => (<LayoutContainer {...props} theme={theme}/>)} theme={theme}/>
            </Switch>
        </div>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
