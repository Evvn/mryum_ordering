import React from 'react';
import ProcessingPayment from './ProcessingPayment.js'
import PaymentHandler from './PaymentHandler.js'
import {injectStripe, PaymentRequestButtonElement, CardElement } from 'react-stripe-elements';
import { toast } from "react-toastify";
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

        paymentRequest.on('click', function(event) {
          this.setState({disableButton: true});
          const { customerName } = this.state
          if (customerName === '') {
            event.preventDefault()
            toast.error(<div><p>Please enter a name for your order.</p><p>(Your card has not been charged)</p></div>);
            return
          }
        });

        paymentRequest.on('token', ({complete, token, ...data}) => {
          const { orderTotal, currentOrder, clientInfo, makePayment } = this.props
          const { customerName, email } = this.state
          makePayment(
            token,
            orderTotal * 100,
            'Mr Yum',
            currentOrder,
            clientInfo,
            customerName,
            email === '' ? undefined : email)
          this.setState({processingPayment: true})
          console.log('Received Stripe token: ', token);
          console.log('Received customer information: ', data);

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
      const { orderTotal, currentOrder, clientInfo, stripe, makePayment } = this.props
      const { customerName, email } = this.state
      e.preventDefault();

      if (customerName === '') {
        toast.error(<div><p>Please enter a name for your order.</p><p>(Your card has not been charged)</p></div>);
        return
      }
      if (stripe) {
        stripe
         .createToken({type: 'card', name: customerName, })
         .then((result) => {
          // console.log(result);
          makePayment(
            result.token,
            orderTotal * 100,
            'Mr Yum',
            currentOrder,
            clientInfo,
            customerName,
            email === '' ? undefined : email)
        });
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
        const {
          orderTotal,
          paymentRes,
          processingPayment,
          paymentError,
          clearStripeRes,
          clearStripeErr,
          currentOrder,
        } = this.props;
        const { customerName } = this.state

        console.log(currentOrder);

        // let forMike = []
        // Object.keys(currentOrder).forEach(item => {
        //   forMike.push(currentOrder[item])
        // })
        // console.log(JSON.stringify(forMike));

        return (
          <div className="paymentScreenCont">

            { processingPayment ? <ProcessingPayment /> : '' }
            { paymentRes || paymentError ?
              <PaymentHandler
              paymentRes={paymentRes}
              paymentError={paymentError}
              clearStripeRes={clearStripeRes}
              clearStripeErr={clearStripeErr}
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
                          this.state.canMakePayment && !this.state.hidePaymentRequest && customerName !== '' ? (
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
                          <div>
                            { customerName !== '' ? <div className="cardInput"><CardElement {...this.createOptions('18px', '0px')}/></div> : '' }
                          </div>
                      }

                  </label>
                </div>

              <div className="orderTotal">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              <button className="payNowBtn">{customerName === '' ? 'Enter your name' : 'PAY NOW'}</button>
          </form>
        </div>
      )
    }
};

export default injectStripe(PaymentForm);
