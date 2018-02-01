/**
 * 应用入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.hydrate(<App />,document.getElementById('root')); // 不推荐这种直接挂在body上，最好是有一个节点