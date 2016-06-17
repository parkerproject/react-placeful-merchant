import React, { Component } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
  handleFormSubmit(formProps) {
    // call action creator to sign up user
    this.props.signupUser(formProps)
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
    const {handleSubmit, fields: {email, password, referral, phone, address, city, zipcode, state, name}} = this.props
    return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <img src='/images/Placeful-logo-black.png' alt='' className='logo-img' />
          </div>
        </div>
      </div>
      <form id='register-form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className='row setup-content'>
          <div className='col-xs-6 col-md-offset-3'>
            <div className='col-md-12'>
              <h3>Business Registration</h3>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='business Name'
                  name='name'
                  id='txtPlaces'
                  {...name} />
                {name.touched && name.error && <div className='error'>
                                                 {name.error}
                                               </div>}
              </div>
              <div className='form-group'>
                <div className='pull-left address'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Business address'
                    name='address'
                    {...address} />
                  {address.touched && address.error && <div className='error'>
                                                         {address.error}
                                                       </div>}
                </div>
                <div className='pull-right state'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='City'
                    name='address'
                    {...city} />
                  {city.touched && city.error && <div className='error'>
                                                   {city.error}
                                                 </div>}
                </div>
              </div>
              <div className='form-group'>
                <div className='pull-left zip-state'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Zipcode'
                    name='city'
                    {...zipcode} />
                  {zipcode.touched && zipcode.error && <div className='error'>
                                                         {zipcode.error}
                                                       </div>}
                </div>
                <div className='pull-right zip-state'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='State'
                    name='state'
                    {...state} />
                  {state.touched && state.error && <div className='error'>
                                                     {state.error}
                                                   </div>}
                </div>
              </div>
              <div className='form-group'>
                <input
                  type='phone'
                  className='form-control'
                  placeholder='Enter your business phone'
                  name='phone'
                  {...phone} />
                {phone.touched && phone.error && <div className='error'>
                                                   {phone.error}
                                                 </div>}
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  placeholder='Business Email'
                  name='email'
                  {...email} />
                {email.touched && email.error && <div className='error'>
                                                   {email.error}
                                                 </div>}
              </div>
              <div className='form-group has-feedback'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  name='password'
                  {...password}/>
                {password.touched && password.error && <div className='error'>
                                                         {password.error}
                                                       </div>}
              </div>
              <div className='form-group has-feedback'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Give us a name'
                  name='referral'
                  {...referral} />
              </div>
              {this.renderAlert()}
              <button className='btn btn-primary btn-lg red cta' type='submit'>
                Submit
              </button>
            </div>
          </div>
        </div>
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

function validate (formProps) {
  const errors = {}
  if (!formProps.email) errors.email = 'Please enter your email'
  if (!formProps.password) errors.password = 'Please enter your password'
  if (!formProps.name) errors.name = 'Please enter your business name'
  if (!formProps.address) errors.address = 'Please enter your business address'
  if (!formProps.phone) errors.phone = 'Please enter your phone number'
  if (!formProps.city) errors.city = 'Please enter your city'
  if (!formProps.state) errors.state = 'Please enter your state'
  if (!formProps.zipcode) errors.zipcode = 'Please enter your zipcode'
  return errors
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'referral', 'phone', 'address', 'state', 'city', 'zipcode', 'name'],
  validate: validate
}, mapStateToProps, actions)(Signup)
