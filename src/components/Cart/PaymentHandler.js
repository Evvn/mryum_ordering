import React from "react";
//css
import "./styles/checkout.scss";

class PaymentHandler extends React.Component {
  render() {
    const {
      paymentError,
      clearStripeRes,
      clearStripeErr,
      clearCustomer
    } = this.props;

    return (
      <div className="processingPaymentCont">
        <div className="gradientCont">
          <div className="loading">
            <img
              className="wvLogo"
              src="/mryum_assets/wv_logo.svg"
              alt="Mr Yum"
            />
            <div>
              {!paymentError ? (
                <div className="paymentSuccess">
                  <h2>Thank you for your order!</h2>
                  <p>
                    You will receive an SMS when your order is ready for pick up
                    at the Feast Kitchen container.{" "}
                    <span aria-label="point-down" role="img">
                      👇
                    </span>
                  </p>
                  <div className="containerImg" />
                  <a
                    className="orderConfirmation"
                    href={
                      "/" + window.location.pathname.split("/")[1] + "/menu"
                    }
                    onClick={() => {
                      clearStripeRes();
                    }}
                  >
                    Got it!
                  </a>
                </div>
              ) : (
                <div className="paymentError">
                  <h2>Payment error :(</h2>
                  <p>
                    Your card has not be charged, please check your card number
                    and try again.
                  </p>
                  <a
                    className="orderConfirmation"
                    href={
                      "/" + window.location.pathname.split("/")[1] + "/cart"
                    }
                    onClick={() => {
                      clearStripeErr();
                      clearCustomer();
                    }}
                  >
                    Back to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentHandler;
