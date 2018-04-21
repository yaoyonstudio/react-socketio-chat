import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../modules/user';
import { initSocketConnection, socketLogin, getHistoryMsg, pushMsg, concatMsgs } from '../modules/msg';
import { KTopbar } from '../libs/keact/Kui'
// import { ShowToast } from '../libs/keact/Notification'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chatType: '',           // single | group
      msg: '',
    }
    this.sendMsg = this.sendMsg.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentDidMount () {
    console.log('componentDidMount', this.props)


    this.setState({
      chatType: this.props.match.params.type
    })

    if (!this.props.me.username || !this.props.me.token) {
      this.props.history.push('/login')
      return
    }

    // 获取朋友的信息
    if (this.props.match.params.id) {
      this.props.getUser(this.props.match.params.id)
    }

    // 连接socket服务器
    // socket = window.io.connect(socketUrl)

    // 用户登录
    // socket.on('connect', () => {
    //   socket.emit('login', { username: this.state.me.username, password: this.state.me.password })
    // });

    // 用户连接后客户端接收服务端
    // 用户登录成功
    // socket.on('loged', (data) => {
    //   console.log(`${this.state.me.username} 用户登录成功`)
    // });
    // 用户登录失败
    // socket.on('logfail', function (data) {
    //   console.log('用户登录失败:', data)
    // });

    if (this.props.socket) {
      // 接收文本信息
      this.props.socket.on('receiveTextMsg', (data) => {
        console.log('接收到文本信息：', data)
        this.props.pushMsg(this.props.friend._id, data)
      })

      // 接收未读信息
      this.props.socket.on('unreadMsg', (data) => {
        this.props.concatMsgs(this.props.friend._id, data)
      })
    } else {
      console.log('socket连接丢失, 重连')
      this.props.initSocketConnection((socket) => {
        socket.on('receiveTextMsg', (data) => {
          console.log('接收到文本信息：', data)
          this.props.pushMsg(this.props.friend._id, data)
        })

        // 接收未读信息
        socket.on('unreadMsg', (data) => {
          this.props.concatMsgs(this.props.friend._id, data)
        })
      })
      this.props.socketLogin(this.props.me.username, this.props.me.password)
    }

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
      fromUser: this.props.me._id.toString(),
      from: this.props.me.username,
      toUser: this.props.friend._id.toString(),
      to: this.props.friend.username
    }

    // 发送文本消息
    this.props.socket.emit('sendText', _msg)

    if (this.props.friend._id) {
      this.props.pushMsg(this.props.friend._id, _msg)
    }
    this.setState({
      msg: ''
    })
  }

  render() {
    return (
      <div className="Container">
        <KTopbar back title="聊天" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main Chat">
          <ul>
            {this.props.currentSessionMsgs.map((item, index) => {
              return (
                <li key={index}>
                  <div className={'flex-r msgItem ' + (item.from === this.props.friend.username ? 'flex-s-s friend' : ' ') + (item.from === this.props.me.username ? 'flex-s-e me' : '')}>
                    {item.from === this.props.friend.username && <img className="avatar" src={this.props.friend.avatar} alt={this.props.friend.username} />}
                    <p>{item.data}</p>
                    {item.from === this.props.me.username && <img className="avatar" src={this.props.me.avatar} alt={this.props.me.username} />}
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

const mapStateToProps = state => ({
  socket: state.msg.socket,
  me: state.user.me,
  friend: state.user.friend,
  keys: state.msg.key,
  msgs: state.msg.msgs,
  currentSessionMsgs: state.msg.currentSessionMsgs
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initSocketConnection,
      socketLogin,
      getUser,
      getHistoryMsg,
      pushMsg,
      concatMsgs
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
