import React, { Component } from 'react';
import IosSelect from 'iosselect'
import styled, { css } from 'styled-components';
import { iosProvinces, iosCitys, iosCountys } from './data/areaData_v2'

class KZoneSelect extends Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   address: ''
    // }
    this.selectZone = this.selectZone.bind(this)
  }

  selectZone () {
    new IosSelect(3, 
      [iosProvinces, iosCitys, iosCountys],
      {
        title: '地址选择',
        itemHeight: 35,
        relation: [1, 1],
        oneLevelId: this.props.zone.province.id,
        twoLevelId: this.props.zone.city.id,
        threeLevelId: this.props.zone.district.id,
        callback: (selectOneObj, selectTwoObj, selectThreeObj) => {
          // console.log('province:', selectOneObj)
          // console.log('city:', selectTwoObj)
          // console.log('district:', selectThreeObj)
          // this.setState({
          //   ...this.state,
          //   address: selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value
          // })
          this.props.select(selectOneObj, selectTwoObj, selectThreeObj, this.props.field)
        }
    })
  }

  componentDidMount() {
    // if (this.props.zone.province.value && this.props.zone.city.value && this.props.zone.district.value) {
    //   this.setState({
    //     address: this.props.zone.province.value + this.props.zone.city.value + this.props.zone.district.value
    //   })
    // }
  }
  render() {
    const Div = styled.div`
      color: #d33;
      background-color: #fff;
      cursor: pointer;
      display: block;
      height: 44px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      padding: 0 !important;
      input[type=text] {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        text-align: right;
        padding: 0 .1rem;
        color: #333;
      }

      ${props => this.props.height && css`}
        height: ${this.props.height};
      `}

      ${props => this.props.bgcolor && css`}
        background-color: ${this.props.bgcolor};
      `}
      ${props => this.props.color && css`}
        color: ${this.props.color} !important;
        input {
          color: ${this.props.color} !important;
        }
      `}
    `
    return (
      <Div id="KZoneSelectInput" onClick={() => this.selectZone()}>
        <input type="text" value={this.props.zoneStr} readOnly placeholder={this.props.placeholder ? this.props.placeholder : '请选择区域'} />
      </Div>
    );
  }
}

export default KZoneSelect;
