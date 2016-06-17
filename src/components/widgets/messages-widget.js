import React from 'react'

const Messages = (props) => {
  // let length = ''
  // if (props.data != null) {
  //   length = props.data.length
  // }
  return (
  <div className='col-lg-3 col-xs-6'>
    <div className='info-box bg-aqua'>
      <span className='info-box-icon'><i className='ion-ios-chatbubble-outline'></i></span>
      <div className='info-box-content'>
        <span className='info-box-text'>Messages</span>
        <span className='info-box-number'>0</span>
      </div>
    </div>
  </div>
  )
}

export default Messages
