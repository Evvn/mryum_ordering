import React from 'react'
import Img from 'react-image'
import AnchorLink from 'react-anchor-link-smooth-scroll'

class LandingPageNav extends React.Component {

  render() {
    return(
      <div className="nav">
        {/* <Link to="/" className="homeLink"><Img src="Mr_Yum_logo_white.svg" alt="Mr Yum" className="navlogo" decode={false} /></Link> */}

        <a href="/">
          <Img src="/mryum_assets/Mr_Yum_logo_white.svg" alt="Mr Yum" className="navlogo" decode={false} />
        </a>

        { this.props.showHIW ?
          <AnchorLink className="hiwLink" href='#hiw' >How it works</AnchorLink>
          : null}

        <a href="/faq" className="aboutLink">FAQs</a>

        <a href="/contact" className="contactLink">Contact</a>

        <a className="venueLink" href="https://pitchblak.typeform.com/to/RpSea1">
          <div className="venueRegistrationCTA">
            <span>Venues apply here, it's free!</span>
          </div>
        </a>

      </div>
    )
  }
}

export default LandingPageNav
