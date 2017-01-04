import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/app/login');
      }

      if (this.props.trial_expired && !this.props.subscriber_user) {
        browserHistory.push('/app/payment');
      }
    }

    componentDidMount() {
      const joinedDate = localStorage.getItem('placeful_joined');
      // const placefulSubscriber = localStorage.getItem('placeful_subscriber');
      let todayDate = new Moment().format('M/D/YYYY');
      todayDate = new Moment(todayDate, 'M/D/YYYY');

      if (this.props.merchant) {
        if (joinedDate && this.props.merchant[0].subscriber !== 'yes') {
          const UpdateJoinedDate = new Moment(joinedDate, 'M/D/YYYY');
          const diffDays = todayDate.diff(UpdateJoinedDate, 'days');
          if (diffDays > 14) {
            browserHistory.push('/app/payment');
          }
        }
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/app/login');
      }
    }


    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      trial_expired: state.subscriber.trial_expired,
      subscriber_user: state.subscriber.subscriber_user,
    };
  }

  Authentication.propTypes = {
    router: PropTypes.object,
    merchant: PropTypes.object,
    authenticated: PropTypes.boolean,
    trial_expired: PropTypes.string,
    subscriber_user: PropTypes.string,
  };

  return connect(mapStateToProps)(Authentication);
}
