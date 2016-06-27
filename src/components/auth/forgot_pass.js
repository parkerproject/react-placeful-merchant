import React, { Component } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
  }

  handleFormSubmit (email) {
    this.props.resetPassword(email)
  }

  render () {
    const { handleSubmit, fields: {email} } = this.props
    return (
    <div>
      <h3 className="text-center"><img src='/img/placeful-logo.png' /></h3>
      <form className='sign-box' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <header className='sign-title'>
          Reset Password
        </header>
        <div className='form-group'>
          <input
            type='text'
            {...email}
            className='form-control'
            placeholder='E-Mail' />
        </div>
        <button type='submit' className='btn btn-rounded'>
          Submit
        </button>
        <p className='sign-note'>
          <Link to='/signup'> Sign up
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
  form: 'resetPassword',
  fields: ['email']
}, mapStateToProps, actions)(ResetPassword)
