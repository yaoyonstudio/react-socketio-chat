import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const groupBy = (arr, group) => {
  let map = {}
  let dest = []
  for (let i = 0, l = arr.length; i < l; i++) {
    let ai = arr[i]  
    if (!map[ai[group]]) {  
      dest.push({  
        group: ai[group],
        data: [ai]
      })
      map[ai[group]] = ai  
    } else {  
      for (let j = 0, k = dest.length; j < k; j++) {  
        let dj = dest[j]
        if (dj[group] == ai[group]) {  
          dj.data.push(ai)
          break
        }  
      }  
    }  
  }
  return dest
}

const arraySort = (arr, group) => {
  return arr.sort((a, b) => {
    let v1 = a[group]
    let v2 = b[group]
    return v1 - v2
  })
}


class KListMenu extends Component {
  render() {
    const _data = groupBy(this.props.data, 'group')
    const Nav = styled.nav`
      ul {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
      }

      li {
        list-style: none;
        background-color: #fff;
        padding: 0 12px;
        &:not(:last-child) {
          a {
            border-bottom: 1px solid #eee;
          }
        }
      }

      a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 44px;
        text-decoration: none;
        color: #666;
        font-size: 14px;
      }

      span {
        width: 32px;
        display: block;
        text-align: center;
        margin-right: 10px;
      }

      img {
        height: 20px;
        max-width: 24px;
        margin: 0 auto;
      }

      p {
        flex: 1;
      }

      ${props => this.props.arrow && css`}
        a {
          background-image: url(${this.props.icon ? this.props.icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAMAAACJtiw1AAAAPFBMVEVHcEyZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZk8cDR0AAAAE3RSTlMAc5jT6Ls0BB8P9p/0VNY9K4BSh7ipnQAAAGNJREFUGNN9kUcOwEAIA7f3ksT//2vOdqLlOBIMYJMvw3WjZwJ7IFYiKcAXIsUjJCI1oj1EsgMsuyzgWDabyvZXtn5kw9Kg3AF3AtqiQ/VGXUxW1+NqRJuHB6WAVU5P/sSgQb1TTQUA1OHBAQAAAABJRU5ErkJggg=='});
          background-repeat: no-repeat;
          background-position: right center;
          background-size: auto 16px;
        }
      `}

      ${props => this.props.bgcolor && css`}
        background-color: ${this.props.bgcolor};
      `}

      ${props => this.props.acolor && css`}
        .currentTab a p {
          color: ${this.props.acolor} !important;
        }
      `}
  `
  return (
      <Nav>
        {_data.map((section, index) => {
          return (
            <ul key={index}>
              {section.data.map((item, i) => {
                return (
                  <li key={i}>
                    <a href={item.link}>
                      {item.icon && <span><img src={item.icon} alt={item.title} /></span>}
                      <p>{item.title}</p>
                    </a>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </Nav>
    );
  }
}

export default KListMenu;
