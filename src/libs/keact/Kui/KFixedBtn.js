import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KFixedBtn extends Component {
  constructor (props) {
    super(props)
    this.handle = this.handle.bind(this)
  }

  handle () {
    if (this.props.onClick) {
      this.props.onClick()
    } else {
      window.history.back()
    }
  }

  render() {
    const Button = styled.button`
      background-color: #d33;
      border: none;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      display: block;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 50px;
      position: fixed;
      right: 30px;
      bottom: 30px;

      ${props => this.props.bgcolor && css`
        background-color: ${this.props.bgcolor};
      `}
      ${props => this.props.color && css`
        color: ${this.props.color};
      `}
      ${props => this.props.right && css`
        right: ${this.props.right};
      `}
      ${props => this.props.bottom && css`
        bottom: ${this.props.bottom};
      `}
    `
    return (
      <Button disabled={this.props.disabled ? 'disabled' : false} onClick={() => this.handle()}>{this.props.title ? this.props.title : '返回'}</Button>
    );
  }
}

export default KFixedBtn;
