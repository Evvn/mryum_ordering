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
                amount: props.data.subtotal * 100, // amount needs to be in subunit of currency
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
        const {data} = this.props;
        return(
            <div className="paymentScreenCont">
              <header className="header">
                <h1 className="venue">Winter Village</h1>
                <img onClick={() => {window.history.back()}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/>
              </header>
              <form onSubmit={this.handleSubmit}>
                  <div style={{width: '100%', height: '65px'}}>
                          <h4>Checkout</h4>
                  </div>
                  <div>
                      <div style={{width: '100%', height: '65px', backgroundColor: 'lightgrey'}}>
                          <h4>Table service</h4>
                      </div>
                      <label>
                          Table service

                      </label>
                      <div style={{width: '100%', height: '65px', backgroundColor: 'lightgrey'}}>
                          <h4>Payment</h4>
                      </div>
                      <label>
                          <div style={{padding: '22px 18px 22px 17px'}}>
                              <CardElement {...this.createOptions('18px', '0px')} hideIcon={true}/>
                          </div>
                      </label>
                  </div>
                  <div style={{marignTop: '103px', height: '65px'}}>
                      <span>Order Total</span>
                      <span style={{float: 'right', paddingRight: '18px'}}><b>{data.subtotal.toFixed(2)}</b></span>
                  </div>


<<<<<<< HEAD
                  {
                      this.state.canMakePayment ? (
                          <PaymentRequestButtonElement
                              paymentRequest={this.state.paymentRequest}
                              style={{
                                  paymentRequestButton: {
                                      theme: 'dark',
                                      height: '64px'
                                  }
                              }}
                          >
                              PAY NOW
                          </PaymentRequestButtonElement>
                      ) : null
                  }
                  <button>PAY NOW</button>
              </form>
            </div>
=======
                { // apple/google pay button hides if you cant use it
                    this.state.canMakePayment ? (
                        <PaymentRequestButtonElement
                            paymentRequest={this.state.paymentRequest}
                            style={{
                                paymentRequestButton: {
                                    theme: 'dark',
                                    height: '64px'
                                }
                            }}
                        >
                            PAY NOW
                        </PaymentRequestButtonElement>
                    ) : null
                }
                <button>PAY NOW</button>
            </form>
>>>>>>> 12156bd98abff3a0ebbc37d5976a6e93191292a9
        )
    }
};

export default injectStripe(PaymentForm);
