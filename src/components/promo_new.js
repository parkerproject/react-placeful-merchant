import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Select2 from 'react-select2-wrapper'
import { reduxForm } from 'redux-form'
import * as actions from '../actions'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import { DateTimePicker } from 'react-widgets'
import { DropdownList } from 'react-widgets'

momentLocalizer(Moment)

class PostNewPromo extends Component {

  constructor (props) {
    super(props)
    this.state = {tags: ['Food', 'Drinks', 'Beauty', 'Events', 'Fitness', 'Comedy', 'Culture', 'Party', 'Music', 'Fashion', 'Afterwork', 'Wellness', 'Trendy', 'Datenight', 'Club', 'Outdoors'],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      categories: ['Food & Drinks', 'Health & Beauty', 'Events & Activities', 'Shopping'],
      cities: ['All New York',
        'Astoria',
        'Brooklyn',
        'Chelsea',
        'East Village',
        'Financial District',
        'Flatiron',
        'Gramercy',
        'Greenwich Village',
        'Harlem',
        "Hell's Kitchen",
        'Kips Bay',
        'Lower East Side',
        'Meatpacking District',
        'Midtown East',
        'Midtown West',
        'Murray Hill',
        'NoHo',
        'Nolita',
        'Park Slope',
        'Queens',
        'SoHo',
        'Theater District',
        'TriBeCa',
        'Union Square',
        'Upper East Side',
        'Upper West Side',
        'West Village',
        'Williamsburg'],

      value0: null, value1: null, file: '', preview: 'hide', timevalue0: null, timevalue1: null

    }
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
    this.props.createPromo(body)
  }

