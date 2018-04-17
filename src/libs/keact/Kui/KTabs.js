import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

class KTabs extends Component {
  render() {
    const Nav = styled.nav`
      background-color: #000;
      position: fixed;
      left: 0;
      bottom: 0;
        
      ul {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-conent: space-between;
        height: 50px;
        padding: 0 8px;
      }

      li {
        list-style: none;
        flex: 1;
      }

      a {
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-decoration: none;
      }

      p {
        margin: 0;
        padding: 0;
        font-size: 12px;
      }

      img {
        height: 22px;
        margin-bottom: 2px;
      }

      .currentTab img {
        filter: grayscale(0);
      }

      ${props => this.props.current && css`}
        img {
          filter: grayscale(100%);
        }
      `}

      ${props => this.props.color && css`}
        p {
          color: ${this.props.color}
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
        <ul>
          {this.props.data.map((item, index) => {
            return (
              <li key={index} className={this.props.current && this.props.current === item.link ? 'currentTab' : ''}>
                <Link to={item.link}>
                  {item.icon && <img src={item.icon} alt={item.title} />}
                  <p>{item.title}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </Nav>
    );
  }
}

export default KTabs;
