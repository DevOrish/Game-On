import React from 'react';
import Home from './views/Home'
import Login from './views/Login'
import { Route, Switch } from 'react-router-dom'
import DoodooHead from "./cmps/DoodooHead";
function Router() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/game/doodoohead" component={DoodooHead} />
        </Switch>
    );
}

export default Router;
