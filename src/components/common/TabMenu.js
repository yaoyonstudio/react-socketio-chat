import React, { Component } from 'react';
import { KTabs } from '../../libs/keact/Kui'

const tabsData = [
  {id: 1, title: 'Home', icon: 'https://jkxg.tigonetwork.com/img/demo/icon1.png', link: '/'},
  {id: 2, title: 'Chat', icon: 'https://jkxg.tigonetwork.com/img/demo/icon4.png', link: '/friends'}
]

class MyMenu extends Component {
  render() {
    return (
      <KTabs data={tabsData} />
    );
  }
}

export default MyMenu;
