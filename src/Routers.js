import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Test from './pages/Test';

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/test" component={Test}/>
      </Switch>
    );
  }
}

export default Routers
