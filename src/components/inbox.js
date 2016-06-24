import React, { Component, PropTypes } from 'react'
import Message from './partials/message'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Inbox extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    data: PropTypes.string
}

  render () {
    return (
    <div className='col-md-12'>
      <div className='box box-primary'>
        <div className='box-header with-border'>
          <h3 className='box-title'>Messages</h3>
        </div>
        <div className='box-body no-padding'>
          <div className='table-responsive mailbox-messages'>
            <Message data={this.props.merchant} />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(Inbox)
