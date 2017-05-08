import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import App from "./pages/App";
import Home from "./pages/Home";
import List from "./pages/List";
import Booking from "./pages/Booking";

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home} />
      <Route path="list" component={List} />
      <Route path="booking/:id" component={Booking} />
    </Route>
  </Router>
), document.getElementById('root'));