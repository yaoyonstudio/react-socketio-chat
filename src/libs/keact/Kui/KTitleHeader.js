import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KTitleHeader extends Component {
  render() {
    const Header = styled.header`
      background-color: #fff;
      height: 40px;
      padding: 0 10px;
      position: relative;
      h3 {
        height: 100%;
        line-height: 40px;
        font-size: 16px;
        color: #333;
      }
      
      ${props => this.props.height && css`
        height: ${this.props.height};
        h3 {
          line-height: ${this.props.height};
        }
      `}
      
      ${props => this.props.color && css`}
        h3 {
          color: ${this.props.color} !important;
        }
      `}
      
      ${props => this.props.borderBottom && css`}
        border-bottom: 1px solid #ddd;
      `}

      ${props => this.props.icon && css`}
        background: url(${this.props.icon}) no-repeat 10px center;
        background-size: ${this.props.iconsize ? this.props.iconsize : '20px'};
        h3 {
          padding-left: ${this.props.iconsize ? this.props.iconsize : '26px'};
        }
      `}



    `
    return (
      <Header className={this.props.className || ''}>
        <h3>{this.props.title}</h3>
        {this.props.children}
      </Header>
    );
  }
}

export default KTitleHeader;
