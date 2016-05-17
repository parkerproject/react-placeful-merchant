import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ForgotPass extends Component {
  render() {
    return (
    <div className='login-box'>
      <p className='text-center'>
        <img src='/images/Placeful-logo-black.png' alt='' className='logo-img' />
      </p>
      <div className='login-box-body'>
        <h4 className='login-box-msg'><strong>Reset Password</strong></h4>
        <form action='' method=''>
          <span className='text-danger'></span>
          <div className='form-group has-feedback'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              name='email' />
            <span className='glyphicon glyphicon-envelope form-control-feedback'></span>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <button type='submit' className='btn btn-primary btn-block btn-flat red'>
                Submit
              </button>
            </div>
          </div>
        </form>
        <br/>
        <p className='text-center'>
          <Link to='/register'> Register as a Merchant
          </Link>
        </p>
      </div>
    </div>
    )
  }
}
