import React from 'react';
import _ from 'lodash';
import AddOn from './AddOn.js';

import './styles/addOns.scss'

class AddOnContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            addOnState: {},
        };

        this.selectAddOn = this.selectAddOn.bind(this);
    }

    selectAddOn(addOnDetails){
        const { updateAddOns } = this.props;
        const { addOnState } = this.state;
        let stateClone = _.cloneDeep(addOnState);
        const addOnKeys = Object.keys(addOnState);

        if(addOnKeys.includes(addOnDetails.record_id)){
            delete stateClone[addOnDetails.record_id];
        } else{
            stateClone[addOnDetails.record_id] = addOnDetails;
        }

        updateAddOns(Object.keys(stateClone).map(addOn => stateClone[addOn]));
        this.setState({addOnState: stateClone});

    }

    render(){
        const { addons } = this.props;

    return (
      <div className="addOnsCont">
      <p>Add-Ons</p>
        <div className="addOns">
          {addons.map((addOn, index) => (
            <AddOn key={index} details={addOn.AIRTABLE_MENU_PAYLOAD.fields} onSelect={this.selectAddOn}/>))}
        </div>
      </div>
    );
    }
}

export default AddOnContainer;
