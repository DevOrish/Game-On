import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import App from './App';
import { Provider } from 'react-redux'
import store from './stores/store'
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();



ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));
    
serviceWorker.register();
