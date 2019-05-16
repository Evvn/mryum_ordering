import React from "react";
import ProcessingPayment from "./ProcessingPayment.js";
import PaymentHandler from "./PaymentHandler.js";
import {
  injectStripe,
  PaymentRequestButtonElement,
  CardElement
} from "react-stripe-elements";
//css
import "./styles/checkout.scss";

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    // start of attempted apple/google pay stuff
    const paymentRequest = props.stripe.paymentRequest({
      country: "AU",
      currency: "aud",
      total: {
        label: "Winter Village",
        amount: props.orderTotal * 100 // amount needs to be in subunit of currency
      }
    });

    paymentRequest.on("click", function(event) {
      this.setState({ disableButton: true });
    });

    paymentRequest.on("token", ({ complete, token, ...data }) => {
      const { orderTotal, currentOrder, clientInfo, makePayment } = this.props;
      const { email } = this.state;
      makePayment(
        token,
        orderTotal * 100,
        "Mr Yum",
        currentOrder,
        clientInfo,
        email === "" ? undefined : email
      );
      this.setState({ processingPayment: true });
      console.log("Received Stripe token: ", token);
      console.log("Received customer information: ", data);

      complete("success");
    });

    paymentRequest.canMakePayment().then(result => {
      this.setState({ canMakePayment: !!result });
    });
    // end of it
    this.state = {
      hidePaymentRequest: false,
      disableButton: false,
      canMakePayment: false,
      paymentRequest,
      email: ""
    };
  }

  //trial to fix autocomplete suggestion for card input on *first* click instead of second
  // componentDidUpdate() {
  //   console.log(
  //     document
  //       .querySelectorAll("iframe")[0]
  //       .contentWindow.document.querySelector("span")
  //   );
  // }

  handleSubmit = e => {
    const {
      orderTotal,
      currentOrder,
      clientInfo,
      stripe,
      makePayment
    } = this.props;
    const { email } = this.state;
    e.preventDefault();
    this.setState({ disableButton: true });

    if (stripe) {
      stripe
        .createToken({ type: "card", name: clientInfo.customerName })
        .then(result => {
          makePayment(
            result.token,
            orderTotal * 100,
            "Mr Yum",
            currentOrder,
            clientInfo,
            email === "" ? undefined : email
          );
        });
    } else {
      console.log("Stripe.js hasn't loaded yet");
    }
  };

  createOptions = fontSize => {
    return {
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em"
        },
        invalid: {
          color: "#9e2146"
        }
      }
    };
  };

  render() {
    const {
      orderTotal,
      paymentRes,
      processingPayment,
      paymentError,
      clearStripeRes,
      clearStripeErr
    } = this.props;
    const { disableButton } = this.state;

    return (
      <div className="paymentScreenCont">
        {processingPayment ? <ProcessingPayment /> : ""}

        {paymentRes || paymentError ? (
          <PaymentHandler
            paymentRes={paymentRes}
            paymentError={paymentError}
            clearStripeRes={clearStripeRes}
            clearStripeErr={clearStripeErr}
          />
        ) : (
          <div>
            <header className="header">
              <h1 className="venue">Winter Village</h1>
              <img
                onClick={() => {
                  this.props.closePaymentScreen();
                }}
                src="/icons/arrow-left-solid-white.svg"
                className="headerBackArrow"
                alt="back arrow"
              />
            </header>

            <form className="checkoutForm" onSubmit={this.handleSubmit}>
              <h2 className="checkoutHeading">Checkout</h2>

              <div>
                <div className="paymentHeading">Payment</div>
                <input
                  value={this.state.email}
                  onChange={e => {
                    this.setState({
                      email: e.target.value
                    });
                  }}
                  type="email"
                  className="customerEmail"
                  placeholder="Email for receipt (optional)"
                />
                <label>
                  {// apple/google pay button hides if you cant use it
                  this.state.canMakePayment &&
                  !this.state.hidePaymentRequest ? (
                    <div>
                      <button
                        className="payWithCard"
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            hidePaymentRequest: true
                          });
                        }}
                      >
                        Pay with card
                      </button>
                      <div className="paymentRequestCont">
                        <PaymentRequestButtonElement
                          paymentRequest={this.state.paymentRequest}
                          style={{
                            paymentRequestButton: {
                              theme: "dark",
                              height: "64px"
                            }
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    // <div className="cardInput">
                    <CardElement
                      {...this.createOptions("18px")}
                      className={"cardInput"}
                    />
                    // </div>
                  )}
                </label>
              </div>

              <div className="orderTotal">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              {!disableButton && <button className="payNowBtn">PAY NOW</button>}
            </form>
            {disableButton && <button className="payNowBtn">Loading...</button>}
          </div>
        )}
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
