import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment'
import { browserHistory } from 'react-router'

export default function(ComposedComponent) {
  class Authentication extends Component {
    static PropTypes = {
      router: PropTypes.object
    }

    constructor(props){
      super(props)
    }

    componentWillMount() {

      if (!this.props.authenticated) {
        this.context.router.push('/app/login')
      }

      if (this.props.trial_expired && !this.props.subscriber_user) {
         browserHistory.push('/app/payment')
      }

    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/app/login');
      }
    }

   componentDidMount(){

     let joined_date = localStorage.getItem('placeful_joined')
     let placeful_subscriber = localStorage.getItem('placeful_subscriber')
     let todayDate = new Moment().format('M/D/YYYY')
     todayDate = new Moment(todayDate, 'M/D/YYYY')

     if(this.props.merchant){
       if(joined_date && this.props.merchant[0].subscriber !== 'yes'){
         let joinedDate = new Moment(joined_date, 'M/D/YYYY')
         let diffDays = todayDate.diff(joinedDate, 'days')
         if (diffDays > 14) {
           browserHistory.push('/app/payment')
         }
       }
     }
   }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      trial_expired: state.subscriber.trial_expired,
      subscriber_user: state.subscriber.subscriber_user
    }
  }

  return connect(mapStateToProps)(Authentication);
}
