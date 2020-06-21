import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Stocks from './components/Stocks/Stocks';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Stocks />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
