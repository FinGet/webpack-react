/**
 * 应用入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import App from './App.jsx';

// ReactDOM.hydrate(<App />,document.getElementById('root')); // 不推荐这种直接挂在body上，最好是有一个节点

const root = document.getElementById('root');
const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component/>
    </AppContainer>,
    root
  )
}
render(App);
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default;
    render(NextApp);
  })
}