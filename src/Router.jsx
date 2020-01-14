import React from 'react';
import Home from './views/Home'
import Login from './views/Login'
import { Route, Switch } from 'react-router-dom'
import { DoodoHead } from "./cmps/DoodoHead";
function Router() {
    return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path = "/game/doodohead" component={DoodoHead} />
            </Switch>
    );
}

export default Router;
