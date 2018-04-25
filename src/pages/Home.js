import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Wrapper from './Wrapper'

import { getLocation } from '../modules/user';


class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  
  componentDidMount () {
    console.log(this.props)
    this.props.getLocation()
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


const mapStateToProps = state => ({
  me: state.user.me
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);

