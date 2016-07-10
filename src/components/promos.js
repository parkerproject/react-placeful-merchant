import React, { Component, PropTypes, Modal } from 'react'
import Table from './partials/table'
import { Link, browserHistory } from 'react-router'
import Moment from 'moment'

class Promos extends Component {
  static PropTypes = {
    merchant: PropTypes.array,
    promos: PropTypes.array
  }

  constructor (props) {
    super(props)
  }


  render () {
    return (
    <div className='box'>
      <div className='box-header'>
        <Link to='/app/promo/new' className='btn btn-success'> Add new Special
        </Link>
      </div>
      <div className='box-body overview'>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='box'>
              <div className='box-body'>
                <div id='example1_wrapper' className='dataTables_wrapper form-inline dt-bootstrap'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <Table data={this.props.promos} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

}

export default Promos
