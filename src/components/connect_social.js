import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ConnectSocial extends Component {
  constructor(props) {
    super(props);
    this.socialConnect = this.socialConnect.bind(this);
    this.socialDisconnect = this.socialDisconnect.bind(this);
    this.socialButton = this.socialButton.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', (e) => {
      if (e.data) {
        this.props.activateSocial(e.data, this.props.merchant[0].business_id);
      }
    });
  }

  socialConnect(socialName) {
    console.log(`connecting ${socialName}`);
    const newwindow = window.open(`https://data.placeful.co/auth/${socialName}`, 'name', 'height=500,width=650');
    if (window.focus) {
      newwindow.focus();
    }

    return false;
  }

  socialDisconnect(socialName) {
    console.log(`disconnecting ${socialName}`);
    const r = confirm(`Are you sure about disconnecting ${socialName}`);
    if (r === true) {
      this.props.deactivateSocial(socialName, this.props.merchant[0].business_id);
    } else {
      return;
    }
  }

  socialButton(socialName) {
    const buttonSocialClass = this.props.merchant[0][socialName] ?
    'btn-secondary-outline' : '';
    const buttonSocialStateText = this.props.merchant[0][socialName] ?
    'Disconnect' : 'Connect';
    const socialHandleConnect = () => {
      if (this.props.merchant[0][socialName]) {
        return this.socialDisconnect(socialName);
      }
      return this.socialConnect(socialName);
    };

    return {
      buttonSocialClass,
      buttonSocialStateText,
      socialHandleConnect,
    };
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Connect your social accounts</h3>
            <p>You can promote to your social media audience by connecting your accounts</p>
          </div>
          <div className="box-body no-padding">
            <div className="table-responsive mailbox-messages">
              <table className="table table-hover table-striped">
                <tbody>
                  <tr>
                    <td className="mailbox-subject">
                      <i className="fa fa-twitter"></i> Twitter
                    </td>
                    <td className="mailbox-date">
                      <button
                        className={`btn ${this.socialButton('twitter').buttonSocialClass}`}
                        onClick={this.socialButton('twitter').socialHandleConnect}
                      >
                      {this.socialButton('twitter').buttonSocialStateText}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="mailbox-subject">
                      <i className="fa fa-foursquare"></i> Foursquare
                    </td>
                    <td className="mailbox-date">
                      <button className="btn" disabled>Coming soon</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="mailbox-subject">
                      <i className="fa fa-pinterest"></i> Pinterest
                    </td>
                    <td className="mailbox-date">
                      <button className="btn" disabled>Coming soon</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="mailbox-subject">
                      <i className="fa fa-tumblr"></i> Tumblr
                    </td>
                    <td className="mailbox-date">
                      <button className="btn" disabled>Coming soon</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="mailbox-subject">
                      <i className="fa fa-facebook"></i> Facebook
                    </td>
                    <td className="mailbox-date">
                      <button className="btn" disabled>Coming soon</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      );
  }

}

ConnectSocial.propTypes = {
  activateSocial: React.PropTypes.func,
  deactivateSocial: React.PropTypes.func,
  merchant: React.PropTypes.array,
};

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps, actions)(ConnectSocial);
