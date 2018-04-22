import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ShowToast } from '../libs/keact/Notification'
import { KTopbar } from '../libs/keact/Kui'

import { updatePassword } from '../modules/user';

class ModifyPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      originPwd: '',
      password: '',
      rePassword: ''
    }
    this.changeValue = this.changeValue.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
  }

  changeValue (key, value) {
    this.setState({
      ...this.state,
      [key]: value
    })    
  }

  submit () {
    if (!this.state.originPwd || !this.state.password || !this.state.rePassword || this.state.password !== this.state.rePassword) {
      ShowToast('请输入正确信息', 1500)
      return
    }
    console.log(this.state)
    this.props.updatePassword ({
      ...this.state,
      _id: this.props.me._id,
    }, this.props.me.token, (res) => {
      console.log(res)
      ShowToast(res.msg, 2000)
      if (res.status) {
        this.props.history.push('/login')
      }
    }) 
  }

  render() {
    return (
      <div className="Container">
        <KTopbar back title="修改密码" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main MyInfo ModifyPassword fixedMain withFixedBottom">
          <section className="MyInfo_form">
            <ul>
              <li>
                <label className="flex-r flex-c-b">
                  <span>原密码</span>
                  <aside><input type="password" placeholder="原密码" value={this.state.originPwd} onChange={(e) => this.changeValue('originPwd', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>密码</span>
                  <aside><input type="password" placeholder="密码" value={this.state.password} onChange={(e) => this.changeValue('password', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>重复密码</span>
                  <aside><input type="password" placeholder="重复密码" value={this.state.rePassword} onChange={(e) => this.changeValue('rePassword', e.target.value)} /></aside>
                </label>
              </li>
            </ul>
          </section>
        </div>
        <footer className="fixedBottom">
          <button className="mainBtn" onClick={() => this.submit()}>提交修改</button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user.me
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePassword
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPassword)
