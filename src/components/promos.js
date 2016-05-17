import React, { Component } from 'react'

class Promos extends Component {
  render() {
    return (
    <div className='box'>
      <div className='box-header with-border'>
        <h4>Create new promo</h4>
        <button>
          Add new promo
        </button>
      </div>
      <div className='box-body overview'>
        <div className='row'>
          <div className='col-md-8'>
            <p>
              We give you complete creative freedom so you can maintain your brand identity with every promo.
            </p>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Promos
