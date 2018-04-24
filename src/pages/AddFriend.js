import React, { Component } from 'react';
import { KTopbar } from '../libs/keact/Kui'

class AddFriend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: ''
    }
    this.changeValue = this.changeValue.bind(this)
    this.submit = this.submit.bind(this)
  }

  changeValue (e) {
    this.setState({
      keyword: e.target.value
    })
  }

  submit (e) {
    console.log(this.state.keyword)
  }

  render() {
    return (
      <div className="Container">
        <KTopbar back title="添加好友" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main AddFriend fixedMain">
          <header className="searchHeader">
            <label className="flex-r flex-c-b">
              <input onChange={(e) => this.changeValue(e)} className="flexItem" type="text" value={this.state.keyword} placeholder="请输入搜索关键词" />
              <button onClick={(e) => this.submit(e)}>搜索</button>
            </label>
          </header>
        </div>
      </div>
    );
  }
}

export default AddFriend;
