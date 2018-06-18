import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { initializeReactApp } from './firebase';
import './index.css';

initializeReactApp();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
