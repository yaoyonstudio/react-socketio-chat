import React, { Component } from 'react';

import Page from '../../Page'
import Filters from './Filters'

class FilterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: [
        {
          id: 1,
          title: '地区',
          name: 'zone',
          type: 'select',
          data: [{id:"820305",title:"莞城区"},{id:"820306",title:"南城区"},{id:"820307",title:"东城区"},{id:"820308",title:"茶山镇"},{id:"820309",title:"寮步镇"},{id:"820310",title:"大岭山镇"},{id:"820311",title:"大朗镇"},{id:"820312",title:"松山湖"},{id:"820313",title:"常平镇"},{id:"820314",title:"横沥镇"},{id:"820315",title:"东坑镇"},{id:"820316",title:"石排镇"},{id:"820317",title:"企石镇"},{id:"820318",title:"桥头镇"},{id:"820319",title:"谢岗镇"},{id:"820320",title:"塘厦镇"},{id:"820321",title:"樟木头镇"},{id:"820322",title:"清溪镇"},{id:"820323",title:"黄江镇"},{id:"820324",title:"凤岗镇"},{id:"820325",title:"万江区"},{id:"820326",title:"高埗镇"},{id:"820327",title:"石碣镇"},{id:"820328",title:"石龙镇"},{id:"820329",title:"麻涌镇"},{id:"820330",title:"中堂镇"},{id:"820331",title:"望牛墩镇"},{id:"820332",title:"洪梅镇"},{id:"820333",title:"道滘镇"},{id:"820334",title:"虎门镇"},{id:"820335",title:"厚街镇"},{id:"820336",title:"长安镇（东莞长安新区）"},{id:"820337",title:"沙田镇（虎门港）"}]
        },
        {
          id: 2,
          title: '品类',
          name: 'brand',
          type: 'multiple',
          data: [
            {
              id: 22,
              title: '华为',
              data: [
                {id: 222, title: '荣耀V9'},{id: 223, title: '荣耀8'},{id: 224, title: '荣耀10'},{id: 225, title: '畅享7S'},{id: 226, title: '荣耀P10'}
              ]
            },
            {
              id: 23,
              title: '小米',
              data: [
                {id: 231, title: '小米5'},{id: 232, title: '小米6'},{id: 233, title: '小米5X'},{id: 234, title: '红米5'},{id: 235, title: '小米Note5'}
              ]
            }
          ]
        },
        {
          id: 3,
          title: '价格',
          name: 'price',
          type: 'order'
        },
        {
          id: 4,
          title: '销量',
          name: 'sales',
          type: 'order'
        },
        {
          id: 5,
          title: '筛选',
          name: 'more',
          type: 'more',
          data: [
            {
              id: 51,
              name: 'memory',
              title: '内存',
              data: [
                {id: 511, title: '2G以下'},{id: 512, title: '2G'},{id: 513, title: '3G'},{id: 514, title: '4G'},{id: 515, title: '4G以上'}
              ]
            },
            {
              id: 52,
              name: 'network',
              title: '网络',
              data: [
                {id: 521, title: '2G网络'},{id: 522, title: '3G'},{id: 523, title: '4G'}
              ]
            },
            {
              id: 53,
              name: 'camera',
              title: '摄像头',
              data: [
                {id: 531, title: '500万以下'},{id: 532, title: '500-1000万'},{id: 533, title: '1000-2000万'},{id: 534, title: '2000万以上'}
              ]
            }
          ]
        }
      ],
      conditions: {}
    }
    this.change = this.change.bind(this)
  }

  change (conditions) {
    console.log('最终请求条件：', conditions)
    this.setState({
      conditions: conditions
    })
  }

  render() {
    return (
      <Page title="FilterPage" router={this.props}>
        <div className="Main" style={{'paddingLeft': 0, 'paddingRight': 0, 'paddingTop': 0}}>
          <Filters data={this.state.filters} change={(conditions) => this.change(conditions)} />
          <div>
          </div>
        </div>
      </Page>
    );
  }
}

export default FilterPage;
