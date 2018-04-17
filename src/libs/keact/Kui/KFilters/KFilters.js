import React, { Component } from 'react';
import './filters.css';

class FilterModal extends Component {
  render() {
    return (
      <div className="moreModal" onClick={(e) => this.props.close(e)}>
        <aside className="moreModal_main" onClick={e => e.stopPropagation()}>
          <ul className="moreModal_list">
            {this.props.data.length
              ? this.props.data.map((item, index) => (
                  <li key={index} className="moreModal_item">
                    <h4>{item.title}</h4>
                    <ul className="moreModal_subList">
                      {item.data.length
                        ? item.data.map((subItem, i) => <li onClick={() => this.props.selectSubItem(item.name, subItem)} className="moreModal_subItem" key={i}>{subItem.title}</li>)
                        : ''
                      }
                    </ul>
                  </li>
                )
              )
              : ''          
            }
          </ul>
        </aside>
      </div>
    )
  }
}

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelectData: [],
      currentMultipleSelectData: [],
      currentMultipleSelectSubData: [],
      moreSelectData: [],
      showMoreModal: false,
      currentName: '',
      currentOrder: '',
      conditions: {}
    }
    console.log(this.props.data)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.selectItem = this.selectItem.bind(this)
    this.selectSubItem = this.selectSubItem.bind(this)
    this.selectItemCate = this.selectItemCate.bind(this)
    this.closeMoreModal = this.closeMoreModal.bind(this)
  }

  init () {
    this.setState({
      currentName: '',
      currentSelectData: [],
      currentMultipleSelectData: [],
      currentMultipleSelectSubData: [],
    })
  }

  toggleSelect (item) {
    console.log('选择类型：', item)
    // 如果点击同一个，则收起原展开的，如果点击类型是more，则每次都打开
    if (this.state.currentName && this.state.currentName === item.name && (item.type === 'select' || item.type === 'multiple')) {
      this.init()
      return false
    }
    this.init()
    this.setState({
      currentName: item.name
    })
    switch(item.type) {
      case 'select':
        this.setState({
          currentSelectData: item.data
        })
        break
      case 'multiple':
        this.setState({
          currentMultipleSelectData: item.data,
          currentMultipleSelectSubData: item.data[0].data
        })
        break
      case 'order':
        let _orderValue = this.state.conditions[item.name] === 1 ? 2 : 1
        this.setCondition(item.name, _orderValue)
        console.log('已选条件：', this.state.conditions)
        break
      case 'more':
        // 打开modal
        this.setState({
          showMoreModal: true,
          moreSelectData: item.data
        })
        break
      default:
        break
    }
  }

  selectItemCate (item) {
    this.setState({
      currentMultipleSelectSubData: item.data
    })
  }

  selectItem (item) {
    this.init()
    this.setCondition(this.state.currentName, item.id)
    console.log('选择项：', item)
    console.log('已选条件：', this.state.conditions)
  }

  selectSubItem (name, item) {
    console.log('选择项：', item)
    console.log('选择项name：', name)
    console.log('已选条件：', this.state.conditions)
    // let _conditions = this.state.conditions
    // _conditions[name] = item.id
    this.setState({
      showMoreModal: false,
      // conditions: _conditions
    })
    this.setCondition(name, item.id)
  }

  setCondition (name, value) {
    let _conditions = this.state.conditions
    _conditions[name] = value
    this.setState({
      conditions: _conditions
    }, () => {
      this.props.change(this.state.conditions)
    })
  }

  closeMoreModal (e) {
    e.stopPropagation()
    this.setState({
      showMoreModal: false
    })
  }

  render() {
    return (
      <div className="Filters">
        {this.props.data && this.props.data.length
          ? (
            <ul className="Filters_container">
              {this.props.data.map((item, index) => (
                <li onClick={() => this.toggleSelect(item)} className="Filters_item" key={index}>
                  <span>{item.title}</span>
                  {item.type === 'select'
                    ? (
                      <span className="Filters_item_icon Filters_item_icon_select">
                        <i className={this.state.currentSelectData.length ? 'select active' : 'select'}></i>
                      </span>
                      )
                    : ''
                  }
                  {item.type === 'multiple'
                    ? (
                      <span className="Filters_item_icon Filters_item_icon_select">
                        <i className={this.state.currentMultipleSelectData.length ? 'select active' : 'select'}></i>
                      </span>
                      )
                    : ''
                  }
                  {item.type === 'order'
                    ? (
                      <span className="Filters_item_icon Filters_item_icon_order">
                        <i className={this.state.conditions[item.name] === 1 ? 'order_up active_up' : 'order_up'}></i>
                        <i className={this.state.conditions[item.name] === 2 ? 'order_down active_down' : 'order_down'}></i>
                      </span>
                      )
                    : ''
                  }
                  {item.type === 'more'
                    ? (
                      <span className="Filters_item_icon Filters_item_icon_more">
                        <i></i>
                      </span>
                      )
                    : ''
                  }
                </li>
              ))}
            </ul>
          )
          : ''
        }
        {this.state.currentSelectData.length
          ? (
            <section className="selectContainer">
              <ul>
                {this.state.currentSelectData.map((item, index) => <li onClick={() => this.selectItem(item)} className="subItem" key={index}>{item.title}</li>)}
              </ul>
            </section>
          )
          : ''
        }
        {this.state.currentMultipleSelectData.length
          ? (
            <section className="currentMultipleSelectData">
              <aside className="currentMultipleSelectData_left">
                <ul>
                  {this.state.currentMultipleSelectData.map((item, index) => <li onClick={() => this.selectItemCate(item)} className="subItem" key={index}>{item.title}</li>)}
                </ul>
              </aside>
              <ul className="currentMultipleSelectData_right">
                {this.state.currentMultipleSelectSubData.length
                  ? this.state.currentMultipleSelectSubData.map((item, index) => <li onClick={() => this.selectItem(item)} className="subItem" key={index}>{item.title}</li>)
                  : ''
                }
              </ul>
            </section>
          )
          : ''
        }
        {this.state.showMoreModal && <FilterModal data={this.state.moreSelectData} selectSubItem={(name, item) => this.selectSubItem(name, item)}  close={(e) => this.closeMoreModal(e)} />}
        
      </div>
    );
  }
}


export default Filters;
