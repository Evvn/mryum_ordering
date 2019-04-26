import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class CartContainer extends React.Component{

    render(){
        return(
            <div>
                Cart
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  currentOrder: state.persistentCart.currentOrder,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)