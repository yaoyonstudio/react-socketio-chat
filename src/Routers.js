import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Friends from './pages/Friends';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Test from './pages/Test';

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/friends" component={Friends}/>
        <Route exact path="/chat/:type/:id" component={Chat}/>
        <Route exact path="/test" component={Test}/>
      </Switch>
    );
  }
}

export default Routers
