import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import App from "./pages/App";
import Home from "./pages/Home";
import List from "./pages/List";

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home} />
      <Route path="list" component={List} />
    </Route>
  </Router>
), document.getElementById('root'));