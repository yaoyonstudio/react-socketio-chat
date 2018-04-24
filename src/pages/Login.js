import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ShowToast } from '../libs/keact/Notification'
import { KFixedBtn } from '../libs/keact/Kui'
import { getCurLocation } from '../libs/keact/qqMap'

import { login, register } from '../modules/user';
import { initSocketConnection, socketLogin } from '../modules/msg';

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'register',
      current: '',
      username: '',
      password: ''
    }
    this.changeType = this.changeType.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.changeCurrent = this.changeCurrent.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount () {
    console.log(this.props)
    getCurLocation(res => {
      console.log(res)
    })
  }

  changeType (type) {
    this.setState({
      type: type
    })
  }

  changeValue (type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  changeCurrent (type) {
    this.setState({
      current: type
    })
  }

  register (e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      ShowToast('用户名和密码不能为空', 1500)
      return
    }
    this.props.register(this.state.username, this.state.password, (res) => {
      ShowToast(res.msg, 1500)
    })
  }

  login (e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      ShowToast('用户名和密码不能为空', 1500)
      return
    }
    this.props.login(this.state.username, this.state.password, (res) => {
      ShowToast(res.msg, 1500)
      if (res.status) {
        this.props.initSocketConnection()
        this.props.socketLogin(this.state.username, this.state.password)
        this.props.socket.on('loged', (data) => {
          console.log(`${this.state.username} 用户登录成功`)
        });
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div className="Login">
        <div className="form">
          <ul className="tab-group">
            <li onClick={() => this.changeType('register')} className={'tab ' + (this.state.type === 'register' ? 'active' : '')}><a>注册</a></li>
            <li onClick={() => this.changeType('login')} className={'tab ' + (this.state.type === 'login' ? 'active' : '')}><a>登录</a></li>
          </ul>
          <div className="tab-content">
            <div>   
              <form>
                <div className="field-wrap">
                  <label className={(this.state.username ? 'active' : '') + ' ' +  (this.state.current === 'username' ? 'highlight' : '')}>
                    用户<span className="req">*</span>
                  </label>
                  <input onFocus={() => this.changeCurrent('username')} onChange={(e) => this.changeValue('username', e)} type="text" required autoComplete="off" />
                </div>
                <div className="field-wrap">
                  <label className={(this.state.password ? 'active' : '') + ' ' +  (this.state.current === 'password' ? 'highlight' : '')}>
                    密码<span className="req">*</span>
                  </label>
                  <input onFocus={() => this.changeCurrent('password')} onChange={(e) => this.changeValue('password', e)} type="password"required autoComplete="off"/>
                </div>
                {this.state.type === 'register' && <button onClick={(e) => this.register(e)} disabled={!this.state.username || !this.state.password} className={'button button-block ' + ((!this.state.username || !this.state.password) ? 'disabled' : '')}>注册</button>}
                {this.state.type === 'login' && <button onClick={(e) => this.login(e)} disabled={!this.state.username || !this.state.password} className={'button button-block ' + ((!this.state.username || !this.state.password) ? 'disabled' : '')}>登录</button>}
              </form>
            </div>
          </div>
        </div>
        <KFixedBtn bottom="100px" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.msg.socket
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      register,
      initSocketConnection,
      socketLogin
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
