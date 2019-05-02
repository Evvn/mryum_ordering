import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import * as actions from './actions/actions.js'
import { clientTypes, routes, pages } from '../Common/enums/commonEnums.js';
import { toast } from "react-toastify";
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

          <h3>How to order food:</h3>

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
            <p><span>Step 1: </span>Verify your number so we can SMS you when your order is ready</p>
            <p><span>Step 2: </span>View menu options, order, and pay on your phone</p>
            <p><span>Step 3: </span>You'll receive an SMS when your order is ready to pickup</p>
          </div>

          {
            typeSelected ?
              (
                typeSelected === clientTypes.SEATED ?
                  <input className="collectInfo" type="text" placeholder={clientTypes.SEATED_INPUT} onChange={this.updateSeatedInputValue}/>
                  :
                  typeSelected === clientTypes.STANDING ?
                    // <input className="collectInfo" type="text" placeholder={clientTypes.STANDING_INPUT} onChange={this.updateStandingInputValue}/>
                    <input className="collectInfo" type="text" placeholder={'Mobile number (04xx...)'} onChange={this.updateStandingInputValue}/>
                  :
                ''
              )
            : ''
           }

           <div className="disclaimer">
             <span>*All drinks to be ordered at the bar (because of boring liquor rules).</span>
           </div>

          { typeSelected ?
            <div
              className="viewMenu"
              onClick={(e) => {
                // check that number does not contain
                if (standingInput.length === 10 && !standingInput.match(/[a-z]/i)) {
                  setClientType(typeSelected, {tableNumber: seatedInput, phone: standingInput}); this.routeToMenu();
                } else {
                  if (standingInput === '') {
                    toast.error(`Please enter a valid phone number`);
                  } else {
                    toast.error(`${standingInput} does not look like a valid phone number`);
                  }
                }
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
