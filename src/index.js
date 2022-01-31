import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import './index.css';
import ReactGA from 'react-ga';
import App from './App';

ReactGA.initialize('UA-216506531-1');

ReactGA.set({ page: '/' });
ReactGA.pageview('/');

ReactGA.exception({
  description: 'An error ocurred',
  fatal: true,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
