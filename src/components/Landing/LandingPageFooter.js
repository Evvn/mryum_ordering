import React from 'react'
import Img from 'react-image'

class LandingPageFooter extends React.Component {

  render() {
    return(
      <div>
        <div className="footerCTA">
          <span className="footerCTAHeader">
            People are visual, menus should be too! <br/> Let's make ordering easy.
          </span>
          <div className="footerCTAs">
            <div className="heroCTA2">
              <form onSubmit={ this.props.saveEmail }>
                <input className="emailCollect" type="text" placeholder="Enter your email to stay in the loop"/>
                <button className="emailBtn" type='submit'><Img src="/landing_page/arrow-right-solid.svg" alt="" decode={false} /></button>
              </form>
            </div>
            <a href="https://pitchblak.typeform.com/to/RpSea1">
              <div className="heroCTA2">
                <span>Venues apply here, it's free!</span>
                <Img className="venueAppArr" src="/landing_page/arrow-right-solid.svg" alt="" decode={false} />
              </div>
            </a>
          </div>
        </div>

        <div className="footer">
          <Img src="/mryum_assets/Mr_Yum_logo_red.svg" alt="Mr Yum logo" decode={false} />

          <ul>
            <li>Contact us</li>
            <a href="/contact"><li className="contactLink">Get in touch with us</li></a>
          </ul>
          <ul>
            <li>Follow us</li>
            <li><a href="https://www.instagram.com/mryumapp/">Instagram</a></li>
            <li><a href="https://www.facebook.com/mryumapp/">Facebook</a></li>
          </ul>

          {/* Links to 'Resources' e.g. faq, t&c */}
          {/* <ul>
            <li>Resources</li>
            <li><a href="https://www.mryum.com.au/faq">FAQs</a></li>
            <li>Terms and Conditions</li>
          </ul> */}
        </div>

        <div className="copyright">
          <span>&copy;Mr Yum 2018 - All rights reserved</span>
        </div>
      </div>
    )
  }
}

export default LandingPageFooter
