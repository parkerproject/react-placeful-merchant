import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import Select2 from 'react-select2-wrapper';
import Dropzone from 'react-dropzone';


const innerStyle = {
  height: {
    height: '134px',
  },
  minHeight: {
    minHeight: '134px',
  },
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
};

class LastMinutePromo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: ['Happy Hour', 'Dinner', 'Brunch'],
      file: '',
      preview: 'hide',
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
    this.props.lastMinutePromo(body);
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
    const { handleSubmit, fields: { title, description, category, files } } = this.props;
    return (
      <div className="box-typical box-typical-full-height" style={innerStyle.minHeight}>
        <h4 className="m-t-lg with-border text-center">Last Minute Promo <br />
          <small>
            <mark> Only use this form to create a last minute
              promo during slow and quiet days
            </mark>
          </small>
        </h4>
        <div className="add-customers-screen tbl" style={innerStyle.height}>
          <div className="add-customers-screen-in">
            <form role="form" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="form-group">
                <label className="font-weight-bold">
                  Title (50-character limit)
                </label>
                <p>
                  <span>Think of this as the tagline, the first thing your followers
                    will see in their notification inbox
                  </span>
                </p>
                <input
                  type="text"
                  className="form-control"
                  maxLength="50"
                  {...title}
                  placeholder="title"
                />
                {title.touched && title.error && <div className="bg-danger">
                                                   {title.error}
                </div>}
              </div>
              <div className="form-group">
                <label className="font-weight-bold">
                  Description
                </label>
                <textarea className="form-control" {...description} placeholder="description" />
              </div>
              <div className="form-group">
                <label className="font-weight-bold">
                  Select category for promo
                </label>
                <Select2
                  multiple
                  {...category}
                  data={this.state.categories}
                  options={{ placeholder: 'select category' }}
                  className="form-control"
                />
                {category.touched && category.error && <div className="bg-danger">
                                                         {category.error}
                </div>}
              </div>
              <div className="form-group">
                <label className="font-weight-bold">
                  Add image for promo
                </label>
                <p>
                  <span>Make sure that image is at least 800px wide. </span>
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <Dropzone
                      {...files}
                      className="image-upload"
                      onDrop={filesToUpload => this.handleImageChange(filesToUpload)}
                    >
                      <span className="ion-upload" style={innerStyle.icon}></span>
                    </Dropzone>
                    {files.touched && files.error && <div className="bg-danger">
                                                       {files.error}
                    </div>}
                  </div>
                  <div className="col-md-6">
                    <img
                      src={this.state.file}
                      width="200"
                      alt={title}
                      className={this.state.preview}
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-success form-control" type="submit">
                Submit
              </button>
              <p className="text-center"><small>Note:
                <span className="text-danger">that this promo will only
                  run today (between 5pm and 11.55pm)
                </span></small></p>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

LastMinutePromo.propTypes = {
  merchant: PropTypes.array,
  lastMinutePromo: PropTypes.func,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

function validate(formProps) {
  const errors = {};
  if (formProps.title === undefined) errors.title = 'Title is required';
  if (formProps.category === undefined) errors.category = 'Category is required';
  if (formProps.files === undefined) errors.files = 'Image is required';
  return errors;
}

export default reduxForm({
  form: 'LastMinutePromo',
  fields: ['title', 'description', 'category', 'files', 'locality'],
  validate,
}, mapStateToProps, actions)(LastMinutePromo);
