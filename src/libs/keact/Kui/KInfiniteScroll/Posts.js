import React, { Component } from 'react';
import axios from 'axios'
import Page from '../../Page'
import PostItem from './PostItem'
import Loading from './Loading'
import Nomore from './Nomore'

const API_URL = 'http://localhost:8888/posts'

// 窗口高度
const WIN_HEIGHT = window.innerHeight
// 距离底端距离多大时触发
const RANGE = 100

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasmore: true,
      loading: false,
      page: 1,
      pageSize: 6,
      posts: []
    }
  }

  componentDidMount() {
    this.loadPost()
    let list = document.querySelector('#list')
    list.addEventListener('scroll', () => {
      this.handleScroll()
    })
  }

  handleScroll () {
    let list = document.querySelector('#list')
    if (list && (WIN_HEIGHT + list.scrollTop > list.scrollHeight - RANGE) && !this.state.loading) {
      this.loadPost()
    }
  }

  loadPost () {
    if (!this.state.hasmore) {
      return false
    }
    this.setState({
      loading: true
    })
    let getUrl = API_URL + '?_start=' + ((this.state.page - 1) * this.state.pageSize) + '&_limit=' + this.state.pageSize
    this.setState({
      page: this.state.page + 1
    })
    axios.get(getUrl)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (res.data.length) {
            this.setState({
              loading: false,
              posts: this.state.posts.concat(res.data)
            })
            if (res.data.length < this.state.pageSize) {
              this.setState({
                hasmore: false
              })
            }
          } else {
            this.setState({
              loading: false,
              hasmore: false
            })
          }
        }
      })
  }
  
  render() {
    return (
      <Page title="文章列表" router={this.props}>
        <div className="Main" id="list">
          {this.state.posts.length
            ? (
              <ul>
                {
                  this.state.posts.map((item, index) => <PostItem key={index} data={item} />)
                }
              </ul>
            )
            : ''
          }
          {this.state.loading ? <Loading /> : ''}
          {(!this.state.loading && !this.state.posts.length) || (this.state.posts.length && !this.state.hasmore) ? <Nomore /> : ''}
        </div>
      </Page>
    );
  }
}

export default Posts;
