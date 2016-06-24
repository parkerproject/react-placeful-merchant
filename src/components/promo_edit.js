import React, { Component, propTypes } from 'react'
import Dropzone from 'react-dropzone'
import { reduxForm } from 'redux-form'
import * as actions from '../actions'

class EditPromo extends Component {

  constructor (props) {
    super(props)
    this.state = {file: '', display: 'show', preview: 'hide', buttonText: 'Submit'}
  }

  handleFormSubmit (formProps) {
    let business_id = document.querySelector('.business_id').value
    let deal_id = document.querySelector('.deal_id').value
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
    body.append('deal_id', deal_id)
    body.append('business_id', business_id)
    this.setState({buttonText: 'Processing...'})
    this.props.editPromo(body)
  }

  handleImageChange (filesToUpload) {
    let reader = new FileReader()
    let file = filesToUpload[0]

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        display: 'hide',
        preview: 'show'
      })
    }

    reader.readAsDataURL(file)
  }

  render () {
    if (!this.props.promos) {
      return (
      <div className='overlay'>
        <i className='fa fa-refresh fa-spin'></i>
      </div>
      )
    }
    const {handleSubmit, fields: {title, description, fine_print, files }} = this.props
    let promo = this.props.promos.filter(deal => deal.deal_id == this.props.params.id)

    return (
    <div className='box-typical box-typical-padding'>
      <h4 className='m-t-lg with-border'>Edit promo</h4>
      <div className='box-body'>
        <div className='row'>
          <div className='col-md-8'>
            <form role='form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className='form-group'>
                <label>
                  Promo (100-character limit)
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  {...title}
                  defaultValue={promo[0].title} />
              </div>
              <div className='form-group'>
                <label>
                  Description
                </label>
                <textarea
                  className='form-control'
                  rows='3'
                  name='description'
                  {...description}
                  defaultValue={promo[0].description} />
              </div>
              <div className='form-group'>
                <label>
                  The fine print
                </label>
                <textarea
                  className='form-control'
                  rows='3'
                  name='fine_print'
                  {...fine_print}
                  defaultValue={promo[0].fine_print} />
              </div>
              <div className='form-group'>
                <div className='file-upload'>
                  <Dropzone className='file-upload__input' {...files} onDrop={filesToUpload => this.handleImageChange(filesToUpload)} />
                </div>
                <img src={promo[0].large_image} width='200' className={this.state.display} />
                <img src={this.state.file} width='200' className={this.state.preview} />
              </div>
              <button className='btn btn-success form-control' type='submit'>
                {this.state.buttonText}
              </button>
              <input type='hidden' className='deal_id' defaultValue={promo[0].deal_id} />
              <input type='hidden' className='business_id' defaultValue={promo[0].merchant_id} />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

function validate (formProps) {
  const errors = {}
  if (formProps.title === '') errors.title = 'Please enter your promo'
  if (formProps.description === '') errors.description = 'Please enter your description'
  if (formProps.fine_print === '') errors.fine_print = 'Please enter your fine_print'
  return errors
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'EditPromo',
  fields: ['title', 'description', 'fine_print', 'files'],
  validate: validate
}, mapStateToProps, actions)(EditPromo)
