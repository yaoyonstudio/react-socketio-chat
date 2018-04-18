import React, { Component } from 'react';
import Wrapper from './Wrapper'
import { userService } from '../Services'

class Friends extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
    this.hrefLink = this.hrefLink.bind(this)
  }

  hrefLink (user) {
    console.log(this.props)
    this.props.history.push(`/chat/single/${user.id}`)
  }

  componentDidMount () {
    this.getUserList()
  }

  getUserList () {
    userService.getUsers((res) => {
      console.log(res)
      if (res.status && res.data) {
        this.setState({
          users: res.data
        })
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <div className="Main Home">
          <ul className="userList">
            {this.state.users.map((user, index) => {
              return (
                <li className="flex-r flex-c-b userItem" key={index} onClick={() => this.hrefLink(user)}>
                  <img src={user.avatar} alt={user.username} />
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
