'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Provider
} from 'react-redux';
import configureStore from './stores';
import Root from './routes';

let store = configureStore(() => {
    console.log("loading...");
});


ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
