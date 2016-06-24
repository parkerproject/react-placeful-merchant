import React from 'react'

const FollowersPromoteMessage = () => {
  return (
  <div className='container-fluid'>
    <div className='box-typical box-typical-full-height' style={innerStyle.minHeight}>
      <div className='add-customers-screen tbl' style={innerStyle.height}>
        <div className='add-customers-screen-in'>
          <div className='add-customers-screen-user'>
            <i className='fa fa-users'></i>
          </div>
          <h2>Your need at least <mark> 100 followers </mark> to use this feature</h2>
          <p className='lead color-blue-grey-lighter'>
            Ask your customers to follow your place on <a href='http://placefulapp.com/' target='_blank'>Placeful app</a>.
          </p>
          <a href='mailto:concierge@placeful.co?subject=sticker+materials' className='btn'>Request sticker & other materials</a>
        </div>
      </div>
    </div>
  </div>
  )
}

const innerStyle = {
  height: {
    height: '134px'
  },
  minHeight: {
    minHeight: '134px'
  }
}

export default FollowersPromoteMessage
