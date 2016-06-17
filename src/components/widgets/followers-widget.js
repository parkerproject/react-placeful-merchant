import React from 'react'

const TotalFollowers = (props) => {
  let length = ''
  if (props.data != null) {
    length = props.data.length
  }
  // props.message.promos.length
  return (
  <div className='col-lg-3 col-xs-6'>
    <div className='info-box'>
      <span className='info-box-icon bg-yellow'><i className='ion ion-ios-people-outline'></i></span>
      <div className='info-box-content'>
        <span className='info-box-text'>Followers</span>
        <span className='info-box-number'>{length}</span>
      </div>
    </div>
  </div>
  )
}

export default TotalFollowers
