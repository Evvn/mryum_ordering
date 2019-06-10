import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions/actions.js";
import * as landingActions from "../Landing/actions/actions.js";
import CustomerScreen from "./CustomerScreen.js";
import PaymentScreen from "./PaymentScreen.js";
import CartItem from "./CartItem.js";
import _ from "lodash";

//css
import "./styles/checkout.scss";

class CartContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCustomerScreen: false,
      showPaymentScreen: false
    };

    this.updateTotal = this.updateTotal.bind(this);
    this.setCustomerDetails = this.setCustomerDetails.bind(this);
  }

  // componentWillMount() {
  //   const { clientInfo } = this.props
  //   console.log(clientInfo);
  //   if (Object.keys(clientInfo).length === 0) {
  //     window.location = '/wv/landing'
  //   }
  // }

  // componentWillUpdate() {
  //   const { clientInfo } = this.props
  //   console.log(clientInfo);
  //   if (Object.keys(clientInfo).length === 0) {
  //     window.location = '/wv/landing'
  //   }
  // }

  getItemSubtotal(item) {
    let subtotal = item.price;
    if (item.addOns) {
      item.addOns.map(addOn => {
        return (subtotal = subtotal + addOn["Price (Not Linked)"]);
      });
    }
    return subtotal;
  }

  getCostDetails(items) {
    let quantity = 0;
    let subtotal = 0;
    items.map(item => {
      quantity = quantity + item.quantity;
      return (subtotal = subtotal + quantity * this.getItemSubtotal(item));
    });
    return { quantity, subtotal };
  }

  getQuantity(items) {
    let quantity = 0;
    // eslint-disable-next-line
    items.map(item => {
      quantity = quantity + item.quantity;
    });
    return quantity;
  }

  processItems(itemGroups) {
    const { removeFromCart, currentOrder } = this.props;
    let subtotal = 0;
    const processedItems = itemGroups.map(itemGroup => {
      const costDetails = this.getCostDetails(currentOrder[itemGroup]);
      subtotal = subtotal + costDetails.subtotal;
      return (
        <CartItem
          addToTotal={this.updateTotal}
          key={itemGroup}
          itemId={itemGroup}
          items={{ ...currentOrder[itemGroup], ...costDetails }}
          removeFromCart={removeFromCart}
        />
      );
    });

    return { total: subtotal, processedItems };
  }

  openPaymentScreen() {
    this.setState({ showPaymentScreen: true });
  }

  closePaymentScreen = () => {
    this.setState({ showPaymentScreen: false });
  };

  openCustomerScreen() {
    this.setState({ showCustomerScreen: true });
  }

  closeCustomerScreen = () => {
    this.setState({ showCustomerScreen: false });
  };

  updateTotal(itemTotal) {
    const { updateOrderTotal, orderTotal } = this.props;
    updateOrderTotal(itemTotal + _.cloneDeep(orderTotal));
  }

  setCustomerDetails(typeSelected, nameInput, seatedInput, phoneNumber) {
    const { setClientType } = this.props;
    setClientType(typeSelected, {
      customerName: nameInput,
      tableNumber: seatedInput,
      phone: phoneNumber
    });
    this.closeCustomerScreen();
    this.openPaymentScreen();
  }

  render() {
    const {
      currentOrder,
      paymentRes,
      processingPayment,
      paymentError,
      clearStripeRes,
      clearStripeErr,
      clientInfo,
      stripeCustomer,
      clearCustomer
    } = this.props;
    const { showCustomerScreen, showPaymentScreen } = this.state;
    const itemGroups = Object.keys(currentOrder);
    const { total, processedItems } = this.processItems(itemGroups);

    if (showCustomerScreen) {
      return (
        <div>
          <CustomerScreen
            closeCustomerScreen={this.closeCustomerScreen}
            setCustomerDetails={this.setCustomerDetails}
            clientInfo={clientInfo}
          />
        </div>
      );
    } else if (showPaymentScreen) {
      return (
        <div>
          <PaymentScreen
            orderTotal={total}
            stripeCustomer={stripeCustomer}
            clearCustomer={clearCustomer}
            closePaymentScreen={this.closePaymentScreen}
            paymentRes={paymentRes}
            processingPayment={processingPayment}
            paymentError={paymentError}
            currentOrder={currentOrder}
            clearStripeRes={clearStripeRes}
            clearStripeErr={clearStripeErr}
            clientInfo={clientInfo}
          />
        </div>
      );
    } else {
      return (
        <div className="cartCont">
          <header className="header">
            <h1 className="venue">Winter Village</h1>
            <img
              onClick={() => {
                window.history.back();
              }}
              src="/icons/arrow-left-solid-white.svg"
              className="headerBackArrow"
              alt="back arrow"
            />
          </header>
          <h2 className="cartHeading">Your Order</h2>
          {itemGroups.length === 0 ? (
            <div className="emptyCart">
              <img src="/icons/cart_icon_sad.svg" alt="" />
              <span>Your cart is empty!</span>
              <button
                onClick={() => {
                  window.history.back();
                }}
              >
                Back to menu
              </button>
            </div>
          ) : (
            processedItems
          )}
          <div className="orderTotal">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="payNowBtn"
            onClick={e => {
              this.openCustomerScreen();
            }}
          >
            Checkout
          </button>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions, ...landingActions }, dispatch);

const mapStateToProps = state => ({
  currentOrder: state.persistentCart.currentOrder,
  paymentRes: state.persistentCart.paymentRes,
  processingPayment: state.persistentCart.processingPayment,
  paymentError: state.persistentCart.paymentError,
  orderTotal: state.persistentCart.orderTotal,
  clientType: state.persistentCommon.clientType,
  clientInfo: state.persistentCommon.clientInfo,
  stripeCustomer: state.persistentCart.stripeCustomer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
