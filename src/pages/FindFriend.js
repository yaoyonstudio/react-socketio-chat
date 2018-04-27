import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KTopbar } from '../libs/keact/Kui'
import Cards, { Card } from 'react-swipe-card'

import { getUsers } from '../modules/user';


class FindFriend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  getUser () {
    this.props.getUsers(this.props.me.token, res => {
      console.log(this.props.strangers)
    })
  }

  action (type) {
    console.log('type:', type)
  }

  componentDidMount () {
    console.log(this.props)
    this.getUser()
  }
  
  render() {
    console.log(this.props.strangers)
    return (
      <div className="Container">
        <KTopbar back title="猿粪" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main AddFriend">
          <section>
            {this.props.strangers.map((item, index) => <p>dfdsf</p>)}
            {/* <Cards onEnd={() => this.action('end')} className='master-root'>
              {this.props.strangers.map((item, index) => 
                <Card
                  onSwipeLeft={() => this.action('swipe left')} 
                  onSwipeRight={() => this.action('swipe right')}
                  key={index}>
                  <h3>{item.username}</h3>
                </Card>
              )}
            </Cards> */}
          </section>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  me: state.user.me,
  strangers: state.user.strangers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FindFriend);
