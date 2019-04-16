import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home.component";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>;
