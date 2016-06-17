import React, { Component } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Login extends Component {
  handleFormSubmit({email, password}) {
    this.props.loginUser({email, password})
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
      <div className='alert alert-danger'>
        <strong>Oops!</strong>
        {this.props.errorMessage}
      </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: {email, password} } = this.props
    return (
    <div className='login-box'>
      <div className='login-logo clearfix'>
        <a></a>
      </div>
      <div className='login-box-body'>
        <h4 className='login-box-msg'><p className='lead'> Login to Merchant Area </p></h4>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <span className='text-danger'></span>
          <div className='form-group has-feedback'>
            <input {...email} className='form-control' placeholder='Email' />
            <span className='glyphicon glyphicon-envelope form-control-feedback'></span>
          </div>
          <div className='form-group has-feedback'>
            <input
              {...password}
              type='password'
              className='form-control'
              placeholder='Password' />
            <span className='glyphicon glyphicon-lock form-control-feedback'></span>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              {this.renderAlert()}
              <button type='submit' className='btn btn-primary btn-block btn-flat red'>
                Log In
              </button>
            </div>
          </div>
        </form>
        <br />
        <p className='text-center'>
          <Link to='/register' className='text-xs-center'> Register as a merchant
          </Link>
        </p>
        <p className='text-center'>
          <Link to='/forgotpass' className='text-xs-center'> I forgot my password
          </Link>
        </p>
      </div>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {errorMessage: state.auth.error}
}

// reduxForm works like maptoprops
export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Login)
