import React from 'react'
import JsxParser from 'react-jsx-parser'
import Swipe from "react-easy-swipe";

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      swipeRight: false
    }

    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);
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
      this.setState({
        swipeRight: swipeRight
      });
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
    window.history.back()
  }

  handleClick(e) {
    if (e.target.className === 'previewModal') {
      window.history.back()
    }
    if (e.target.className === "define") {
      return
    }
    document.querySelector(".prevDefinition").classList.add("fadeOut");
    setTimeout(function() {
      document.querySelector(".prevDefinedWord").textContent = "";
      document.querySelector(".prevDefinitionText").textContent = "";
      document.querySelector(".prevDefinition").classList.add("hidden");
    }, 300);
  }

  render() {
    const { details, lang } = this.props
    let name = details['Item Name']
    let desc = details['Item Description']
    let translatedName = 'name-' + lang
    let translatedDesc = 'description-' + lang
    let creditUrl
    let img = details['Image'] ? details['Image'][0].url : '/mryum_assets/missing_photo.jpg'

    if (lang !== 'en') {
      name = details[translatedName]
      desc = details[translatedDesc]
    }

    if (details['image credit']) {
      creditUrl = 'https://www.instagram.com/' + details['image credit'].substr(1) + '/'
    }

    let backgroundImage
    if (details.Tags !== 'LIST' && !!details.Image) {
      backgroundImage = {
        backgroundImage: 'url(' + img + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }

    return (
      <Swipe
        onSwipeMove={this.onSwipeMove}
        onSwipeEnd={this.onSwipeEnd}
      >
        <div className='previewModal' onClick={this.handleClick}>

          <div className="previewItem">

            { !!details.Tags && details.Tags[0] === 'LIST' ? null :
              <div className="previewImage" style={ backgroundImage }></div>
            }

            <div className="previewWrapper">

              {/* hidden definition modal */}
              <div className="prevDefinition hidden">
                <div className="prevDefinedWord" />
                <div className="prevDefinitionText" />
              </div>

              <div className="prevDefinition hidden">
                <div className="prevDefinedWord"></div>
                <div className="prevDefinitionText"></div>
              </div>

              {/* No image credit? Don't show this section */}
              { !!details['image credit'] && !!details.Tags && details.Tags[0] !== 'LIST' ?
                <div className="imageCredit">
                  <div className="imageCreditLabel">photo by
                    <a className="imageCreditLink" href={creditUrl}>{details['image credit']}</a>
                  </div>
                </div>
                : null }

              <div className="previewName">{name}</div>

              <div className="previewDescription">
                <JsxParser
                  jsx={
                    `${desc}`
                  }
                />
              </div>

              <div className="previewDetails">
                <div className="previewPrice">{details['Price']}</div>

                {/* Tags are LIST? Don't show */}
                { !!details.Tags && details.Tags[0] === 'LIST' ? null :
                  <div className="previewTags">{ !!details.Tags ? details.Tags.join(', ') : null }</div>
                }
              </div>

            </div>

          </div>

        </div>
      </Swipe>
    )
  }
}

export default ItemDetail
