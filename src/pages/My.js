import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../modules/user';

import Wrapper from './Wrapper'

class My extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.goLink = this.goLink.bind(this)
  }

  goLink () {
    this.props.history.push('/my_info')
  }
  
  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (
      <Wrapper>
        <div className="Main My">
          <header className="flex-c flex-c-c My_header">
            <div className="avatar" onClick={() => this.goLink()}>
              <img src={this.props.me.avatar ? this.props.me.avatar : '/img/avatar.png'} alt={this.props.me.username} />
            </div>
            <h3>{this.props.me.username}</h3>
          </header>
          <section>
            My
          </section>
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
      getUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(My)
