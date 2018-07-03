'use strict';
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import Login from './Login/Login.Container';
import Home from './Home/Home.Container';
import Root from './Root/Root.Container';
import {
    IndexRoute,
    Route,
    Router,
} from 'react-router';
import {
  browserHistory,
} from 'react-router';
export default function Routes() {


    return (
        <Router history={browserHistory}>
            <Route path="/" component={Root}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
            </Route>
        </Router>
    );

}