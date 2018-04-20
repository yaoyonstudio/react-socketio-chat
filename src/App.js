import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './style.css';
import Routers from './Routers'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routers {...this.props} />
      </BrowserRouter>
    );
  }
}

export default App;
