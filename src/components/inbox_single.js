import React, { Component, PropTypes } from 'react'
import find from 'lodash/find'
import Moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SingleMessage extends Component {
  constructor (props) {
    super(props)
    props.readMessage(props.params.id)
  }

static propTypes = {
    merchant: PropTypes.array,
    params: PropTypes.object
}

  render () {
    if (!this.props.merchant) {
      return (
      <div>
        loading...
      </div>
      )
    }

    const message = find(this.props.merchant[0].messages, (o) => {
      return o.message_id == this.props.params.id
    })

    let messageDate = Moment(message.timestamp).format('LL')
    return (
    <div className='col-md-9'>
      <div className='box box-primary'>
        <div className='box-body no-padding'>
          <div className='mailbox-read-info'>
            <h3>{message.subject}</h3>
            <h5>From: <a href='mailto:concierge@placeful.co' className='text-light-blue'>concierge@placeful.co</a> <span className='mailbox-read-time pull-right'>{messageDate}</span></h5>
          </div>
          <div className='mailbox-read-message'>
            <p>
              {message.body}
            </p>
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

export default connect(mapStateToProps, actions)(SingleMessage)
