import React, { Component, PropTypes } from 'react';
import find from 'lodash/find';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../actions';


class SingleMessage extends Component {
  constructor(props) {
    super(props);
    props.readMessage(props.params.id);
  }


  render() {
    if (!this.props.merchant) {
      return (
        <div>
          loading...
        </div>
      );
    }

    const message = find(this.props.merchant[0].messages, (o) => o.message_id === this.props.params.id);

    const messageDate = moment(message.timestamp).format('LL');
    return (
    <div className="col-md-9">
      <div className="box-typical box-typical-padding">
        <div className="box-body no-padding">
          <div className="mailbox-read-info">
            <h4 className="m-t-lg with-border m-b-0">{message.subject}</h4>
            <span>From: <a href="mailto:concierge@placeful.co">concierge@placeful.co</a> <small className="pull-right">{messageDate}</small></span>
          </div>
            <p className="p-t-md">
              {message.body}
            </p>
        </div>
      </div>
    </div>
    );
  }
}


SingleMessage.propTypes = {
  merchant: PropTypes.array,
  params: PropTypes.object,
  readMessage: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(SingleMessage);
