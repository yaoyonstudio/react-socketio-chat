import React, { Component } from 'react';
import { KTopbar } from '../libs/keact/Kui'
// import { ShowToast } from '../libs/keact/Notification'
import { userService } from '../Services'

let socket = null

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chatType: '',           // single | group
      msg: '',
      messages: [],
      me: {
        _id: localStorage.getItem('_id'),
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        avatar: localStorage.getItem('avatar')
      },
      friend: {}
    }
    this.sendMsg = this.sendMsg.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  getUser (id) {
    userService.getUser(id, (res) => {
      if (res.status) {
        this.setState({
          friend: res.data
        })
      }
    })
  }

  componentDidMount () {
    this.setState({
      chatType: this.props.match.params.type
    })

    if (!this.state.me.username || !this.state.me.password) {
      this.props.history.push('/login')
      return
    }

    // 获取朋友的信息
    this.getUser(this.props.match.params.id)

    // 连接socket服务器
    socket = window.io.connect('http://localhost:9000')

    // 用户登录
    socket.on('connect', () => {
      socket.emit('login', { username: this.state.me.username, password: this.state.me.password })
    });

    // 用户连接后客户端接收服务端
    // 用户登录成功
    socket.on('loged', (data) => {
      console.log(`${this.state.me.username} 用户登录成功`)
    });
    // 用户登录失败
    socket.on('logfail', function (data) {
      console.log('用户登录失败:', data)
    });

    // 接收文本信息
    socket.on('receiveTextMsg', (data) => {
      console.log('接收到文本信息：', data)
      let _messages = this.state.messages
      _messages.push(data)
      this.setState({
        messages: _messages
      })
    })
  }

  changeValue (e) {
    this.setState({
      msg: e.target.value
    })
  }

  sendMsg () {
    console.log('send:', this.state.msg)

    let _msg = {
      data: this.state.msg,
      type: 'text',
      fromUser: this.state.me._id.toString(),
      from: this.state.me.username,
      toUser: this.state.friend._id.toString(),
      to: this.state.friend.username
    }

    // 发送文本消息
    socket.emit('sendText', _msg)

    let _messages = this.state.messages
    _messages.push(_msg)
    this.setState({
      msg: '',
      messages: _messages
    })
  }

  render() {
    return (
      <div className="Container">
        <KTopbar back title="聊天" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main Chat">
          <ul>
            {this.state.messages.map((item, index) => {
              return (
                <li key={index}>
                  <div className={'flex-r msgItem ' + (item.from === this.state.friend.username ? 'flex-s-s friend' : ' ') + (item.from === this.state.me.username ? 'flex-s-e me' : '')}>
                    {item.from === this.state.friend.username && <img className="avatar" src={this.state.friend.avatar} alt={this.state.friend.username} />}
                    <p>{item.data}</p>
                    {item.from === this.state.me.username && <img className="avatar" src={this.state.me.avatar} alt={this.state.me.username} />}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex-r flex-c-b ChatInput">
          <aside>
            <img src="/img/plus.png" alt="添加图片" />
            <input type="file" id="file" name="file" />
          </aside>
          <input className="flexItem" type="text" value={this.state.msg} onChange={(e) => this.changeValue(e)} />
          <button onClick={() => this.sendMsg()}>发送</button>
        </div>
      </div>
    );
  }
}

export default Chat;
