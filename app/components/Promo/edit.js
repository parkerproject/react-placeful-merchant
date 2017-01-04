import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


const innerStyle = {
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
  mark: {
    margin: '3px 0',
    cursor: 'pointer',
  },
  preview: {
    border: '1px dashed',
    width: '200px',
    height: '200px',
    marginLeft: '5em',
  },
};

class EditPromo extends Component {

  constructor(props) {
    super(props);
    this.state = { file: '', display: 'show', preview: 'hide', buttonText: 'Submit' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const businessId = document.querySelector('.business_id').value;
    const dealId = document.querySelector('.deal_id').value;
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
    body.append('deal_id', businessId);
    body.append('business_id', dealId);
    this.setState({ buttonText: 'Processing...' });
    this.props.editPromo(body);
  }

  handleImageChange(filesToUpload) {
    const reader = new FileReader();
    const file = filesToUpload[0];

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        display: 'hide',
        preview: 'show',
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    if (!this.props.promos) {
      return (
        <div className="overlay">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      );
    }
    const { handleSubmit, fields: { title, description, finePrint, files } } = this.props;
    const promo = this.props.promos.filter(deal => deal.deal_id === this.props.params.id);

    return (
      <div className="box-typical box-typical-padding">
        <h4 className="m-t-lg with-border">Edit promo</h4>
        <div className="box-body">
          <div className="row">
            <div className="col-md-8">
              <form role="form" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-group">
                  <label>
                    Promo (100-character limit)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    {...title}
                    defaultValue={promo[0].title}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    {...description}
                    defaultValue={promo[0].description}
                  />
                </div>
                <div className="form-group">
                  <label>
                    The fine print
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="fine_print"
                    {...finePrint}
                    defaultValue={promo[0].fine_print}
                  />
                </div>
                <div className="form-group">
                  <div className="file-upload">
                    <Dropzone
                      className="file-upload__input" {...files}
                      onDrop={filesToUpload => this.handleImageChange(filesToUpload)}
                    >
                      <mark style={innerStyle.mark}>
                        Change Image
                      </mark>
                    </Dropzone>
                  </div>
                  <img
                    src={promo[0].large_image}
                    width="200"
                    alt={title}
                    className={this.state.display}
                  />
                  <img
                    src={this.state.file}
                    width="200"
                    alt={title}
                    className={this.state.preview}
                    style={innerStyle.preview}
                  />
                </div>
                <button className="btn btn-success form-control" type="submit">
                  {this.state.buttonText}
                </button>
                <input type="hidden" className="deal_id" defaultValue={promo[0].deal_id} />
                <input type="hidden" className="business_id" defaultValue={promo[0].merchant_id} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


EditPromo.propTypes = {
  promos: PropTypes.array,
  fields: PropTypes.object,
  editPromo: PropTypes.func,
  handleSubmit: PropTypes.func,
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

function validate(formProps) {
  const errors = {};
  if (formProps.title === '') errors.title = 'Please enter your promo';
  if (formProps.description === '') errors.description = 'Please enter your description';
  if (formProps.fine_print === '') errors.fine_print = 'Please enter your fine_print';
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default reduxForm({
  form: 'EditPromo',
  fields: ['title', 'description', 'finePrint', 'files'],
  validate,
}, mapStateToProps, actions)(EditPromo);
