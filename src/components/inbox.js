import React, { Component } from 'react'
import Message from './partials/message'

class Inbox extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
    <div className='col-md-12'>
      <div className='box box-primary'>
        <div className='box-header with-border'>
          <h3 className='box-title'>Inbox</h3>
        </div>
        <div className='box-body no-padding'>
          <div className='mailbox-controls'>
            <span className='ion-ios-trash'></span>
          </div>
          <div className='table-responsive mailbox-messages'>
            <table className='table table-hover table-striped'>
              <tbody>
                <Message />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Inbox
