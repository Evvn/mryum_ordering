import React from 'react';

class CartItem extends React.Component {

  printAddOns(addOns) {
    let addOnList = []
    addOns.forEach(addOn => {
      addOnList.push(
        <div className="addOn">
          <span className="addOnName">{addOn.name}</span>
          <span className="addOnPrice">+{addOn.price.toFixed(2)}</span>
        </div>
      )
    })
    return addOnList
  }

  printItem() {
    const {itemId, items, removeFromCart} = this.props;
    const {quantity, subtotal} = items;
    const addOns = items[0].addOns ? items[0].addOns.map(addOn => {
      let a = {
        name: addOn['Add-On Name'],
        price: addOn['Price (Not Linked)'],
      }
      return a
    }) : [];

    return (
      <div className="cartItem">
        <div>
          <span className="cartItemQuantity">{`${quantity} x`}</span>
          <span className="cartItemName">{items[0].name}</span>
          <div className="addOns">
            { this.printAddOns(addOns) }
          </div>
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
