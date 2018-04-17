import React, { Component } from 'react';
import TabMenu from '../components/common/TabMenu'

class Wrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="Wrapper" {...this.props}>
        {this.props.children}
        <TabMenu />
      </div>
    );
  }
}

export default Wrapper;
