import React, { Component } from 'react';

class Loading extends Component {
  render() {
    let style = {
      'color': '#999',
      'fontSize': '14px',
      'height': '36px',
      'lineHeight': '36px',
      'textAlign': 'center',
      'width': '100%'
    }
    return (
      <div style={style}>
        <p>正在加载中</p>
      </div>
    );
  }
}

export default Loading;
