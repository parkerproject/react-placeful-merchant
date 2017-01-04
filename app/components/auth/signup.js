import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

const divStyle = {
  marginTop: '15px',
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    // call action creator to sign up user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {this.props.errorMessage}
        </div>
      );
    }

    return '';
  }

  render() {
    const {
      handleSubmit,
      fields: {
        email,
        password,
        referral,
        phone,
        address,
        city,
        zipcode,
        state,
        name } } = this.props;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src="/img/placeful-logo.png" alt="" />
            </div>
          </div>
        </div>
        <form id="register-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="row setup-content">
            <div className="col-xs-6 col-md-offset-3">
              <div className="col-md-12">
                <h3 className="text-center">Business Registration</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="business Name"
                    name="name"
                    {...name}
                  />
                  {name.touched && name.error && <div className="text-danger">
                   {name.error}
                  </div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="business address"
                    name="address"
                    id="address-input"
                    {...address}
                  />
                  {address.touched && address.error && <div className="text-danger">
                       {address.error}
                  </div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    name="city"
                    {...city}
                  />
                  {city.touched && city.error && <div className="text-danger">
                      {city.error}
                  </div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="state"
                    name="state"
                    {...state}
                  />
                  {state.touched && state.error && <div className="text-danger">
                    {state.error}
                  </div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="zipcode"
                    name="zipcode"
                    {...zipcode}
                  />
                  {zipcode.touched && zipcode.error && <div className="text-danger">
                    {zipcode.error}
                  </div>}
                </div>
                <div className="form-group">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="business phone"
                    name="phone"
                    {...phone}
                  />
                  {phone.touched && phone.error && <div className="text-danger">
                    {phone.error}
                  </div>}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Business Email"
                    name="email"
                    {...email}
                  />
                  {email.touched && email.error && <div className="text-danger">
                    {email.error}
                  </div>}
                </div>
                <div className="form-group has-feedback">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    {...password}
                  />
                  {password.touched && password.error && <div className="text-danger">
                    {password.error}
                  </div>}
                </div>
                <div className="form-group has-feedback">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="how did you hear about us?"
                    name="referral"
                    {...referral}
                  />
                </div>
                {this.renderAlert()}
                <button className="btn btn-primary btn-lg red cta" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <p className="text-center" style={divStyle}>
          <Link to="/app/login" className="text-xs-center"> Log in
          </Link>
        </p>
        <hr />
        <footer className="text-center footer">
          © 2016 Placeful, Inc.
        </footer>
      </div>
    );
  }
}

Signup.propTypes = {
  fields: PropTypes.object,
  signupUser: PropTypes.func,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
};


function validate(formProps) {
  const errors = {};
  if (formProps.email === undefined) errors.email = 'Please enter your email';
  if (formProps.password === undefined) errors.password = 'Please enter your password';
  if (formProps.name === undefined) errors.name = 'Please enter your business name';
  if (formProps.address === undefined) errors.address = 'Please enter your business address';
  if (formProps.phone === undefined) errors.phone = 'Please enter your phone number';
  if (formProps.city === undefined) errors.city = 'Please enter your city';
  if (formProps.zipcode === undefined) errors.zipcode = 'Please enter your zipcode';
  if (formProps.state === undefined) errors.state = 'Please enter your state';
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'referral', 'phone', 'address', 'city', 'state', 'zipcode', 'name'],
  validate,
}, mapStateToProps, actions)(Signup);
