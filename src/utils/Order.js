
const addToOrder = (oldOrderState, newItem, quantity) => {
    const { items, subtotal } = oldOrderState;

    let added = false;
    const newItems = [];
    items.map(item => {
        if(item.id === newItem.id){
            item.quantity = item.quanity + quantity;
            added = true;
        }
        newItems.pushItem;
    });
    
};

