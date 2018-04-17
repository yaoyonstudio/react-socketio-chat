import React, { PureComponent } from 'react';

class PostItem extends PureComponent {
  render() {
    let data = this.props.data
    if (!data) return ''
    return (
      <li className="PostItem">
        <a>
          <h4>{data.title}</h4>
          {data.thumbnail && data.thumbnail.length
            ? (
              <ul className="thumbnail_imgs">
                {
                  data.thumbnail.map((item, index) => <li key={index}><img src={item} alt="" /></li>)
                }
              </ul>
            )
            : ''
          }
        </a>
      </li>
    );
  }
}

export default PostItem;
