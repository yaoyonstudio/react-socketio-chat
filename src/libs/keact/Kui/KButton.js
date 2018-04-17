import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KButton extends Component {
  render() {
    const Button = styled.button`
      background-color: #fff;
      border: 1px solid #d33;
      border-radius: 3px;
      color: #d33;
      cursor: pointer;
      display: inline-block;
      height: 44px;
      width: 1rem;
      box-sizing: border-box;

      ${props => this.props.full && css`}
        width: 100%;
      `}

      ${props => this.props.height && css`}
        height: ${this.props.height}
      `}


      ${props => this.props.hover && css`}
        &:hover {
          color: #fff;
          background-color: #d33 !important;
        }
      `}

      ${props => this.props.primary && css`
        background-color: #d33;
        color: #fff;
      `}

      ${props => this.props.disabled && css`
        background-color: #bbb;
        border-color: #bbb;
        color: #fff;
      `}

      ${props => this.props.gradient && css`
        background-image: linear-gradient(90deg, #ff8e2b, #ffa308);
        border-color: #ff8e2b;
        color: #fff;
      `}
    `
    return (
      <Button disabled={this.props.disabled ? 'disabled' : false} onClick={this.props.onClick}>{this.props.children}</Button>
    );
  }
}

export default KButton;
