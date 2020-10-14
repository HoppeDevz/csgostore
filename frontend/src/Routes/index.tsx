import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Pages/Home';
import AdminPanelLogin from '../Pages/AdminPanelLogin';
import AdminPanel from '../Pages/AdminPanel';

export default function Routes(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/adminlogin" exact component={AdminPanelLogin} />
                <Route path="/adminpanel" exact component={AdminPanel} />
            </Switch>
        </BrowserRouter>
    )
}