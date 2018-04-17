import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Swiper from 'react-id-swiper';
import './style/swiper.css';

class KSwiper extends Component {
  render() {
    const Div = styled.div`
      overflow: hidden;
      height: 100%;
      .slideItem {
        img {
          width: 100%;
          display: block;
        }
      }

      ${props => this.props.height && css`
        height: ${this.props.height};
      `}

      ${props => this.props.config.direction && this.props.config.direction === 'vertical' && css`}
        .swiper-container-vertical {
          height: 100%;
        }
      `}

    `
    return (
      <Div>
        <Swiper {...this.props.config}>
          {this.props.data.map((item, index) => {
            return (
              <div className="slideItem" key={index}><img src={item.slide_img} alt={item.slide_title} /></div>
            )
          })}
        </Swiper>
      </Div>
    );
  }
}

export default KSwiper;
