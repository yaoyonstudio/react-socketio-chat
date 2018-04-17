import React, { Component } from 'react';
import { KTopbar } from '../libs/keact/Kui'
import { ShowToast } from '../libs/keact/Notification'

const socket = window.io.connect('http://localhost:9000')
let connected = false

socket.on('connect', function () {
  socket.emit('login', { username: 'ken', password: '123456' })
});

// 用户连接后客户端接收服务端
socket.on('loged', function (data) {
  console.log('from server:', data)
  connected = true
  ShowToast(data.msg, 1500)
});

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      msg: ''
    }
    this.sendMsg = this.sendMsg.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  componentDidMount () {
    console.log('mounted')
  }

  changeValue (e) {
    this.setState({
      msg: e.target.value
    })
  }

  sendMsg () {
    console.log('send:', this.state.msg)
    socket.emit('sendText', { data: this.state.msg })
  }

  render() {
    return (
      <div className="Container">
        <KTopbar back title="聊天" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main Chat">
          Chat Page
        </div>
        <div className="flex-r flex-c-b ChatInput">
          <aside>
            <img src="/img/plus.png" />
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
