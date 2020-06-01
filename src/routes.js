import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import Home from './components/home';
import BookSlot from './components/bookslot';
import Admin from './components/admin';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/bookslot" exact component={BookSlot} />
                <Route path="/admin" exact component={Admin} />
                </Switch>
        </BrowserRouter>
    );
};


export default Routes;