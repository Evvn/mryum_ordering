import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions.js';
import PaymentScreen from './PaymentScreen.js';

class CartContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showPaymentScreen: false,
        }
    }

    printOrder(){
        const { currentOrder } = this.props;

        const itemGroups = Object.keys(currentOrder);
        if(itemGroups.length === 0){
            return (
                <div>
                    Cart
                    <h1>Cart is Empty</h1>
                </div>
                
            );
        }
        else{
            return (<div>
                Cart
            {itemGroups.map(itemGroup => {
                console.log(currentOrder[itemGroup])
                return (<div style={{display: 'flex'}}>
                    <h1>{`x${currentOrder[itemGroup].length}  `}</h1>
                    <h1>{currentOrder[itemGroup][0].name}</h1>
                    <h1>{currentOrder[itemGroup][0].price}</h1>
                    <button onClick={(e) => {this.openPaymentScreen()}}>Pay Now</button>
                </div>
            )})
        }</div>);
        }
    }

    openPaymentScreen(){
        this.setState({showPaymentScreen: true})
    }

    settlePayment(){
        this.setState({showPaymentScreen: false})
    }

    

    render(){
        const {showPaymentScreen} = this.state;
        return(
            <div>
                {showPaymentScreen ? <PaymentScreen/> : this.printOrder()}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  currentOrder: state.persistentCart.currentOrder,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)