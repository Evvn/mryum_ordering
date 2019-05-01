import React from 'react';
import './styles/addOns.scss'

class AddOn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selected: false,
        };

        this.selectAddon = this.selectAddon.bind(this);
    }

    selectAddon(){
        const { details, onSelect } = this.props;
        const { selected } = this.state;

        if(selected){
            this.setState({selected: false});
        }
        else{
            this.setState({selected: true});
        }

        onSelect(details);

    }

    render(){
        const { details } = this.props;
        const { selected } = this.state;
        const style = selected ? {
          background: '#d1a4b5',
          borderColor: '#d1a4b5',
          backgroundImage: "url('/icons/tick_icon.svg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        } : {};

        return (
          <div className="addOn">
            <div>
              <span className="addOnName">{details['Add-On Name']}</span>
              <span className="addOnPrice">+ {details['Price (Not Linked)']}</span>
            </div>
            <button className="addOnBtn" style={style} onClick={() => {this.selectAddon(details)}}/>
          </div>
        );
    }
}

export default AddOn;
