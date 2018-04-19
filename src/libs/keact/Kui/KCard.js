import React, { Component } from 'react';
import styled from 'styled-components';

class KCard extends Component {
  render() {
    const Div = styled.div`
      img {
        display: block;
      }
      header {
        img {
          width: 100%;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
      }
      article {
        padding: 16px;
        border: 1px solid #ddd;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        background-color: #fff;
        box-shadow: 0 1px 3px #ccc;
      }

      section {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 12px;
        aside {
          flex: 1;
        }
        img {
          width: 48px;
          height: 48px;
          margin-right: 10px;
        }
        h4 {
          font-size: 18px;
          color: #333;
        }
        h5 {
          color: #999;
          font-size: 14px;
        }
      }
      p {
        font-size: 14px;
        color: #666;
        line-height: 20px;
      }

    `
    return (
      <Div>
        <header>
          <img src={this.props.data.thumb} alt={this.props.data.title} />
        </header>
        <article>
          <section>
            <img src={this.props.data.avatar} alt={this.props.data.author} />
            <aside>
              <h4>{this.props.data.author}</h4>
              <h5>{this.props.data.wechat}</h5>
            </aside>
          </section>
          <p>{this.props.data.excerpt}</p>
        </article>
      </Div>
    );
  }
}

export default KCard;
