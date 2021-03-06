import React from "react";
import JsxParser from "react-jsx-parser";
import Swipe from "react-easy-swipe";
import { toast } from "react-toastify";

import AddOnContainer from "./AddOnContainer";
//css
import "./styles/itemDetail.scss";

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swipeRight: false,
      stagedQuantity: 1,
      selectedAddOns: false
    };

    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);
    this.updateAddOns = this.updateAddOns.bind(this);
  }

  componentDidMount() {
    // iterate over each defined word
    document.querySelectorAll(".define").forEach(element => {
      // add click event listener to each defined word
      element.addEventListener("click", e => {
        if (document.querySelector(".prevDefinedWord") === null) {
          return;
        }
        // on click, show definition in modal - uses data attribute to store definition in word
        document.querySelector(".prevDefinedWord").textContent =
          e.target.textContent;
        document.querySelector(
          ".prevDefinitionText"
        ).textContent = e.target.getAttribute("data");
        document.querySelector(".prevDefinition").classList.remove("hidden");
        document.querySelector(".prevDefinition").classList.add("open");
        document.querySelector(".prevDefinition").classList.remove("fadeOut");
      });
    });
  }

  // defines swipe right event if swipe is greater than 75px long to prevent accidental swipes when scrolling
  onSwipeMove(position, event) {
    let swipeRight = false;
    if (position.x > 115) {
      swipeRight = true;
    }
    if (swipeRight) {
      this.setState({ swipeRight: swipeRight });
    }
  }

  // when swipe event is finished - fires onSwipeRight function to close preview
  onSwipeEnd(position, event) {
    if (this.state.swipeRight) {
      this.onSwipeRight();
    }
  }

  // calls swipe right event if swipe is greater than 175px long to prevent accidental swipes when scrolling
  onSwipeRight() {
    window.history.back();
  }

  handleAddToCart(details, stagedQuantity) {
    const { addToCart } = this.props;
    const { selectedAddOns } = this.state;
    addToCart(details, stagedQuantity, selectedAddOns);
    toast.success(`Added ${stagedQuantity} ${details.name}`);
  }

  handleClick(e) {
    if (e.target.className === "previewModal") {
      window.history.back();
    }
    if (e.target.className === "define") {
      return;
    }
    document.querySelector(".prevDefinition").classList.add("fadeOut");
    setTimeout(function() {
      document.querySelector(".prevDefinedWord").textContent = "";
      document.querySelector(".prevDefinitionText").textContent = "";
      document.querySelector(".prevDefinition").classList.add("hidden");
    }, 300);
  }

  incrementQuantity() {
    const { stagedQuantity } = this.state;
    this.setState({
      stagedQuantity: stagedQuantity + 1
    });
  }

  decrementQuantity() {
    const { stagedQuantity } = this.state;
    if (stagedQuantity > 1) {
      this.setState({
        stagedQuantity: stagedQuantity - 1
      });
    }
  }

  updateAddOns(addOnState) {
    this.setState({ selectedAddOns: addOnState });
  }

  render() {
    // eslint-disable-next-line
    const { details, lang, addToCart } = this.props;
    // eslint-disable-next-line
    const addons = details.addons;
    const { stagedQuantity } = this.state;
    let name = details.name;
    let desc = details.description;
    let translatedName = "name" + lang;
    let translatedDesc = "description" + lang.replace("-CN", "cn");
    let creditUrl;
    let img = details.image
      ? details.image[0].url
      : "/mryum_assets/missing_photo.jpg";

    if (lang !== "en") {
      name = details[translatedName];
      desc = details[translatedDesc];
    }

    if (details["image credit"]) {
      creditUrl =
        "https://www.instagram.com/" + details["image credit"].substr(1) + "/";
    }

    let backgroundImage;
    if (details.tags !== "LIST" && !!details.image) {
      backgroundImage = {
        backgroundImage: "url(" + img + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }

    return (
      <Swipe onSwipeMove={this.onSwipeMove} onSwipeEnd={this.onSwipeEnd}>
        <div className="previewModal" onClick={this.handleClick}>
          <div className="previewItem">
            {!!details.tags && details.tags[0] === "LIST" ? null : (
              <div className="previewImage" style={backgroundImage} />
            )}

            <div className="previewWrapper">
              {/* hidden definition modal */}
              <div className="prevDefinition hidden">
                <div className="prevDefinedWord" />
                <div className="prevDefinitionText" />
              </div>

              <div className="prevDefinition hidden">
                <div className="prevDefinedWord" />
                <div className="prevDefinitionText" />
              </div>

              {/* No image credit? Don't show this section */}
              {!!details["image credit"] &&
              !!details.Tags &&
              details.Tags[0] !== "LIST" ? (
                <div className="imageCredit">
                  <div className="imageCreditLabel">
                    photo by
                    <a className="imageCreditLink" href={creditUrl}>
                      {details["image credit"]}
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="previewName">{name}</div>

              <div className="previewDescription">
                <JsxParser jsx={`${desc}`} />
              </div>

              {details.addons ? (
                <AddOnContainer
                  addons={details.addons}
                  updateAddOns={this.updateAddOns}
                />
              ) : null}

              <div className="previewDetails">
                <div className="previewPrice">${details["price"]}</div>

                {/* Tags are LIST? Don't show */}
                {!!details.tags && details.tags[0] === "LIST" ? null : (
                  <div className="previewTags">
                    {!!details.tags ? details.tags.join(", ") : null}
                  </div>
                )}
              </div>

              <div className="quantityCont">
                <button
                  className="quantityBtn"
                  onClick={e => {
                    this.decrementQuantity();
                  }}
                >
                  -
                </button>

                <span className="quantity">{stagedQuantity}</span>

                <button
                  className="quantityBtn"
                  onClick={e => {
                    this.incrementQuantity();
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="addToOrderBtn"
                onClick={e => {
                  this.handleAddToCart(details, stagedQuantity);
                }}
              >
                Add {stagedQuantity} to Order
              </button>
            </div>
          </div>
        </div>
      </Swipe>
    );
  }
}

export default ItemDetail;
