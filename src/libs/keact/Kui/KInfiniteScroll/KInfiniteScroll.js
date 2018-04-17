/**
 * 无限滚动加载组件
 *
 * @param    {react element}    item       渲染元素
 * @param    {object}           option     参数
 * @param    option : {
 *             url: 'http://localhost:8888/posts',
 *             method: 'GET',
 *             page: {
 *               field: '_page'
 *             },
 *             pageSize: {
 *               field: '_limit',
 *               value: 6
 *             },
 *             params: {
 *               uid: '9',
 *               token: 'abcdef'
 *             }
 *           }
 * 参数：
 * url: 必传
 * method只能传GET和POST，默认GET
 * page不传，page字段默认为page
 * pageSize不传默认字段为pageSize，数量为10，pageSize可以只传一个数字，表示数量，此时字段为默认字段pageSize
 * params为除page和pageSize外的额外参数，method为GET时将拼接到网址查询参数中，method为POST时将作为data参数传递
 * @returns  React Element
 * @author   ken
*/
import React, { Component } from 'react';
// import PropTypes from '../Basic/Props';
import PropTypes from 'prop-types';
import axios from 'axios'
import Loading from './Loading'
import Nomore from './Nomore'
import Item from './Item'


// 窗口高度
const WIN_HEIGHT = window.innerHeight
// 距离底端距离多大时触发
const RANGE = 60

export default class InfiniteScroll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: this.props.option.url || '',
      methods: this.props.option.method || 'GET',
      params: this.getParams(),
      page: 1,
      pageSize: this.getPagesize(),
      data: [],
      hasmore: true,
      loading: false
    }
  }

  componentDidMount () {
    this.load()
    let list = document.querySelector('#InfiniteScroll')
    list.addEventListener('scroll', () => {
      this.handleScroll()
    })
  }

  getParams () {
    if (!this.props.option.params || this.props.option.method.toUpperCase() !== 'POST') return null
    let _params = {}
    Object.assign(_params, this.props.option.params, {
      [this.getPagesizeField()]: this.getPagesize()
    })
    return _params
  }

  getPageField () {
    return this.props.option.page && this.props.option.page.field ? this.props.option.page.field : 'page'
  }

  getPagesizeField () {
    let _pagesizeField = 'pageSize'
    if (this.props.option.pageSize) {
      if (this.props.option.pageSize.constructor === Object && this.props.option.pageSize.field) {
        _pagesizeField = this.props.option.pageSize.field
      }
    }
    return _pagesizeField
  }

  getPagesize () {
    if (!this.props.option.pageSize) return 10
    if (this.props.option.pageSize.constructor === Object) {
      return this.props.option.pageSize.value || 10
    } else if (typeof this.props.option.pageSize === 'number') {
      return this.props.option.pageSize
    } else {
      return 10
    }
  }

  getAPI () {
    let _API_URL = this.props.option.url
    let _pageField = this.getPageField()
    let _pagesizeField = this.getPagesizeField()

    if (this.props.option.method.toUpperCase() === 'GET') {
      if (!this.props.option.params || JSON.stringify(this.props.option.params) === '{}') {
        _API_URL += '?' + _pageField + '=' + this.state.page + '&' + _pagesizeField + '=' + this.state.pageSize
      } else {
        let params = ''
        for (let key in this.props.option.params) {
          params += key + '=' + this.props.option.params[key] + '&'
        }
        _API_URL += '?' + params + _pageField + '=' + this.state.page + '&' + _pagesizeField + '=' + this.state.pageSize
      } 
    }
    return _API_URL
  }

  load () {
    let API_URL = this.getAPI()
    this.setState({
      loading: true
    })
    axios({
      method: this.state.methods,
      url: API_URL,
      data: this.state.params
    }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        if (res.data.results.length) {
          this.setState({
            loading: false,
            page: this.state.page + 1,
            data: this.state.data.concat(res.data.results)
          })
          if (res.data.length < this.state.pageSize) {
            this.setState({
              hasmore: false
            })
          }
        } else {
          this.setState({
            loading: false,
            hasmore: false
          })
        }
      }
    }, (err) => {
      console.log(err)
      if(this.props.errorHandler && typeof this.props.errorHandler === 'function') {
        this.props.errorHandler(err)
      }
    })
  }

  handleScroll () {
    if (this.state.hasmore) {
      let list = document.querySelector('#InfiniteScroll')
      if (list && (WIN_HEIGHT + list.scrollTop > list.scrollHeight - RANGE) && !this.state.loading) {
        this.load()
      }
    }
  }

  render() {
    return (
      <div className="InfiniteScroll" id="InfiniteScroll" style={{'height': '100%', 'overflowY': 'auto'}}>
        {this.state.data.length
            ? (
              <ul>
                {
                  this.state.data.map((item, index) => {
                    return <Item key={index} data={item}>{this.props.item}</Item>
                  })
                }
              </ul>
            )
            : ''
          }
        {this.state.loading ? <Loading /> : ''}
        {(!this.state.loading && !this.state.data.length) || (this.state.data.length && !this.state.hasmore) ? <Nomore /> : ''}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  item: PropTypes.element.isRequired,
  option: PropTypes.shape({
    url: PropTypes.string.isRequired,
    method: PropTypes.string,
    page: PropTypes.shape({
      field: PropTypes.string
    }),
    pageSize: PropTypes.oneOfType([
      PropTypes.shape({
        field: PropTypes.string,
        value: PropTypes.number
      }),
      PropTypes.number,
    ]),
    params: PropTypes.object
  }).isRequired,
  errorHandler: PropTypes.func
}