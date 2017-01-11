import React, { Component, PropTypes } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class PaymentView extends Component {

  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
    this.state = { buttonVal: 'Make payment', disabled: '' };
  }

  onToken(token) {
    this.setState({ buttonVal: 'Processing payment', disabled: 'disabled' });
    this.props.sendPayment(token);
  }

  render() {
    if (!this.props.merchant) {
      return <div>Loading</div>;
    }
    return (
      <div className="container-fluid">
        <section className="box-typical box-typical-full-height">
          <div className="box-typical-center">
            <div className="box-typical-center-in prices-page">
              <p>Your 14 days free trial has ended.
                Make payment below to continue.
              </p>
              <header className="prices-page-title">
                Affordable price. No contract.
              </header>
              <article className="price-card">
                <header className="price-card-header">
                  Business
                </header>
                <div className="price-card-body">
                  <div className="price-card-amount">
                    $25
                  </div>
                  <div className="price-card-amount-lbl">
                    per month
                  </div>
                  <div className="clear"></div>
                  <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_live_9xZBCqxsOvcil3BXQjT5lpPl"
                    name={this.props.merchant[0].business_name}
                    image="https://dl.dropbox.com/s/dk44jwvhaoxkxl2/Icon-76%402x.png?dl=0"
                    componentclassName="div"
                    panelLabel="Subscribe"
                    amount={2500}
                    currency="USD"
                    email={this.props.merchant[0].business_email}
                  >
                    <button className="btn btn-rounded" disabled={this.state.disabled}>
                      {this.state.buttonVal}
                    </button>
                  </StripeCheckout>
                </div>
              </article>
              <div className="prices-page-bottom">
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

PaymentView.propTypes = {
  sendPayment: PropTypes.func,
  merchant: PropTypes.array,
};

export default PaymentView;
