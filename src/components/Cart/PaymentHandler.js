import React from 'react'
//css
import './styles/checkout.scss'

class PaymentHandler extends React.Component {
  render() {
    const { paymentRes, paymentError } = this.props

    console.log(paymentRes);
    console.log(paymentError);

    return (
      <div className="processingPaymentCont">
        <div className="loading">
          <img className="paymentHandlerImg" src="/mryum_assets/Mr_Yum_logo_white.svg" alt="Mr Yum"/>
            <div>
              { !paymentError ?
                <div className="paymentSuccess">
                  <h2>Payment success :)</h2>
                  <p>You will receive an SMS when your order is ready for pick up at the Feast kitchen container.</p>
                  <a
                    className="backToMenu"
                    href={'/' + window.location.pathname.split('/')[1] + '/menu'}
                  >
                    Back to menu
                  </a>
                </div>
                :
                <div className="paymentError">
                  <h2>Payment error :(</h2>
                  <p>Your card was not be charged, please check your card number and try again.</p>
                  <a
                    className="backToMenu"
                    href={'/' + window.location.pathname.split('/')[1] + '/cart'}
                  >
                    Back to cart
                  </a>
                </div>
              }
            </div>
        </div>
      </div>
    )
  }
}

export default PaymentHandler
