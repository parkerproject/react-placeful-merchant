import React, { Component } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Login extends Component {
  handleFormSubmit ({email, password}) {
    this.props.loginUser({email, password})
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
      <div className='alert alert-danger'>
        <strong>Oops!</strong>
        {this.props.errorMessage}
      </div>
      )
    }
  }

  render () {
    const { handleSubmit, fields: {email, password} } = this.props
    return (
    <div>
      <h3 className="text-center"><img src='/img/placeful-logo.png' /></h3>
      <form className='sign-box' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className='sign-avatar'>
          <img src='/img/avatar-sign.png' />
        </div>
        <header className='sign-title'>
          Sign In
        </header>
        <div className='form-group'>
          <input
            type='text'
            {...email}
            className='form-control'
            placeholder='E-Mail' />
        </div>
        <div className='form-group'>
          <input
            type='password'
            {...password}
            className='form-control'
            placeholder='Password' />
        </div>
        <div className='form-group'>
          <div className='float-right reset'>
            <Link to='/app/forgotpass'> Reset Password
            </Link>
          </div>
        </div>
        {this.renderAlert()}
        <button type='submit' className='btn btn-rounded'>
          Sign in
        </button>
        <p className='sign-note'>
          <Link to='/app/signup'> Sign up
          </Link>
        </p>
      </form>
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
