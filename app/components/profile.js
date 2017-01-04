import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import Dropzone from 'react-dropzone';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { file: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleImageChange(filesToUpload) {
    const reader = new FileReader();
    const file = filesToUpload[0];

    reader.onloadend = () => {
      // photoImage
      this.setState({
        file: reader.result,
      });
    };

    reader.readAsDataURL(file);
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
    this.props.editProfile(body);
  }

  render() {
    if (!this.props.merchant) {
      return <div>loading...</div>;
    }
    const {
      handleSubmit,
      fields: { businessName, businessPhone, description, files } } = this.props;
    return (
      <div className="box-typical box-typical-padding">
        <div className="box-header with-border">
          <h4 className="lead">Edit your profile</h4>
        </div>
        <div className="box-body">
          <div className="row">
            <div className="col-md-8">
              <form role="form" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-group">
                  <label>
                    Business name
                  </label>
                  <input
                    type="text"
                    className="form-control" {...businessName}
                    defaultValue={this.props.merchant[0].business_name}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Business phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...businessPhone}
                    defaultValue={this.props.merchant[0].business_phone}
                  />
                </div>
                <div className="form-group">
                  <label>
                    About you
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    {...description}
                    defaultValue={this.props.merchant[0].description}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <p><img src={this.props.merchant[0].business_icon} alt="" /></p>
                    </div>
                    <div className="col-md-4">
                      <Dropzone
                        {...files}
                        className="photo-upload"
                        onDrop={filesToUpload => this.handleImageChange(filesToUpload)}
                      >
                         Change photo
                      </Dropzone>
                    </div>
                    <div className="col-md-4">
                      <img src={this.state.file} alt="" width="200" />
                    </div>
                  </div>
                </div>
                <button className="btn btn-success form-control" type="submit">
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

Profile.propTypes = {
  merchant: PropTypes.array,
  fields: PropTypes.object,
  editProfile: PropTypes.func,
  handleSubmit: PropTypes.func,
};


function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

function validate() {
  const errors = {};
  return errors;
}

export default reduxForm({
  form: 'Profile',
  fields: ['business_name', 'business_phone', 'description', 'files'],
  validate,
}, mapStateToProps, actions)(Profile);