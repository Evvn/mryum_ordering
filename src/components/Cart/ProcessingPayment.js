import React from 'react'
//css
import './styles/checkout.scss'

class ProcessingPayment extends React.Component {
  render() {
    return (
      <div className="processingPaymentCont">
        <div className="loading">
          <img src="/mryum_assets/Mr_Yum_logo_white.svg" alt="Mr Yum"/>
          { this.props.paymentRes ? <h2>Payment success!</h2> :
            <div>
              <h2>Processing payment...</h2>
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
           }
        </div>
      </div>
    )
  }
}

export default ProcessingPayment
