import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RPS from './RPS';
import RPS_GAME from './RPS_GAME';
// import CssTest1 from 'CssTest1.js';
// import CssTest2 from 'CssTest2.js';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/*<RPS_GAME/> */}
    {/*<CssTest1/>
    <CssTest2/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
