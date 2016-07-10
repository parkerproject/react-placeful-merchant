import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'

class PaymentView extends Component {
  onToken (token) {
    console.log(token)
  }

  render () {
    return (
    <div className='container-fluid'>
      <section className='box-typical box-typical-full-height'>
        <div className='box-typical-center'>
          <div className='box-typical-center-in prices-page'>
            <header className='prices-page-title'>
              Affordable price. No contract.
            </header>
            <article className='price-card'>
              <header className='price-card-header'>
                Business
              </header>
              <div className='price-card-body'>
                <div className='price-card-amount'>
                  $14.99
                </div>
                <div className='price-card-amount-lbl'>
                  per month
                </div>
                <div className='clear'></div>
                <StripeCheckout
                  token={this.onToken}
                  stripeKey='pk_test_38o72mxE5rPuPUpZTDJVmKKv'
                  name='Three Comma Co.'
                  description='Big Data Stuff'
                  image='https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png'
                  componentclassName='div'
                  panelLabel='Give Money'
                  amount={1000000}
                  currency='USD'
                  email='demo@placeful.co'>
                  <button className='btn btn-rounded'>
                    Start your trial
                  </button>
                </StripeCheckout>
              </div>
            </article>
            <div className='prices-page-bottom'>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
  }
}

export default PaymentView
