import React from 'react';

class CartItem extends React.Component {
  constructor(props) {
    super(props);

  }

  getItemSubtotal(item) {
    let subtotal = item.price;
    item.addOns.map(addOn => {
      subtotal = subtotal + addOn.price;
    })

    return subtotal;
  }

  getCostDetails(items) {
    let quantity = 0;
    let subtotal = 0;
    items.map(item => {
      quantity = quantity + item.quantity;
      subtotal = subtotal + (quantity * this.getItemSubtotal(item));
    });
    return {quantity, subtotal};
  };

  printItem() {
    const {itemId, items, removeFromCart} = this.props;
    const {quantity, subtotal} = this.getCostDetails(items);
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
