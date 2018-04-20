import React, { Component } from 'react';
import Wrapper from './Wrapper'
import { userService } from '../Services'
import { KTopbar } from '../libs/keact/Kui'

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
    this.hrefLink = this.hrefLink.bind(this)
  }

  hrefLink (user) {
    console.log(this.props)
    this.props.history.push(`/chat/single/${user._id}`)
  }

  componentDidMount () {
    this.getUserList()
  }

  getUserList () {
    if (this.state.me._id) {
      userService.getFriends({user_id: this.state.me._id}, (res) => {
        console.log(res)
        if (res.status && res.data) {
          this.setState({
            users: res.data
          })
        }
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="Main Friends">
          <KTopbar bgcolor="#eee" back title="好友列表">
            <span className="userIcon usersIcon"><img src="/img/users.png" alt="" /></span>
            <span className="userIcon addUserIcon"><img src="/img/adduser.png" alt="" /></span>
          </KTopbar>
          <ul className="userList">
            {this.state.users.map((user, index) => {
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

export default Friends;
