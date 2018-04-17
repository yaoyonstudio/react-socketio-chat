import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class KListItem extends Component {
  render() {
    const Div = styled.div`
      padding: 0 10px;
      background-color: #fff;
      a {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid #ddd;
      }
      section {
        margin-right: 10px;
        max-width: 30%;
        height: 92px;
      }
      img {
        display: block;
        width: 100%;
      }

      aside {
        flex: 1;
        width: 100%;
        height: 92px;
        min-height: 72px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
      }

      h4 {
        font-weight: 500;
        color: #333;
        font-size: 16px;
        display: -webkit-box;
        width: 100%;
        max-height: 40px;
        line-height: 18px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow : hidden;
        text-overflow: ellipsis;
      }

      p {
        font-size: 12px;
        color: #999;
        display: -webkit-box;
        width: 100%;
        height: 32px;
        line-height: 16px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow : hidden;
        text-overflow: ellipsis;
        margin-bottom: 4px;
        margin-top: 4px;
      }

      footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      span {
        display: block;
        color: #999;
        font-size: 12px;
        background-repeat: no-repeat;
        background-position: 0;
        padding-left: 18px;
        line-height: 20px;
      }


      .views {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAATCAMAAADGSv/FAAAAdVBMVEVHcEyZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkEiVqnAAAAJnRSTlMAOOid3A4K+PL9hhoD2Vtx0GpB14yk7bZXTxXKKFRGux1g0nsukMXRO+AAAADuSURBVCjPfVLbloMwCEQThVij1rtttdXtzv9/4j4k6tHdLS+BmUCADNFq6ZQ8tQBiu2RK6Wyv7xaAVEVhBUBYXw50VDNEDR68jErAdbzzgUZ4jQ8ZeYvqvUY9Q0XOfc/Zw19R4MG5V3Dvaz8BoLu5KGOTOV4Cn6Rxz/M7Kv9ayWYm6jeeEigiSht8eaAUDKTNypPliIjoZooVKc1CWLbWRbszDDdI8+cKk1lOPaTHHhjDYQr7awo3p/l7D7PnicZ9k49s22SzbZIosJ//giiuGaJG/5uvsWFwEp/0EAIQ+48evKI62xrT2i4pd0X9ACFfFGSUvnopAAAAAElFTkSuQmCC);
        background-size: 16px auto;
        background-position: 0px 5px;
      }
      .comments {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAUCAMAAABRYFY8AAAATlBMVEWZmZmZmZmZmZmZmZmZmZmZmZmZmZlHcEyZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlaQlKRAAAAGXRSTlOQ9xPE8bCXAHAwvjlkqR6veYgITUss0gXgotwIvQAAAH1JREFUGNO10DkOwzAMRFFKIjlavGed+180RQDDsFUmv3zNEJTNA88F38SZ5FylS0i4VoNQOi78rQ+qI5Lqvak+D34zWyBm7WHmf9jteJg7bkFGes454jXkPecosZJkmdLx0TUKMJWVq3IpexMgAJDJdzstf32O6PiQLxd9AFWBEI5XS01KAAAAAElFTkSuQmCC);
        background-size: 14px auto;
        background-position: 0px 5px;
      }
      .date {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAUCAMAAABRYFY8AAAATlBMVEWZmZmZmZmZmZmZmZmZmZmZmZmZmZlHcEyZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlaQlKRAAAAGXRSTlNwvvKygNGgAOCQyDjqXoVDrvgGmKYMTiJ1D3A6pwAAAHdJREFUGNPdkDcWwzAMQ6FCkWquabz/RSPZnqKcwH8AHv/AAeCDtJ/NMZ0Nfk8hzGJq6FQnOYSYGdkWoirmQx3v5EVU1hlET2YWc/1x0mIzCTr1M/jL43GkQg1GluatjNjmI4/4+/qS/vjFAuqG2aJGMER/WfftC3d1D00hsIu+AAAAAElFTkSuQmCC);
        background-size: 13px auto;
        background-position: 0px 4px;
      }

      ${props => this.props.reverse && css`}
        a {
          flex-direction: row-reverse;
        }
        section {
          margin-left: 10px;
          margin-right: 0;
        }
      `}

      ${props => this.props.noborder && css`}
        a {
          border: none;
        }
      `}

      ${props => this.props.borderRadius && css`}
        img {
          border-radius: ${this.props.borderRadius}
        }
      `}
    `
    return (
      <Div>
        <a>
          {this.props.data.thumb &&<section>
            <img src={this.props.data.thumb} alt={this.props.data.title} />
          </section>
          }
          <aside>
            <h4>{this.props.data.title}</h4>
            {this.props.data.excerpt && <p>{this.props.data.excerpt}</p>}
            {(this.props.data.views || this.props.data.comments || this.props.data.date) && <footer>
              {this.props.data.views && <span className="views">{this.props.data.views}</span>}
              {this.props.data.comments && <span className="comments">{this.props.data.comments}</span>}
              {this.props.data.date && <span className="date">{this.props.data.date}</span>}
            </footer>
            }
          </aside>
        </a>
      </Div>
    );
  }
}

export default KListItem;
