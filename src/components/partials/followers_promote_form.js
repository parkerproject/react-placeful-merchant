import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class FollowersPromoteForm extends Component {
  constructor (props) {
    super(props)
  }

  handleFormSubmit (formProps) {
    let body = new FormData()
    Object.keys(formProps).forEach((key) => {
      if (formProps[key] != null) {
        body.append(key, formProps[key])
      }
    })
    body.append('business_id', this.props.merchant[0].business_id)
    this.props.promoteToFollowers(body)
  }

  render () {
    const {handleSubmit, fields: {title, description }} = this.props
    return (
    <div className='box-typical box-typical-full-height' style={innerStyle.minHeight}>
      <h4 className='m-t-lg with-border text-center'>Promote to followers <br /> <small><mark> This is an exclusive special only for your followers </mark></small></h4>
      <div className='add-customers-screen tbl' style={innerStyle.height}>
        <div className='add-customers-screen-in'>
          <div className='add-customers-screen-user'>
            <i className='fa fa-users'></i>
          </div>
          <form role='form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className='form-group'>
              <label className='font-weight-bold'>
                Title (100-character limit)
              </label>
              <p>
                <span>Think of this as the tagline, the first thing your followers will see in their notification inbox</span>
              </p>
              <input
                type='text'
                className='form-control'
                {...title}
                placeholder='promo title' />
              {title.touched && title.error && <div className='bg-danger'>
                                                 {title.error}
                                               </div>}
            </div>
            <div className='form-group'>
              <label className='font-weight-bold'>
                Description
              </label>
              <p>
                <span>Describe the special in detail and any fine print</span>
              </p>
              <textarea className='form-control' {...description} placeholder='description' />
            </div>
            <button className='btn btn-success form-control' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    )
  }

}

const innerStyle = {
  height: {
    height: '134px'
  },
  minHeight: {
    minHeight: '134px'
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error
  }
}

function validate (formProps) {
  const errors = {}
  if (formProps['title'] == null) errors['title'] = 'Title is required'
  return errors
}

export default reduxForm({
  form: 'FollowersPromoteForm',
  fields: ['title', 'description'],
  validate: validate
}, mapStateToProps, actions)(FollowersPromoteForm)
