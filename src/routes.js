import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import Home from './components/home';
import BookSlot from './components/bookslot';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/bookslot" exact component={BookSlot} />
                </Switch>
        </BrowserRouter>
    );
};


export default Routes;