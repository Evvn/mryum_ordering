import React, { Component } from "react";
import Header from "./components/SimpleHeader";
import { PageHeader } from "./components/Text";
import { withRouter } from "react-router";
import StripeForm from './components/StripeForm.js'
import { StripeProvider } from 'react-stripe-elements'

const container = {
  padding: "15px"
};

const titleStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "17px",
  marginBottom: "22px"
};

class OrderPage extends Component {
  async componentDidMount() {

  }

  render() {
    const { venueurl } = this.props.match.params;
    const orderDesc = 'Order Description'

    return (
      <div className="checkoutPage">
        <Header venueurl={venueurl} />
        <div style={container}>
          <div style={titleStyles}>
            <PageHeader>Checkout</PageHeader>
          </div>

          <div>Table Service</div>
          <div>Table Number</div>

          <div>Payment</div>
          {/* Stripe payment components */}
          <div className="stripeContainer">
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>

                <StripeForm
                  orderTotal={25.00}
                  orderDesc={orderDesc}
                />

            </StripeProvider>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(OrderPage);


import React from "react";
import { Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "./CheckoutForm.js";

class StripeForm extends React.Component {
  render() {
    const { ...props } = this.props;
    return (
      <Elements>
        <InjectedCheckoutForm {...props} />
      </Elements>
    );
  }
}

export default StripeForm;