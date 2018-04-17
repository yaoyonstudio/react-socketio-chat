import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {  
  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, { data: this.props.data })}
      </React.Fragment>
    );
  }
}

Item.contextTypes = {data: PropTypes.object};

export default Item;
