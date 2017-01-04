import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Select2 from 'react-select2-wrapper';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import { DateTimePicker } from 'react-widgets';


momentLocalizer(Moment);

const innerStyles = {
  styles: {
    width: '100%',
    float: 'left',
  },
  padding: {
    paddingLeft: '0',
  },
  icon: {
    fontSize: '2.5em',
  },
  social: {
    display: 'inline-block',
    marginLeft: '10px',
  },
};

class PostNewPromo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [
        'Food',
        'Drinks',
        'Events',
        'Comedy',
        'Culture',
        'Party',
        'Music',
        'Afterwork',
        'Trendy',
        'Datenight',
        'Club',
        'Outdoors'],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      categories: ['Happy Hour', 'Lunch', 'Dinner', 'Brunch'],

      value0: null, value1: null, file: '', preview: 'hide', timevalue0: null, timevalue1: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const body = new FormData();
    Object.keys(formProps).forEach((key) => {
      if (formProps[key] != null) {
        if (formProps[key] instanceof FileList) {
          body.append(key, formProps[key][0], formProps[key][0].name);
        } else {
          body.append(key, formProps[key]);
        }
      }
    });
    body.append('business_id', this.props.merchant[0].business_id);
    this.refs.mySubmit.innerText = 'Processing...';
    this.refs.mySubmit.disabled = true;
    this.props.createPromo(body);
  }

  handleImageChange(filesToUpload) {
    const reader = new FileReader();
    const file = filesToUpload[0];

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        preview: 'show',
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {
      handleSubmit,
      fields: {
        title,
        description,
        finePrint,
        startDate,
        endDate,
        days,
        tags,
        category,
        files,
        startTime,
        socialTwitter,
        socialTumblr,
        socialPinterest,
        socialFoursquare,
        endTime },
      } = this.props;
    const change = (name, value) => this.setState({
      [`value${name}`]: value,
    });
    const timechange = (name, value) => this.setState({
      [`timevalue${name}`]: value,
    });

    return (
      <div className="box-typical box-typical-padding">
        <h4 className="m-t-lg with-border">New Promotion</h4>
        <div className="box-body overview">
          <div className="row">
            <div className="col-md-8">
              <form role="form" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Title (50-character limit)
                  </label>
                  <p>
                    <span>Think of this as the tagline, the first thing
                    locals will see when browsing through your promos e.g.
                    Manic Monday Happy Hour - 2 for 1 drinks, Wine and Dine
                    Under the Stars - drink + food promos all night in our
                    outdoor patio!</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="50"
                    {...title}
                    placeholder="title"
                  />
                  {title.touched && title.error &&
                    <div className="text-danger">
                      {title.error}
                    </div>}
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Description
                  </label>
                  <p>
                    <span>Briefly, describe the promo.
                    We also encourage you to use this space
                    to write a sentence or two about your place:
                    What's your vibe? What are you known for?
                    Why do your customers love you?</span>
                  </p>
                  <textarea className="form-control" {...description} placeholder="description" />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    The Fine Print
                  </label>
                  <p>
                    <span>Conditions that apply to this promo, e.g,
                    only redeemable on weeknights</span>
                  </p>
                  <textarea className="form-control" {...finePrint} placeholder="fine print" />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Select which days of the week you want promo to run
                  </label>
                  <p>
                    <span>Note that your promo will only run on selected days</span>
                  </p>
                  <Select2
                    multiple
                    {...days}
                    data={this.state.days}
                    options={{ placeholder: 'select the days' }}
                    className="form-control"
                  />
                  {days.touched && days.error &&
                    <div className="text-danger">
                        {days.error}
                    </div>}
                </div>
                <div className="form-group" style={innerStyles.styles}>
                  <label className="font-weight-bold">
                    Select the time range you want promo to run
                  </label>
                  <p>
                    <span>Click the icons to pick the time</span>
                  </p>
                  <div className="col-md-6" style={innerStyles.padding}>
                    <DateTimePicker
                      {...startTime}
                      name="startTime"
                      placeholder="start time"
                      calendar={false}
                      onChange={() => timechange(null, 0)}
                      value={this.state.timevalue0}
                    />
                    {startTime.touched && startTime.error &&
                      <div className="text-danger">
                        {startTime.error}
                      </div>}
                  </div>
                  <div className="col-md-6">
                    <DateTimePicker
                      {...endTime}
                      value={this.state.timevalue1}
                      placeholder="end time"
                      calendar={false}
                      onChange={() => timechange(null, 1)}
                    />
                    {endTime.touched && endTime.error &&
                      <div className="text-danger">
                        {endTime.error}
                      </div>}
                  </div>
                </div>
                <div className="form-group" style={innerStyles.styles}>
                  <div className="col-md-6" style={innerStyles.padding}>
                    <label className="font-weight-bold">
                      Start date
                    </label>
                    <p>
                      <span>Click the icons to pick the start date</span>
                    </p>
                    <DateTimePicker
                      {...startDate}
                      min={new Date()}
                      name="startDate"
                      time={false}
                      onChange={() => change(null, 0)}
                      value={this.state.value0}
                    />
                    {startDate.touched && startDate.error &&
                      <div className="text-danger">
                          {startDate.error}
                      </div>}
                  </div>
                  <div className="col-md-6">
                    <label className="font-weight-bold">
                      End date
                    </label>
                    <p>
                      <span>Click the icons to pick the end date</span>
                    </p>
                    <DateTimePicker
                      {...endDate}
                      min={new Date()}
                      value={this.state.value1}
                      time={false}
                      onChange={() => change(null, 1)}
                    />
                    {endDate.touched && endDate.error &&
                      <div className="text-danger">
                          {endDate.error}
                      </div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Targeting
                  </label>
                  <p>
                    <span>Promote to people that are interested in...</span>
                  </p>
                  <Select2
                    multiple
                    {...tags}
                    data={this.state.tags}
                    options={{ placeholder: 'select tags' }}
                    className="form-control"
                  />
                  {tags.touched && tags.error &&
                    <div className="text-danger">
                        {tags.error}
                    </div>}
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Select category for promo
                  </label>
                  <p>
                    <span>Choose the right category for your promo</span>
                  </p>
                  <Select2
                    multiple
                    {...category}
                    data={this.state.categories}
                    options={{ placeholder: 'select category' }}
                    className="form-control"
                  />
                  {category.touched && category.error &&
                    <div className="text-danger">
                        {category.error}
                    </div>}
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Add image for promo
                  </label>
                  <p>
                    <span>promos with sharp and clear images tend to have more views.
                     Make sure that image is at least 800px wide.
                    </span>
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Dropzone
                        {...files}
                        className="image-upload"
                        onDrop={filesToUpload => this.handleImageChange(filesToUpload)}
                      >
                        <span className="ion-upload" style={innerStyles.icon}></span>
                      </Dropzone>
                      {files.touched && files.error &&
                        <div className="text-danger">
                             {files.error}
                        </div>}
                    </div>
                    <div className="col-md-6">
                      <img
                        role="presentation"
                        src={this.state.file}
                        width="200"
                        className={this.state.preview}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <h7 className="font-weight-bold">Distribute to social media</h7>
                  {this.props.merchant[0].twitter &&
                    <div style={innerStyles.social}>
                      <label className="fa fa-twitter social-fa twitter"></label>
                      <input type="checkbox" {...socialTwitter} value="yes" />
                    </div>}
                  {this.props.merchant[0].foursquare &&
                    <div style={innerStyles.social}>
                      <label className="fa fa-foursquare social-fa foursquare"></label>
                      <input type="checkbox" {...socialFoursquare} value="yes" />
                    </div>}
                  {this.props.merchant[0].pinterest &&
                    <div style={innerStyles.social}>
                      <label className="fa fa-pinterest social-fa pinterest"></label>
                      <input type="checkbox" {...socialPinterest} value="yes" />
                    </div>}
                  {this.props.merchant[0].tumblr &&
                    <div style={innerStyles.social}>
                      <label className="fa fa-tumblr social-fa tumblr"></label>
                      <input type="checkbox" {...socialTumblr} value="yes" />
                    </div>}
                </div>
                <button className="btn btn-success form-control" type="submit" ref="mySubmit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

PostNewPromo.propTypes = {
  fields: PropTypes.object,
  createPromo: PropTypes.func,
  merchant: PropTypes.array,
  handleSubmit: PropTypes.func,
};

function validate(formProps) {
  const errors = {};
  for (const key of Object.keys(formProps)) {
    if (formProps[key] === undefined &&
      key !== 'description' &&
      key !== 'finePrint' &&
      key !== 'socialTwitter' &&
      key !== 'socialFoursquare' &&
      key !== 'socialPinterest' &&
      key !== 'socialTumblr'
      ) {
      errors[key] = 'Field is required';
    }
  }
  return errors;
}

export default reduxForm({
  form: 'NewPromo',
  fields: [
    'title',
    'description',
    'finePrint',
    'days',
    'startDate',
    'endDate',
    'tags',
    'category',
    'files',
    'startTime',
    'socialTwitter',
    'socialFoursquare',
    'socialPinterest',
    'socialTumblr',
    'endTime'],
  validate,
}, mapStateToProps, actions)(PostNewPromo);
