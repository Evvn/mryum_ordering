import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions/actions.js";
import PaymentForm from "./PaymentForm";
import { StripeProvider, Elements } from "react-stripe-elements";

class PaymentScreen extends React.Component {
  render() {
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
    } = this.props;

    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
        <Elements>
          <PaymentForm
            orderTotal={orderTotal}
            closePaymentScreen={closePaymentScreen}
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
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

// const mapStateToProps = state => ({
// });

export default connect(
  null,
  mapDispatchToProps
)(PaymentScreen);
