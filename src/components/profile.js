import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../actions'
import Dropzone from 'react-dropzone'

class Profile extends Component {
  static PropTypes = {
    merchant: PropTypes.string
  }

  constructor(props){
    super(props)
    this.state = {file: ''}
  }

  handleImageChange (filesToUpload) {
    let reader = new FileReader()
    let file = filesToUpload[0]

    reader.onloadend = () => {
      //photoImage
      this.setState({
        file: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  handleFormSubmit (formProps) {
    let body = new FormData()
    Object.keys(formProps).forEach((key) => {
      if (formProps[key] != null) {
        if (formProps[key] instanceof FileList) {
          body.append(key, formProps[key][0], formProps[key][0].name)
        } else {
          body.append(key, formProps[key])
        }
      }
    })
    body.append('business_id', this.props.merchant[0].business_id)
    this.props.editProfile(body)
  }

  render () {
    if(!this.props.merchant){
      return <div>loading...</div>
    }
    const {handleSubmit, fields: {business_name, business_phone, description, files }} = this.props
    return (
    <div className='box'>
      <div className='box-header with-border'>
        <h4 className='lead'>Edit your profile</h4>
      </div>
      <div className='box-body'>
        <div className='row'>
          <div className='col-md-8'>
            <form role='form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className='form-group'>
                <label>
                  Business name
                </label>
                <input type='text' className='form-control' {...business_name} defaultValue={this.props.merchant[0].business_name} />
              </div>
              <div className='form-group'>
                <label>
                  Business phone
                </label>
                <input type='text' className='form-control' {...business_phone} defaultValue={this.props.merchant[0].business_phone} />
              </div>
              <div className='form-group'>
                <label>
                  About you
                </label>
                <textarea type='text' className='form-control' {...description} defaultValue={this.props.merchant[0].description} />
              </div>
              <div className='form-group'>
                <div className='row'>
                   <div className='col-md-4'>
                       <p><img src={this.props.merchant[0].business_icon} alt='' /></p>
                   </div>
                   <div className='col-md-4'>
                     <Dropzone {...files} className='photo-upload' onDrop={filesToUpload => this.handleImageChange(filesToUpload)}>
                       Change photo
                     </Dropzone>
                   </div>
                   <div className='col-md-4'>
                     <img src={this.state.file} alt='' width='200'/>
                   </div>
                </div>
              </div>
              <button className='btn btn-success form-control' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error
  }
}

function validate (formProps) {
  const errors = {}
  return errors
}

export default reduxForm({
  form: 'Profile',
  fields: ['business_name', 'business_phone', 'description', 'files'],
  validate: validate
}, mapStateToProps, actions)(Profile)
