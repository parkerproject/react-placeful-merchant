import React, { Component } from 'react'

class Analytics extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
    <div>
      <h3>Analytics</h3>
      <section className='card analytics'>
        <h4 className='text-center p-t-lg'>You don't have enough data yet</h4>
        <p className='text-center p-x-lg'>
          Receive insight into the success of your marketing efforts on Placeful. View the number of impressions and views your business is getting within the app, as well
          as actionable data for your specials. Making it easy to gauge which specials are resonating best with locals in your neighborhood.
        </p>
      </section>
    </div>
    )
  }
}
export default Analytics
