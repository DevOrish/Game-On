import React from 'react';
import Home from './views/Home'
import Login from './views/Login'
import { Route, Switch } from 'react-router-dom'

function Router() {
    return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
            </Switch>
    );
}

export default Router;
