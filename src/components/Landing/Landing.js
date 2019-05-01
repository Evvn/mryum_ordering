import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import * as actions from './actions/actions.js'
import { clientTypes, routes, pages } from '../Common/enums/commonEnums.js';
// import classNames from 'classnames'

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
    // eslint-disable-next-line
    const { setClientType, clientType } = this.props;
    const { typeSelected, seatedInput, standingInput } = this.state;

    return (
      <div className="gradientBackground">
        <div className="landingCont">

          {/* <h2>Are you...</h2> */}

          <img className="wvLogo" src="/mryum_assets/wv_logo.svg" alt="winter village"/>

          <h3>Welcome to our mobile food  menu and ordering!</h3>

          {/* <div className="buttons">
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
          </div> */}

          <div className="instructions">
            {/* <p>
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
            </p> */}
            <p><span>Step 1: </span>View the menu</p>
            <p><span>Step 2: </span>Order and pay for food on your phone</p>
            <p><span>Step 3: </span>Get an SMS when your order is ready for pick up at the Feast Kitchen container</p>
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

          { typeSelected ?
            <div
              className="viewMenu"
              onClick={(e) => {
                setClientType(typeSelected, {tableNumber: seatedInput, phone: standingInput}); this.routeToMenu();
                }}
              >Got it!</div>
            : '' }

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  clientType: state.persistentCommon.clientType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