  handleImageChange (filesToUpload) {
    let reader = new FileReader()
    let file = filesToUpload[0]

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        preview: 'show'
      })
    }

    reader.readAsDataURL(file)
  }

  render () {
    const {handleSubmit, fields: {title, description, fine_print, start_date, end_date, days, tags, category, locality, files, start_time, end_time }} = this.props
    let change = (name, value) => this.setState({
      [`value${name}`]: value
    })
    let timechange = (name, value) => this.setState({
      [`timevalue${name}`]: value
    })

    return (
    <div className='box new-promo'>
      <div className='box-header with-border'>
        <h4 className='lead'>New Promotion</h4>
      </div>
      <div className='box-body overview'>
        <div className='row'>
          <div className='col-md-8'>
            <form role='form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className='form-group'>
                <label>
                  Promo (100-character limit)
                </label>
                <p>
                  <small>Think of this as the tagline, the first thing locals will see when browsing through your promos e.g. Manic Monday Happy Hour - 2 for 1 drinks, 20% off all products, Wine and Dine Under the Stars - drink + food specials all night in our outdoor patio!</small>
                </p>
                <input
                  type='text'
                  className='form-control'
                  {...title}
                  placeholder='promo title' />
                {title.touched && title.error && <div className='error'>
                                                   {title.error}
                                                 </div>}
              </div>
              <div className='form-group'>
                <label>
                  Description
                </label>
                <p>
                  <small>Briefly, describe what the promo entails. We also encourage you to use this space to write a sentence or two about your place: What's your vibe? What are you known for? Why do your customers love you?</small>
                </p>
                <textarea className='form-control' {...description} placeholder='description' />
              </div>
              <div className='form-group'>
                <label>
                  The Fine Print
                </label>
                <p>
                  <small>Conditions that apply to this promo, e.g, only redeemable on weeknights</small>
                </p>
                <textarea className='form-control' {...fine_print} placeholder='fine print' />
              </div>
              <div className='form-group'>
                <label>
                  Select which days of the week you want promo to run
                </label>
                <p>
                  <small>Note that your promotion will only run on selected days</small>
                </p>
                <Select2
                  multiple
                  {...days}
                  data={this.state.days}
                  options={{placeholder: 'select the days'}}
                  className='form-control' />
                {days.touched && days.error && <div className='error'>
                                                 {days.error}
                                               </div>}
              </div>
              <div className='form-group' style={styles}>
                <label>
                  Select the time range you want promo to run
                </label>
                <p>
                  <small>Click the icons to pick the time</small>
                </p>
                <div className='col-md-6' style={padding}>
                  <DateTimePicker
                    {...start_time}
                    name='start_time'
                    placeholder='start time'
                    calendar={false}
                    onChange={timechange.bind(null, 0)}
                    value={this.state.timevalue0} />
                  {start_time.touched && start_time.error && <div className='error'>
                                                               {start_time.error}
                                                             </div>}
                </div>
                <div className='col-md-6'>
                  <DateTimePicker
                    {...end_time}
                    value={this.state.timevalue1}
                    placeholder='end time'
                    calendar={false}
                    onChange={timechange.bind(null, 1)} />
                  {end_time.touched && end_time.error && <div className='error'>
                                                           {end_time.error}
                                                         </div>}
                </div>
              </div>
              <div className='form-group' style={styles}>
                <div className='col-md-6' style={padding}>
                  <label>
                    Start date
                  </label>
                  <p>
                    <small>Click the icons to pick the start date</small>
                  </p>
                  <DateTimePicker
                    {...start_date}
                    min={new Date()}
                    name='start_date'
                    time={false}
                    onChange={change.bind(null, 0)}
                    value={this.state.value0} />
                  {start_date.touched && start_date.error && <div className='error'>
                                                               {start_date.error}
                                                             </div>}
                </div>
                <div className='col-md-6'>
                  <label>
                    End date
                  </label>
                  <p>
                    <small>Click the icons to pick the end date</small>
                  </p>
                  <DateTimePicker
                    {...end_date}
                    min={new Date()}
                    value={this.state.value1}
                    time={false}
                    onChange={change.bind(null, 1)} />
                  {end_date.touched && end_date.error && <div className='error'>
                                                           {end_date.error}
                                                         </div>}
                </div>
              </div>
              <div className='form-group'>
                <label>
                  Targeting
                </label>
                <p>
                  <small>Promote to people that are interested in...</small>
                </p>
                <Select2
                  multiple
                  {...tags}
                  data={this.state.tags}
                  options={{placeholder: 'select tags'}}
                  className='form-control' />
                {tags.touched && tags.error && <div className='error'>
                                                 {tags.error}
                                               </div>}
              </div>
              <div className='form-group'>
                <label>
                  Select category for your promo
                </label>
                <p>
                  <small>Choose the right category for your promo</small>
                </p>
                <Select2
                  multiple
                  {...category}
                  data={this.state.categories}
                  options={{placeholder: 'select category'}}
                  className='form-control' />
                {category.touched && category.error && <div className='error'>
                                                         {category.error}
                                                       </div>}
              </div>
              <div className='form-group'>
                <label>
                  Select the neighborhood for this promo
                </label>
                <p>
                  <small>What part of the city is this promotion taking place.</small>
                </p>
                <DropdownList
                  {...locality}
                  data={this.state.cities}
                  defaultValue={''}
                  placeholder='select neighborhood' />
                {locality.touched && locality.error && <div className='error'>
                                                         {locality.error}
                                                       </div>}
              </div>
              <div className='form-group'>
                <label>
                  Promo image
                </label>
                <p>
                  <small>Promos with sharp and clear images tend to have more views. Make sure that image is at least 800px wide. <br /><span className='text-danger'>We do not accept images with text in the background</span></small>
                </p>
                <div className='row'>
                  <div className='col-md-6'>
                    <Dropzone {...files} className='image-upload' onDrop={filesToUpload => this.handleImageChange(filesToUpload)}>
                      <span className='ion-upload'></span>
                    </Dropzone>
                    {files.touched && files.error && <div className='error'>
                                                       {files.error}
                                                     </div>}
                  </div>
                  <div className='col-md-6'>
                    <img src={this.state.file} width='200' className={this.state.preview} />
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

const styles = {
  width: '100%',
  float: 'left'
}

const padding = {
  paddingLeft: '0'
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error
  }
}

function validate (formProps) {
  const errors = {}
  for (var key of Object.keys(formProps)) {
    if (formProps[key] == undefined && key != 'description' && key != 'fine_print') {
      errors[key] = 'Field is required'
    }
  }
  return errors
}

export default reduxForm({
  form: 'NewPromo',
  fields: ['title', 'description', 'fine_print', 'days', 'start_date', 'end_date', 'tags', 'category', 'locality', 'files', 'start_time', 'end_time'],
  validate: validate
}, mapStateToProps, actions)(PostNewPromo)
