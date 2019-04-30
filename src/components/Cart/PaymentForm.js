import React from 'react';
import ProcessingPayment from './ProcessingPayment.js'
import PaymentHandler from './PaymentHandler.js'
import {injectStripe, PaymentRequestButtonElement, CardElement } from 'react-stripe-elements';

//css
import './styles/checkout.scss'

class PaymentForm extends React.Component{
    constructor(props) {
        super(props);

        // start of attempted apple/google pay stuff
        const paymentRequest = props.stripe.paymentRequest({
            country: 'AU',
            currency: 'aud',
            total: {
                label: 'Winter Village',
                amount: props.orderTotal * 100, // amount needs to be in subunit of currency
            },
        });

        paymentRequest.on('click', () => {
            this.setState({disableButton: true});
        });

        paymentRequest.on('token', ({complete, token, ...data}) => {
          this.setState({processingPayment: true})
          console.log('Received Stripe token: ', token);
          console.log('Received customer information: ', data);
          // this.props.onToken(token, this.props.amount, this.props.desc);
          complete('success')
        });

        paymentRequest.canMakePayment().then((result) => {
            this.setState({canMakePayment: !!result});
        });
        // end of it
        this.state = {
          hidePaymentRequest: false,
          disableButton: false,
          canMakePayment: false,
          paymentRequest,
          email: '',
          customerName: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.stripe) {
          if (this.state.email !== '') {
            this.props.stripe
             .createToken({type: 'card', name: this.state.customerName, email: this.state.email})
             .then((result) => {
              // console.log(result);
              const { makePayment } = this.props;
              makePayment(result.token, this.props.orderTotal * 100, 'Order description...', this.state.email)
            });
          } else {
            this.props.stripe
             .createToken({type: 'card', name: this.state.customerName, })
             .then((result) => {
              // console.log(result);
              const { makePayment } = this.props;
              makePayment(result.token, this.props.orderTotal * 100, 'Order description...', this.props.currentOrder, this.state.email)
            });
          }
        } else {
            console.log("Stripe.js hasn't loaded yet")
        }
    }

    createOptions = (fontSize, padding) => {
        return {
          style: {
            base: {
              fontSize,
              color: '#424770',
              letterSpacing: '0.025em',
              padding,
            },
            invalid: {
              color: '#9e2146',
            },
          },
        };
      };

    render(){
        const { orderTotal, paymentRes, processingPayment, paymentError, clearStripeRes } = this.props;
        return (
          <div className="paymentScreenCont">

            { processingPayment ? <ProcessingPayment /> : '' }
            { paymentRes || paymentError ?
              <PaymentHandler
              paymentRes={paymentRes}
              paymentError={paymentError}
              clearStripeRes={clearStripeRes}
              />
            :
              ''
            }

            <header className="header">
              <h1 className="venue">Winter Village</h1>
              <img onClick={() => {this.props.closePaymentScreen()}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/>
            </header>

            <form onSubmit={this.handleSubmit}>
                <h2 className="checkoutHeading">Checkout</h2>

                <div>
                  <div className="paymentHeading">
                    Payment
                  </div>
                  <input
                    value={this.state.customerName}
                    onChange={(e) => {
                      this.setState({
                        customerName: e.target.value
                      })
                    }}
                    type="text"
                    className="customerName"
                    placeholder="Name for order (required)" />
                  <input
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({
                        email: e.target.value
                      })
                    }}
                    type="email"
                    className="customerEmail"
                    placeholder="Email for receipt (optional)" />
                  <label>
                      { // apple/google pay button hides if you cant use it
                          this.state.canMakePayment && !this.state.hidePaymentRequest ? (
                            <div>
                              <button className="payWithCard" onClick={(e) => {
                                e.preventDefault()
                                this.setState({
                                  hidePaymentRequest: true
                                })
                              }}>Pay with card</button>
                              <div className="paymentRequestCont">
                                <PaymentRequestButtonElement
                                    paymentRequest={this.state.paymentRequest}
                                    style={{
                                        paymentRequestButton: {
                                            theme: 'dark',
                                            height: '64px'
                                        }
                                    }}
                                />
                              </div>
                            </div>
                          ) :
                          <div className="cardInput">
                              <CardElement {...this.createOptions('18px', '0px')}/>
                              {/* hideIcon={true} taken out of CardElement */}
                          </div>
                      }

                  </label>
                </div>

              <div className="orderTotal">
                <span>Order Total</span>
                <span>{orderTotal.toFixed(2)}</span>
              </div>

              <button className="payNowBtn">PAY NOW</button>
          </form>
        </div>
      )
    }
};

export default injectStripe(PaymentForm);
