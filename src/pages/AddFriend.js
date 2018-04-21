import React, { Component } from 'react';
import { KTopbar } from '../libs/keact/Kui'

class AddFriend extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="Container">
        <KTopbar back title="添加好友" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main AddFriend">
          AddFriend
        </div>
      </div>
    );
  }
}

export default AddFriend;
