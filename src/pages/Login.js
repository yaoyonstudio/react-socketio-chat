import React, { Component } from 'react';
import { userService } from '../Services'
import { ShowToast } from '../libs/keact/Notification'

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
    console.log('register', this.state.username, ',', this.state.password)
  }

  login (e) {
    e.preventDefault();
    console.log('login', this.state.username, ',', this.state.password)

    userService.login({
      username: this.state.username,
      password: this.state.password
    }, (res) => {
      ShowToast(res.msg, 1500)
      if (res.status) {
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('password', res.data.password)
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('id', res.data.id)
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
      </div>
    );
  }
}

export default Login;
