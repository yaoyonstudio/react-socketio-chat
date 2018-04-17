import React, { Component } from 'react';
import Wrapper from './Wrapper'

class ChatList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Wrapper>
        <div className="Main Home">
          ChatList Page
        </div>
      </Wrapper>
    );
  }
}

export default ChatList;
