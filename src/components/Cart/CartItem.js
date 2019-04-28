import React from 'react';

class CartItem extends React.Component{
    constructor(props){
        super(props);

    }


    getItemSubtotal(item){
        let subtotal = item.price;
        item.addOns.map(addOn => {
            subtotal = subtotal + addOn.price;
        })

        return subtotal;
    }

    getCostDetails(items){
        let quantity = 0;
        let subtotal = 0;
        items.map(item => {
            quantity = quantity + item.quantity; 
            subtotal = subtotal + (quantity * this.getItemSubtotal(item));
        });
        return { quantity, subtotal };
    };

    

    printItem(){
        const {items} = this.props;
        const {quantity, subtotal} = this.getCostDetails(items);
        return (<div style={{display: 'flex'}}>
        <h1>{`x${quantity}    `}</h1>
        <h1>{items[0].name}</h1>
        <h1>{subtotal}</h1>
        <button onClick={(e) => {this.openPaymentScreen()}}>Pay Now</button>
        </div>);
    }

    render(){
        return this.printItem();
        
    }
}

export default CartItem;