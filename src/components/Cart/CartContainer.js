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
            orderTotal: 0,
        }

        this.getTotal = this.getTotal.bind(this)
    }

    componentDidMount() {
      this.getTotal()
    }

    getQuantity(items){
        let quantity = 0;
        items.map(item => {
            quantity = quantity + item.quantity;
        });
        return quantity;
    }

    getTotal() {
      const { currentOrder } = this.props
      let total = 0
      Object.values(currentOrder).forEach((item, index) => {
        total = total + (item[0].price * item[0].quantity)
      })
      this.setState({
        orderTotal: total,
      })
    }

    printOrder(){
      const { currentOrder, removeFromCart } = this.props;
      const itemGroups = Object.keys(currentOrder);
      const orderTotal = this.state.orderTotal
      let total = 0
      Object.values(currentOrder).forEach((item, index) => {
        total = total + (item[0].price * item[0].quantity)
      })

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
            itemGroups.map(itemGroup => <CartItem key={itemGroup} itemId={itemGroup} items={currentOrder[itemGroup]} removeFromCart={removeFromCart} />)
           }
          <div className="orderTotal">
            <span>Order Total</span>
            <span>{orderTotal.toFixed(2)}</span>
          </div>
          <button className="payNowBtn" onClick={(e) => {this.openPaymentScreen()}}>Checkout</button>
        </div>
      );
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
                {showPaymentScreen ?
                  <PaymentScreen
                    orderTotal={this.state.orderTotal}
                    closePaymentScreen={this.closePaymentScreen}
                  />
                  : this.printOrder()
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  currentOrder: state.persistentCart.currentOrder,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
