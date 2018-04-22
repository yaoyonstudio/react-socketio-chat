/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import IosSelect from 'iosselect'
import styled, { css } from 'styled-components';

const now = new Date()
const nowYear = now.getFullYear()

const formatYear = (nowYear) => {
  var arr = [];
  for (var i = nowYear - 50; i <= nowYear - 10; i++) {
      arr.push({
          id: i + '',
          value: i + '年'
      });
  }
  return arr;
}

const formatMonth = () => {
  var arr = [];
  for (var i = 1; i <= 12; i++) {
      arr.push({
          id: i + '',
          value: i + '月'
      });
  }
  return arr;
}

const formatDate = (count) => {
  var arr = [];
  for (var i = 1; i <= count; i++) {
      arr.push({
          id: i + '',
          value: i + '日'
      });
  }
  return arr;
}

const yearData = (callback) => {
  callback(formatYear(nowYear))
}
const monthData = (year, callback) => {
  callback(formatMonth());
}
const dateData = (year, month, callback) => {
  if (/^(1|3|5|7|8|10|12)$/.test(month)) {
    callback(formatDate(31));
  }
  else if (/^(4|6|9|11)$/.test(month)) {
    callback(formatDate(30));
  }
  else if (/^2$/.test(month)) {
    if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
      callback(formatDate(29));
    }
    else {
      callback(formatDate(28));
    }
  }
  else {
    throw new Error('month is illegal');
  }
};


class KDateSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateStr: ''
    }
    this.selectDate = this.selectDate.bind(this)
  }

  selectDate () {
    new IosSelect(3, 
      [yearData, monthData, dateData],
      {
        title: '日期选择',
        itemHeight: 35,
        oneLevelId: this.props.date.year.id,
        twoLevelId: this.props.date.month.id,
        threeLevelId: this.props.date.day.id,
        showLoading: true,
        callback: (selectOneObj, selectTwoObj, selectThreeObj) => {
          // console.log('year:', selectOneObj)
          // console.log('month:', selectTwoObj)
          // console.log('day:', selectThreeObj)
          // this.setState({
          //   ...this.state,
          //   dateStr: selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value
          // })
          this.props.select(selectOneObj, selectTwoObj, selectThreeObj, this.props.field)
        }
    })
  }

  componentDidMount() {
    // console.log(this.props)
    // if (this.props.date.year.value && this.props.date.month.value && this.props.date.day.value) {
    //   console.log('ee')
    //   this.setState({
    //     address: this.props.date.year.value + this.props.date.month.value + this.props.date.day.value
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
      <Div onClick={() => this.selectDate()}>
        <input type="text" value={this.props.dateStr} readOnly placeholder={this.props.placeholder ? this.props.placeholder : '请选择日期'} />
      </Div>
    );
  }
}

export default KDateSelect;
