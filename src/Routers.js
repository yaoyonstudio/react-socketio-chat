import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Friends from './pages/Friends';
import AddFriend from './pages/AddFriend';
import FindFriend from './pages/FindFriend';
import Chat from './pages/Chat';
import Login from './pages/Login';
import My from './pages/My';
import MyInfo from './pages/MyInfo';
import Test from './pages/Test';


class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/my" component={My} />
        <Route exact path="/my_info" component={MyInfo} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/add_friend" component={AddFriend} />
        <Route exact path="/find_friend" component={FindFriend} />
        <Route exact path="/chat/:type/:id" component={Chat} />
        <Route exact path="/test" component={Test} />
      </Switch>
    );
  }
}

export default Routers
