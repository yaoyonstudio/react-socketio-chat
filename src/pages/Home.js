import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Wrapper from './Wrapper'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (
      <Wrapper>
        <div className="Main Home">
          <h1>Home</h1>
          <Link to="/login">注册登录</Link>
        </div>
      </Wrapper>
    );
  }
}

export default Home;
