import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {  legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import "./index.css";

import reducers from './reducers';

import App from './App';

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, compose(applyMiddleware(thunk), ReactReduxDevTools))

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, root);