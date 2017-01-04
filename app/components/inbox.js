import React, { PropTypes } from 'react';
import Message from './partials/message';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Inbox = (props) => (
  <div className="col-md-12">
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Messages</h3>
      </div>
      <div className="box-body no-padding">
        <div className="table-responsive mailbox-messages">
          <Message data={props.merchant} />
        </div>
      </div>
    </div>
  </div>
);


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

Inbox.propTypes = {
  data: PropTypes.string,
  merchant: PropTypes.array,
};

export default connect(mapStateToProps, actions)(Inbox);
