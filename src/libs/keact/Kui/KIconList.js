import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KIconList extends Component {
  render() {
    const Div = styled.div`
      ul {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 12px;
        background-color: #fff;
      }

      li {
        list-style: none;
        flex: 1;
        margin: 12px 0;
      }

      a {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #666;
        font-size: 14px;
      }

      img {
        height: 40px;
        max-width: 64px;
        margin: 0 auto;
        margin-bottom: 7px;
      }

      p {
        font-size: 14px;
        display: block;
        width: 100%;
        text-align: center;
      }

      ${props => this.props.column && css`}
        ul {
          flex-wrap: wrap;
        }
        li {
          flex: none;
          flex-basis: ${1 / this.props.column * 100}%
        }
      `}
  `
  return (
      <Div>
        <ul>
          {this.props.data.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.link}>
                  <img src={item.icon} alt={item.title} />
                  <p>{item.title}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </Div>
    );
  }
}

export default KIconList;
