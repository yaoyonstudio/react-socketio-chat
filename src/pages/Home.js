import React, { Component } from 'react';
import Wrapper from './Wrapper'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Wrapper>
        <div className="Main Home">
          Home Page
        </div>
      </Wrapper>
    );
  }
}

export default Home;
