import React, { Component } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class SetPassword extends Component {
  constructor (props) {
    super(props)
  }

  handleFormSubmit (formProps) {
    formProps.token = location.search.split('=')[1]
    this.props.setPassword(formProps)
  }

  render () {
    const { handleSubmit, fields: {password} } = this.props
    return (
    <div>
      <h3 className="text-center"><img src='/img/placeful-logo.png' /></h3>
      <form className='sign-box' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <header className='sign-title'>
          New Password
        </header>
        <div className='form-group'>
          <input
            type='text'
            {...password}
            className='form-control'
            type='password'
            placeholder='password' />
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
  form: 'setPassword',
  fields: ['password']
}, mapStateToProps, actions)(SetPassword)
