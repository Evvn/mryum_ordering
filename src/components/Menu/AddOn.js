import React from 'react';

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
        const style = selected ? {background: 'green'} : {};
        return (
            <div>
                <button style={style} onClick={() => {this.selectAddon(details)}}>
                  {details['Add-On Name']}
                </button>
          </div>
        );
    }   
}

export default AddOn;