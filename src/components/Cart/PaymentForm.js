import React from 'react';
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
                label: 'dunno yet',
                amount: props.orderTotal * 100, // amount needs to be in subunit of currency
            },
        });

        paymentRequest.on('click', () => {
            this.setState({disableButton: true});
        });

        paymentRequest.on('token', ({complete, token, ...data}) => {
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
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
             .createToken({type: 'card', name: 'pitchBlak'})
             .then((result) => {
                 console.log('[token]', result.token)
                 /* kick off redux action, then call bff in saga
                    this.props.makePayment(result.token, props.data.subtotal * 100, 'order description???')
                 */
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
        const { data, orderTotal } = this.props;
        return(
            <div className="paymentScreenCont">
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
                    <label>
                        { // apple/google pay button hides if you cant use it
                            this.state.canMakePayment && !this.state.hidePaymentRequest ? (
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
                                <button className="payWithCard" onClick={(e) => {
                                  e.preventDefault()
                                  this.setState({
                                    hidePaymentRequest: true
                                  })
                                }}>Pay with card</button>
                              </div>
                            ) :
                            <div style={{
                              padding: '22px 18px 22px 17px',
                              borderBottom: '1px solid #e8e8e8',
                            }}>
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
