import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions.js';
import PaymentForm from './PaymentForm';
import { StripeProvider, Elements } from 'react-stripe-elements';

class PaymentScreen extends React.Component{
    constructor(props) {
        super(props);
        this.mock_data = {
            items: [
                {
                    id: 'afvadfasf',
                    name: 'pizza',
                    'add-ons': [
                        {
                        id: 'afsdfasf',
                        name: 'extra cheese',
                        price: '0.50' || false
                        }
                    ],
                    modifiers:[
                        {
                        id: 'fasdfadsfc',
                        name: 'dunnoo',
                        }
                    ],
                    price: 4.40,
                    quantity: 1,
                }
            ],
            subtotal: 8.40,
        }
    }

    render(){
      const {
        orderTotal,
        closePaymentScreen,
        makePayment,
        paymentRes,
        processingPayment,
        paymentError,
        currentOrder,
        clearStripeRes,
        clearStripeErr,
        clientInfo
      } = this.props

        return(
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
                <Elements>
                    <PaymentForm
                      orderTotal={orderTotal}
                      closePaymentScreen={closePaymentScreen}
                      data={this.mock_data}
                      makePayment={makePayment}
                      paymentRes={paymentRes}
                      processingPayment={processingPayment}
                      paymentError={paymentError}
                      currentOrder={currentOrder}
                      clearStripeRes={clearStripeRes}
                      clearStripeErr={clearStripeErr}
                      clientInfo={clientInfo}
                    />
                </Elements>
            </StripeProvider>
        )
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

// const mapStateToProps = state => ({
// });

export default connect(null, mapDispatchToProps)(PaymentScreen)
