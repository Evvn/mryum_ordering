import React from 'react';
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
        return(
            <StripeProvider apiKey={'pk_test_gtRdjjtoOFsZqEvtkSD4sVir'}>
                <Elements>
                    <PaymentForm data={this.mock_data}/>
                </Elements>
            </StripeProvider>
        )
    }
};

export default PaymentScreen;