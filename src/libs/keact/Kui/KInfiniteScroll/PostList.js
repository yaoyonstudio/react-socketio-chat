import React, { Component } from 'react';
import Page from '../../Page'
import PostItem from './PostItem'
import InfiniteScroll from './InfiniteScroll'

const OPTION = {
  url: 'http://localhost:8888/posts',
  method: 'GET',
  page: {
    field: '_page'
  },
  pageSize: {
    field: '_limit',
    value: 6
  },
  params: {
    uid: '9',
    token: 'abcdef'
  }
}

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log(this.props)
  }

  errorHandler (err) {
    console.log(err)
  }

  componentDidMount() {
  }
  
  render() {
    return (
      <Page title="文章列表" router={this.props}>
        <div className="Main">
          <InfiniteScroll item={<PostItem />} option={OPTION} errorHandler={(err) => this.errorHandler(err)} />
        </div>
      </Page>
    );
  }
}

export default PostList;
