import React from 'react';

class CartItem extends React.Component {
  constructor(props) {
    super(props);

  }



  printItem() {
    const {itemId, items, removeFromCart, addToTotal} = this.props;
    const {quantity, subtotal} = items;
    return (
      <div className="cartItem">
        <div>
          <span className="cartItemQuantity">{`${quantity} x`}</span>
          <span className="cartItemName">{items[0].name}</span>
        </div>
        <span className="cartItemPrice">{subtotal.toFixed(2)}</span>
        <button className="removeItmBtn" onClick={(e) => {removeFromCart(itemId)}}>Remove</button>
      </div>
    );
  }

  render() {
    return this.printItem();
  }
}

export default CartItem;
