import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KTopbar extends Component {
  goBack () {
    if (this.props.callback && typeof this.props.callback === 'function') {
      this.props.callback()
      return
    }
    if (window) {
      window.history.back()
      return
    }
  }

  render() {
    const Div = styled.div`
      color: #333;
      width: 100vw;
      height: 44px;
      background-color: #ccc;
      position: fixed;
      top: 0;
      left: 0;
      h2 {
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 16px;
        line-height: 44px;
      }
      .backIcon {
        position: absolute;
        left: 0;
        top: 4px;
        height: 36px;
      }
      ${props => this.props.bgcolor && css`
        background-color: ${this.props.bgcolor};
      `}
      ${props => this.props.color && css`
        color: ${this.props.color};
      `}

    `
    return (
      <Div>
        <h2>{this.props.title}</h2>
        {this.props.back && <img onClick={() => this.goBack()} className="backIcon" src={this.props.icon ? this.props.icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAsCAMAAAAQPRtoAAAAM1BMVEVHcExwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHCuhM8XAAAAEHRSTlMANhD12gNIeoEpI5aJqcJzOgx/sAAAAE5JREFUSMft0ssNgDAMBNENYIc/7r9aJDoYcUriuT/tZaWswfwqUGyxFCxkVBjfUB8bgwqPm563xiNuKjZrmjSfOSdqjtkp2R2vmJmyv71o+wOYHIIK5wAAAABJRU5ErkJggg=='} alt="返回" />}
        {this.props.children}
      </Div>
    );
  }
}

export default KTopbar;
