import React, { Component } from 'react'
import Tablehead from './tablehead'
import Moment from 'moment'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Table extends Component {
  constructor (props) {
    super(props)
  }

  pause (deal_id, merchant_id, status) {
    // console.log(deal_id, merchant_id)
    this.props.pausePromo(deal_id, merchant_id, status)
  }

  render () {
    if (!this.props.data) {
      return <div>
               Loading...
             </div>
    }

    let promos = this.props.data.map((promo) => {
      let end_date = Moment(promo.end_date).format('MMMM Do YYYY')
      let start_date = Moment(promo.start_date).format('MMMM Do YYYY')
      let statusClass = promo.status === 'active' ? 'ion-ios-pause' : 'ion-ios-play'
      let status = promo.status === ('active' || null) ? 'paused' : 'active'
      let statusTip = promo.status === ('active' || null) ? 'pause promo' : 'activate promo'
      let approved = promo.approved ? '' : 'label pull-right bg-yellow'
      let approvedText = promo.approved ? '' : 'pending'

      return (
      <tr role='row' className='odd' key={promo._id}>
        <td className='sorting_1'>
          {promo.ticket_id}
        </td>
        <td>
          {promo.title}
        </td>
        <td>
          {start_date}
        </td>
        <td>
          {end_date}
        </td>
        <td>
          <a href={`http://placefulapp.com/promotion/${promo.deal_id}/${promo.slug}`} target='_blank'>View</a>
        </td>
        <td>
          <Link to={`/promotion/edit/${promo.deal_id}`} title='edit promo'>
          <span className='ion-ios-compose-outline'></span>
          </Link>
          <span className={statusClass} title={statusTip} onClick={this.pause.bind(this, promo.deal_id, promo.merchant_id, status)}></span>
          <span className={approved}>{approvedText}</span>
        </td>
      </tr>
      )
    })

    return (
    <table
      id='example1'
      className='table table-bordered table-striped dataTable'
      role='grid'
      aria-describedby='example1_info'>
      <Tablehead />
      <tbody>
        {promos}
      </tbody>
    </table>
    )
  }

}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(Table)
