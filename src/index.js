import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import './index.css';
import App from './App';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-216506531-1');
ReactGA.set({ page: '/' });
ReactGA.pageview('/');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);