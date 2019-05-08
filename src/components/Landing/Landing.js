import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";
import * as actions from "./actions/actions.js";
import * as commonActions from "../Common/actions/actions.js";
import { clientTypes, routes, pages } from "../Common/enums/commonEnums.js";
import { toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen/LoadingScreen.js";
import phone from "phone";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import classNames from 'classnames'

//css
import "./styles/landing.scss";
// import { getTwilioCode } from "../../integration/sagas/commonIntegration.js";

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeSelected: false,
      seatedInput: "",
      nameInput: ""
    };

    this.routeToMenu = this.routeToMenu.bind(this);
    this.updateSeatedInputValue = this.updateSeatedInputValue.bind(this);
    this.updateNameInputValue = this.updateNameInputValue.bind(this);

    this.seatedInput = React.createRef();
    this.standingInput = React.createRef();
  }

  componentWillMount() {
    const { venueUrl } = this.props;
    if (!pages.landing[venueUrl]) {
      this.setState({ typeSelected: clientTypes.STANDING });
      // this.routeToMenu()
    }
  }

  routeToMenu() {
    const { venueUrl } = this.props;
    window.location = `/${venueUrl}/${routes.MENU}`;
  }

  stageTypeSelection(type) {
    this.setState({ typeSelected: type });
  }

  updateSeatedInputValue(e) {
    this.setState({
      seatedInput: e.target.value
    });
  }

  updateNameInputValue(e) {
    this.setState({
      nameInput: e.target.value
    });
  }

  render() {
    // eslint-disable-next-line
    const { setClientType, clientType, isLoading } = this.props;
    const { typeSelected, seatedInput, standingInput, nameInput } = this.state;

    return isLoading ? (
      <LoadingScreen />
    ) : (
      <div className="gradientBackground">
        <div className="landingCont">
          {/* <h2>Are you...</h2> */}

          <img
            className="wvLogo"
            src="/mryum_assets/wv_logo.svg"
            alt="winter village"
          />

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
            <p>
              <span>Step 1: </span>Verify your number so we can SMS you when
              your order is ready
            </p>
            <p>
              <span>Step 2: </span>View menu options, order, and pay on your
              phone
            </p>
            <p>
              <span>Step 3: </span>You'll receive an SMS when your order is
              ready to pickup
            </p>
          </div>

          <input
            className="collectInfo"
            type="text"
            placeholder="First name"
            onChange={this.updateNameInputValue}
          />
          {typeSelected ? (
            typeSelected === clientTypes.SEATED ? (
              <input
                className="collectInfo"
                type="text"
                value={this.state.seatedInput}
                placeholder={clientTypes.SEATED_INPUT}
                onChange={this.updateSeatedInputValue}
              />
            ) : typeSelected === clientTypes.STANDING ? (
              // <input className="collectInfo" type="text" placeholder={clientTypes.STANDING_INPUT} onChange={this.updateStandingInputValue}/>
              <PhoneInput
                country="AU"
                className="collectInfo"
                type="text"
                inputmode="numeric"
                value={this.state.standingInput}
                placeholder={"Mobile number"}
                onChange={standingInput => this.setState({ standingInput })}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <div className="disclaimer">
            <span>
              *All drinks to be ordered at the bar (because of boring liquor
              rules).
            </span>
          </div>

          {typeSelected ? (
            <div
              className="viewMenu"
              onClick={e => {
                const phoneNumber = phone(standingInput);
                if (
                  phoneNumber.length !== 0 &&
                  phoneNumber !== null &&
                  nameInput !== ""
                ) {
                  setClientType(typeSelected, {
                    customerName: nameInput,
                    tableNumber: seatedInput,
                    phone: phoneNumber[0]
                  });
                  // getTwilioCode(phoneNumber[0]);
                  this.routeToMenu();
                } else {
                  if (nameInput === "") {
                    toast.error(`Please enter your name`);
                  }
                  if (standingInput === "") {
                    toast.error(`Please enter a valid phone number`);
                  } else {
                    toast.error(
                      `${standingInput} does not look like a valid phone number`
                    );
                  }
                }
              }}
            >
              Got it!
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions, ...commonActions }, dispatch);

const mapStateToProps = state => ({
  clientType: state.persistentCommon.clientType,
  twilioRes: state.persistentCommon.twilioRes,
  isLoading: state.common.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
