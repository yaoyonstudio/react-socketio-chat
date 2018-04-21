import React, { Component } from 'react';
import { KTopbar } from '../libs/keact/Kui'

class FindFriend extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="Container">
        <KTopbar back title="猿粪" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main AddFriend">
          AddFriend
        </div>
      </div>
    );
  }
}

export default FindFriend;
