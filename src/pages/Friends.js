import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapper from './Wrapper'
import { KTopbar } from '../libs/keact/Kui'

import { getFriends } from '../modules/user';

class Friends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      me: {
        _id: localStorage.getItem('_id'),
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      },
      users: []
    }
    this.href = this.href.bind(this)
    this.hrefLink = this.hrefLink.bind(this)
  }

  href (link) {
    this.props.history.push(link)
  }

  hrefLink (user) {
    console.log(user)
    this.props.history.push(`/chat/single/${user._id}`)
  }

  componentDidMount () {
    console.log(this.props)
    if (this.props.me && this.props.me._id) {
      this.props.getFriends(this.props.me._id, this.props.me.token, (res) => {
        console.log('请求好友回调：', res)
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="Main Friends">
          <KTopbar bgcolor="#eee" back title="好友列表">
            <span onClick={() => this.href('/find_friend')} className="userIcon usersIcon"><img src="/img/users.png" alt="" /></span>
            <span onClick={() => this.href('/add_friend')} className="userIcon addUserIcon"><img src="/img/adduser.png" alt="" /></span>
          </KTopbar>
          <ul className="userList">
            {this.props.friends.map((user, index) => {
              return (
                <li className="flex-r flex-c-b userItem" key={index} onClick={() => this.hrefLink(user)}>
                  <img src={user.avatar ? user.avatar : '/img/avatar.png'} alt={user.username} />
                  <aside className="flexItem">
                    <p>{user.username}</p>
                  </aside>
                </li>
              )
            })}
          </ul>
        </div>
      </Wrapper>
    );
  }
}


const mapStateToProps = state => ({
  socket: state.msg.socket,
  me: state.user.me,
  friends: state.user.friends
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFriends
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
