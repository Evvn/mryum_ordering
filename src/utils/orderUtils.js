import _ from 'lodash';
export const getSubtotals = item => {

    const itemClone = item;
    let subtotal = 0.0;
    // eslint-disable-next-line
    item.addOns.map(addOn => {
        subtotal = subtotal + addOn.price;
    });
    console.log(itemClone)

    itemClone.subtotal = (item.price + subtotal) * item.quantity;
    console.log('.', itemClone)
    return itemClone;
}

export const buildItemTemplate = (item, quantity) => {
    return {
        id: item.id,
        name: item.name,
        addOns: [],
        modifiers: [],
        price: item.price,
        quantity,
    }
}

export const addToOrder = (oldOrderState, newItem) => {
    const state = _.cloneDeep(oldOrderState);

    let added = false;
    const newItems = [];
    let orderTotal = 0.0;

    console.log(state);
    // eslint-disable-next-line
    state.items.map(item => {
        let itemClone = item;
        if(item.id === newItem.id){
            console.log(item)
            itemClone.quantity = itemClone.quanity + newItem.quantity;
            added = true;
        }
        const itemOutput = getSubtotals(itemClone);
        orderTotal = orderTotal + itemOutput.subtotal;
        newItems.push(itemOutput);
    });

    if(!added){
        const itemOutput = getSubtotals(newItem);
        orderTotal = orderTotal + itemOutput.subtotal;
        newItems.push(itemOutput);
    }


    return {
        items: newItems,
        orderTotal
    };

};

export const removeFromOrder = (oldOrderState, itemToRemove, quantity) => {
    const { items } = oldOrderState;

    const newItems = [];
    let orderTotal = 0;
    // eslint-disable-next-line
    items.map(item => {
        let itemClone = item;
        if(item.id !== itemToRemove.id){
            newItems.push(itemClone);
            orderTotal = orderTotal + itemClone.subtotal;
        }
        else{
            orderTotal = orderTotal - itemClone.subtotal;
        }

    });

    return {
        items: newItems,
        orderTotal
    };

};
