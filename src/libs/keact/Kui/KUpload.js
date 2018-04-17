import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KUpload extends Component {
  render() {
    const Div = styled.div`
      background-color: #eee;
      border: 1px solid #ddd;
      border-radius: 5px;
      color: #666;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      text-align: center;
      img {
        height: 20px;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
      }

      ${props => this.props.width && css`}
        width: ${this.props.width}
      `}

      ${props => this.props.bdcolor && css`}
        border-color: ${this.props.bdcolor}
      `}

      ${props => this.props.height && css`}
        height: ${this.props.height}
      `}

      ${props => this.props.bgcolor && css`}
        background-color: ${this.props.bgcolor}
      `}

      ${props => this.props.color && css`}
        color: ${this.props.color}
      `}

    `
    return (
      <Div>
        <img src={this.props.icon ? this.props.icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAANlBMVEVHcExQUFBQUFBQUFBQUFBQUFBQUFBRUVFQUFBQUFBQUFBQUFBQUFBRUVFQUFBQUFBQUFBRUVEAVjWnAAAAEXRSTlMAf5rQ8DBgwEC/IOAQsHBQbzu3rZkAAAIgSURBVHja7dprc6wgDAZgCYiIt+X//9mecbpbV5TlEsJpJ/nY6fo+gqJGu46Lq6Rmo03LfKOcc7Jvlq/dXqpvm99M8MpvJDjkNxG85TcQnPLJBV4+seAin1RwmU8ouMknE9zmEwkC+SSCYD6B4EN+dcHH/MqCiPyqgqj8ioLI/GqC6PxKgoT8KoKk/AqCxHx0QXI+siAjH1WQlY8oyMxHE2TnIwkK8lEERfkIgsL8YkFxfqEAIb9IYJxrK5hwAG7JzO8dVv1WANoUDLmArfVB2AkUgC5YCPp18EoGsqT334u26N3JAICkbcoABjCAAQxgAAMYwAAGMIABDGAAA0IAktfntkI3Cqt3tdAAbudA2Y5IcD0GhR+VGQFjsNbjcWD8Ou6+CG8KHp7Vjp/bfTNmjxXet9ariH4fRAPGiK1NbwIZ1XG0CCvF9SmzxrU8ZdwkRA3nv9p+frI4REFsvhMZbfGIvnN0/rGJntB5hvAgWMjq4ic138X9KPSQsqVMwH4sjMKvMfX9RgEA/UUKAxjAgL8JkLCclqZpAUkGUJv35nO/+m2KCPD9jATe1dfQAMC70k/PvwAJ4HULPXh3YCsJYPP29zUmmgQgvNtdSTsFz6e0zRsUq2jOArkLzOEGUe0nhpVUC5EC/TjdocFDC8XXgkuAag0YmgAg+dkQuQ5f18xT2xlA+24uZ6l6PlRJ6v0/NxvmFQa6At1xcXFx/Tf1BfgEsK/c+YYMAAAAAElFTkSuQmCC'} alt="upload" />
        <p>{this.props.text ? this.props.text : '选择文件'}</p>
      </Div>
    );
  }
}

export default KUpload;
