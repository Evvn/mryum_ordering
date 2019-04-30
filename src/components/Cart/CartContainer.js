import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions.js';
import PaymentScreen from './PaymentScreen.js';
import CartItem from './CartItem.js';
import _ from 'lodash';

//css
import './styles/checkout.scss'

class CartContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showPaymentScreen: false,
        }

        this.updateTotal = this.updateTotal.bind(this);
    }

    getItemSubtotal(item) {
      let subtotal = item.price;
      if (item.addOns) {
        item.addOns.map(addOn => {
          return subtotal = subtotal + addOn['Price (Not Linked)'];
        })
      }
      return subtotal;
    }

    getCostDetails(items) {
      let quantity = 0;
      let subtotal = 0;
      items.map(item => {
        quantity = quantity + item.quantity;
        return subtotal = subtotal + (quantity * this.getItemSubtotal(item));
      });
      return {quantity, subtotal};
    };


    getQuantity(items){
        let quantity = 0;
        // eslint-disable-next-line
        items.map(item => {
            quantity = quantity + item.quantity;
        });
        return quantity;
    }


    processItems(itemGroups){
      const {removeFromCart, currentOrder} = this.props;
      let subtotal = 0;

      console.log(currentOrder);

      const processedItems = itemGroups.map(itemGroup => {
        const costDetails= this.getCostDetails(currentOrder[itemGroup]);
        subtotal = subtotal + costDetails.subtotal;
        return (
          <CartItem
            addToTotal={this.updateTotal}
            key={itemGroup}
            itemId={itemGroup}
            items={{...currentOrder[itemGroup], ...costDetails}}
            removeFromCart={removeFromCart} />
        );
      });


      return {total: subtotal, processedItems};


    }


    openPaymentScreen(){
        this.setState({showPaymentScreen: true})
    }

    closePaymentScreen = () => {
      this.setState({showPaymentScreen: false})
    }

    settlePayment(){
        this.setState({showPaymentScreen: false})
    }

    updateTotal(itemTotal){
      const { updateOrderTotal, orderTotal } = this.props;
      console.log(orderTotal)
      updateOrderTotal(itemTotal + _.cloneDeep(orderTotal));
    }

    render(){
        const {showPaymentScreen} = this.state;
        const { currentOrder, paymentRes, processingPayment, paymentError, clearStripeRes } = this.props;
        const itemGroups = Object.keys(currentOrder);
        const {total, processedItems} = this.processItems(itemGroups);
        if(showPaymentScreen){
          return(
            <div>
                  <PaymentScreen
                    orderTotal={total}
                    closePaymentScreen={this.closePaymentScreen}
                    paymentRes={paymentRes}
                    processingPayment={processingPayment}
                    paymentError={paymentError}
                    currentOrder={currentOrder}
                    clearStripeRes={clearStripeRes}
                  />
            </div>
        )
      } else{
        return (
          <div className="cartCont">
            <header className="header">
              <h1 className="venue">Winter Village</h1>
              <img onClick={() => {window.history.back()}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/>
            </header>
            <h2 className="cartHeading">Your Order</h2>
            { itemGroups.length === 0 ?
              <div className="emptyCart">
                <img src="/icons/cart_icon_sad.svg" alt=""/>
                <span>Your cart is empty!</span>
              </div>
              :
              processedItems
             }
            <div className="orderTotal">
              <span>Order Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <button className="payNowBtn" onClick={(e) => {this.openPaymentScreen()}}>Checkout</button>
          </div>
        );
      }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  currentOrder: state.persistentCart.currentOrder,
  paymentRes: state.persistentCart.paymentRes,
  processingPayment: state.persistentCart.processingPayment,
  paymentError: state.persistentCart.paymentError,
  orderTotal: state.persistentCart.orderTotal,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
