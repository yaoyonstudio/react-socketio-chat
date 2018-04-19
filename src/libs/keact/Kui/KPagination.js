import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KPagination extends Component {
  constructor (props) {
    super(props)
    this.pageItems = []
    this.pageCount = 1
    this.currentPage = 1

    if (this.props.count < this.props.pagesize) {
      this.pageItems.push(1)
      this.pageCount = 1
    } else {
      this.pageCount = Math.ceil(this.props.count / this.props.pagesize)
      if (this.pageCount <= this.props.showpages) {
        for (let i = 0, l = this.pageCount; i < l; i++) {
          this.pageItems.push(i + 1)
        }
      } else {
        for (let i = 0; i < this.props.showpages; i++) {
          this.pageItems.push(i + 1)
        }
      }
    }

    if (this.props.page < 1) {
      this.currentPage = 1
    } else if (this.props.page > this.props.pageCount) {
      this.currentPage = this.pageCount
    } else {
      this.currentPage = this.props.page
    }
  }

  render() {
    
    const prev = () => {
      if (this.props.page <= 1) {
        return
      } else {
        this.props.href(this.props.page - 1)
      }
    }
    
    const next = () => {
      if (this.props.page === this.pageCount) {
        return
      } else {
        this.props.href(this.props.page + 1)
      }
    }

    const Div = styled.div`
      ul {
        text-align: center;
      }

      li {
        list-style: none;
        margin: 0;
        padding: 0;
        background-color: #fff;
        display: inline-block;
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        margin: 0 4px;
        font-size: 16px;
        color: #333;
        border-radius: 4px;
        cursor: pointer;
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: #333;
      }

      .prev, .next {
        font-size: 12px;
        width: auto;
        padding: 0 10px;
        min-width: 32px;
      }

      .current {
        background-color: #d33;
        a {
          color: #fff;
        }
      }

      .disabled {
        background-color: #eee;
        color: #999;
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
        <ul>
          <li onClick={() => prev()} page={this.currentPage === 1 ? '' : this.currentPage - 1} className={'prev ' + (this.currentPage === 1 ? 'disabled' : '')}>{this.props.prev ? this.props.prev : ' < '}</li>
          {this.pageItems.map((item, index) => {
            return (
              <li key={index} className={this.props.page === item ? 'current' : ''}><a page={item} onClick={this.props.href}>{item}</a></li>
            )
          })}
          <li onClick={() => next()} page={this.currentPage === this.pageCount ? '' : this.currentPage + 1} className={'next ' + (this.currentPage === this.pageCount ? 'disabled' : '')}>{this.props.next ? this.props.next : ' > '}</li>
        </ul>
      </Div>
    );
  }
}

export default KPagination;
