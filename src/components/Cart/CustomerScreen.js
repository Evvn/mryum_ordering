import React from "react";
import phone from "phone";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
// import { loggerPlugin } from "router5";

class CustomerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeSelected: "Standing",
      seatedInput: "",
      standingInput: "",
      nameInput: ""
    };

    this.updateNameInputValue = this.updateNameInputValue.bind(this);
    this.updateSeatedInputValue = this.updateSeatedInputValue.bind(this);
  }

  componentDidMount() {
    const { clientInfo } = this.props;
    if (clientInfo.customerName) {
      this.setState({ nameInput: clientInfo.customerName });
    }
    if (clientInfo.phone) {
      this.setState({ standingInput: clientInfo.phone });
    }
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
    const { typeSelected, nameInput, seatedInput, standingInput } = this.state;
    const { closeCustomerScreen, setCustomerDetails } = this.props;

    return (
      <div className="customerScreenCont">
        <header className="header">
          <h1 className="venue">Winter Village</h1>
          <img
            onClick={closeCustomerScreen}
            src="/icons/arrow-left-solid-white.svg"
            className="headerBackArrow"
            alt="back arrow"
          />
        </header>
        <h2 className="cartHeading customerHeading">Your Pickup Details</h2>
        <div className="paymentHeading">Name</div>
        <input
          className="collectInfo customerName"
          type="text"
          placeholder="First name"
          value={nameInput}
          onChange={e => this.updateNameInputValue(e)}
        />
        <div className="paymentHeading">Number for SMS notification</div>
        {typeSelected ? (
          typeSelected === "Seated" ? (
            <input
              className="collectInfo"
              type="text"
              value={seatedInput}
              placeholder={"Table number"}
              onChange={e => this.updateSeatedInputValue(e)}
            />
          ) : typeSelected === "Standing" ? (
            <PhoneInput
              country="AU"
              className="collectInfo"
              type="text"
              inputMode="numeric"
              value={standingInput}
              placeholder={"Mobile number"}
              onChange={standingInput => {
                this.setState({ standingInput });
              }}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <button
          className="payNowBtn"
          onClick={e => {
            const phoneNumber = phone(standingInput);
            if (
              phoneNumber.length !== 0 &&
              phoneNumber !== null &&
              nameInput !== ""
            ) {
              setCustomerDetails(
                typeSelected,
                nameInput,
                seatedInput,
                phoneNumber[0]
              );
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
          Continue
        </button>
      </div>
    );
  }
}

export default CustomerScreen;
