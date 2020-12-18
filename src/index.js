import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {CookiesProvider} from 'react-cookie';

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);