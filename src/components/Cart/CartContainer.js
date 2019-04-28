import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions.js';
import PaymentScreen from './PaymentScreen.js';
import CartItem from './CartItem.js';

//css
import './styles/checkout.scss'

class CartContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showPaymentScreen: false,
        }
    }

    getQuantity(items){
        let quantity = 0;
        items.map(item => {
            quantity = quantity + item.quantity;
        });
        return quantity;
    }

    getTotal(order) {
      let total = 0
      Object.values(order).forEach((item, index) => {
        total = total + (item[0].price * item[0].quantity)
      })
      return total.toFixed(2)
    }

    printOrder(){
        const { currentOrder, removeFromCart } = this.props;
        const itemGroups = Object.keys(currentOrder);
        if(itemGroups.length === 0){
            return (
                <div>
                    Cart
                    <h1>Cart is Empty</h1>
                </div>

            );
        } else {
          return (
          <div className="cartCont">
            <header className="header">
              <h1 className="venue">Winter Village</h1>
              <img onClick={() => {window.history.back()}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/>
            </header>
            <h2 className="cartHeading">Your Order</h2>
            {itemGroups.map(itemGroup => <CartItem items={currentOrder[itemGroup]}/>)}
            <div className="orderTotal">
              <span>Order Total</span>
              <span>{this.getTotal(currentOrder)}</span>
            </div>
            <button className="payNowBtn" onClick={(e) => {this.openPaymentScreen()}}>Checkout</button>
          </div>);
      }
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

    render(){
        const {showPaymentScreen} = this.state;
        return(
            <div>
                {showPaymentScreen ? <PaymentScreen closePaymentScreen={this.closePaymentScreen} /> : this.printOrder()}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  currentOrder: state.persistentCart.currentOrder,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
