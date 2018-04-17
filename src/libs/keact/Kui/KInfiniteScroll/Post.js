import React, { Component } from 'react';

import axios from 'axios'
import Page from '../../Page'

const API_URL = 'http://localhost:8888/posts'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    console.log(this)
  }

  componentDidMount() {
    axios.get(API_URL + '/' + this.props.match.params.id)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.setState({
            data: res.data
          })
        }
      })
  }

  render() {
    return (
      <Page title={this.state.data.title} router={this.props.router}>
        <div className="Main Post">
          <header className="Post_header">
            <h2>{this.state.data.title}</h2>
            <p>{this.state.data.author}  {this.state.data.date}<span>{this.state.data.hits}浏览</span></p>
          </header>
          <div className="Post_featured">
            {this.state.data.featured_img
              ? <img src={this.state.data.featured_img} alt={this.state.data.title} />
              : ''
            }
          </div>
          <section className="Post_content" dangerouslySetInnerHTML={{__html: this.state.data.content}}></section>
        </div>
      </Page>
    );
  }
}

export default Post;
