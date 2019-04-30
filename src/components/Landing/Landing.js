import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import * as actions from './actions/actions.js'
import { clientTypes, routes, pages } from '../Common/enums/commonEnums.js';
import classNames from 'classnames'

//css
import './styles/landing.scss'

class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      typeSelected: false,
      seatedInput: '',
      standingInput: '',
    }

    this.routeToMenu = this.routeToMenu.bind(this);
    this.updateStandingInputValue = this.updateStandingInputValue.bind(this);
    this.updateSeatedInputValue = this.updateSeatedInputValue.bind(this);

    this.seatedInput = React.createRef();
    this.standingInput = React.createRef();

  }

  componentWillMount() {
    const { venueUrl} = this.props;
    if (!pages.landing[venueUrl]) {
      this.setState({typeSelected: clientTypes.STANDING});
      // this.routeToMenu()
    }
  }


  routeToMenu() {
    const { venueUrl} = this.props;
    window.location = `/${venueUrl}/${routes.MENU}`;
  }

  stageTypeSelection(type){
    this.setState({typeSelected: type});
  }

  updateStandingInputValue(e) {
    this.setState({
      standingInput: e.target.value
    });
  }

  updateSeatedInputValue(e) {
    this.setState({
      seatedInput: e.target.value
    });
  }



  render() {
    const { setClientType, clientType } = this.props;
    const { typeSelected, seatedInput, standingInput } = this.state;

    return (
      <div className="landingCont">

        <h2>Are you...</h2>

        <div className="buttons">
          <button
            className={classNames(typeSelected && typeSelected === clientTypes.SEATED ? 'clientType selected' : 'clientType')}
            onClick={() => this.stageTypeSelection(clientTypes.SEATED)}
          >
            {clientTypes.SEATED}
          </button>
          <button
            className={classNames(typeSelected && typeSelected === clientTypes.STANDING ? 'clientType selected' : 'clientType')}
            onClick={() => this.stageTypeSelection(clientTypes.STANDING)}
          >
            {clientTypes.STANDING}
          </button>
        </div>

        <div className="instructions">
          <p>
            {
              typeSelected ?
                (
                  typeSelected === clientTypes.SEATED ? clientTypes.SEATED_INTRO :
                  typeSelected === clientTypes.STANDING ? clientTypes.STANDING_INTRO : ''
                )
              : <span>&nbsp;</span>
             }
          </p>
          <p>
            {
              typeSelected ?
                (
                  typeSelected === clientTypes.SEATED ? clientTypes.SEATED_INSTRUCTIONS :
                  typeSelected === clientTypes.STANDING ? clientTypes.STANDING_INSTRUCTIONS : ''
                )
              : <span>&nbsp;</span>
             }
          </p>
        </div>

        {
          typeSelected ?
            (
              typeSelected === clientTypes.SEATED ?
                <input className="collectInfo"type="text" placeholder={clientTypes.SEATED_INPUT} onChange={this.updateSeatedInputValue}/> :
                typeSelected === clientTypes.STANDING ?
                <input className="collectInfo"type="text" placeholder={clientTypes.STANDING_INPUT} onChange={this.updateStandingInputValue}/> :
              ''
            )
          : ''
         }

  { typeSelected ? <div className="viewMenu" onClick={(e) => {setClientType(typeSelected, {tableNumber: seatedInput, phone: standingInput}); this.routeToMenu();}}>Submit</div> : '' }

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  clientType: state.persistentCommon.clientType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
