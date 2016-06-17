import React from 'react'

const TotalPromos = (props) => {
  let length = ''
  if (props.data != null) {
    length = props.data.length
  }
  // props.message.promos.length
  return (
  <div className='col-lg-3 col-xs-6'>
    <div className='info-box'>
      <span className='info-box-icon bg-green'><i className='ion ion-ios-pricetags-outline'></i></span>
      <div className='info-box-content'>
        <span className='info-box-text'>Total Promos</span>
        <span className='info-box-number'>{length}</span>
      </div>
    </div>
  </div>
  )
}

export default TotalPromos
