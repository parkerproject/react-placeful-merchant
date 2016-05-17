import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Register extends Component {
  render() {
    return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <img src='/images/Placeful-logo-black.png' alt='' className='logo-img' />
          </div>
        </div>
      </div>
      <form id='register-form'>
        <div className='row setup-content'>
          <div className='col-xs-6 col-md-offset-3'>
            <div className='col-md-12'>
              <h3>Business Information</h3>
              <div className='form-group'>
                <label className='control-label'>
                  Business Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Business Name'
                  name='business_name'
                  id='txtPlaces' />
              </div>
              <div className='form-group has-feedback'>
                <label>
                  Business Address
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your business address'
                  name='business_address' />
              </div>
              <div className='form-group has-feedback'>
                <label>
                  Business Phone
                </label>
                <input
                  type='phone'
                  className='form-control'
                  placeholder='Enter your business phone'
                  name='business_phone' />
              </div>
              <div className='form-group has-feedback'>
                <label>
                  Business Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Business Email'
                  name='business_email' />
              </div>
              <div className='form-group has-feedback'>
                <label>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  name='password' />
              </div>
              <div className='form-group has-feedback'>
                <label>
                  How did you hear about us?
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Give us a name'
                  name='referral' />
              </div>
              <button className='btn btn-primary btn-lg red cta' type='submit'>
                Submit
              </button>
            </div>
          </div>
        </div>
        <input type='hidden' name='business_place' />
        <input type='hidden' name='business_lng' />
        <input type='hidden' name='business_lat' />
        <input type='hidden' name='business_map' />
        <input type='hidden' name='business_icon' />
        <input type='hidden' name='business_locality' />
        <input type='hidden' name='website' />
      </form>
      <p className='text-center' style={divStyle}>
        <Link to='/login' className='text-xs-center'> Log in
        </Link>
      </p>
      <hr />
      <footer className='text-center footer'>
        © 2016 Placeful, Inc.
      </footer>
    </div>
    )
  }
}

const divStyle = {
  marginTop: '15px'
}
