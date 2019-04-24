import React from 'react';
import Img from 'react-image';
import HowItWorks from './HowItWorks.js';
import LandingPageNav from './LandingPageNav.js';
import LandingPageFooter from './LandingPageFooter.js';
import Airtable from 'airtable'

class LandingPageHome extends React.Component {

  // function to log email registrations in airtable
  saveEmail(e) {
    e.preventDefault()
    let email = e.target.firstChild.value
    if (email === '') {
      return
    }

    // log emails from landing page
    let base = Airtable.base(process.env.REACT_APP_AIRTABLE_DB);

    // log timestamp in db here
    base('Registrations').create({
      "email": email,
      "venue": "website registration - post BFF integration"
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      document.querySelectorAll('.emailCollect').forEach((eC) => {
        eC.value = "Check out some of our featured menus!"
        eC.disabled = true
      })
      document.querySelectorAll('.emailBtn').forEach((eB) => {
        eB.disabled = true
        eB.classList.add('tiny')
      })
    });
  }

  render() {
    return(
      <div className="landingPage">

        <div className="hero">

          <LandingPageNav showHIW={true} />

          <div className="heroText">
            <span>Mr Yum helps you decide what to order.</span>
            <span>Beautiful, mobile menus with photos of every dish, ingredient definitions and language translations.</span>

            <div className='heroCTA'>
              <form onSubmit={ this.props.saveEmail }>
                <input className="emailCollect" type="text" placeholder="Enter your email to stay in the loop"/>
                <button className="emailBtn" type='submit'><Img src="/landing_page/arrow-right-solid.svg" alt="" decode={false} /></button>
              </form>
            </div>
          </div>

          <div className="heroGif">
            <Img src="/landing_page/mockups_mobile.png" alt="Phone preview" height="100%"/>
          </div>

        </div>

        <div className="logos">

          <span className="venuesHeader">Click on the logos to experience some of our menus!</span>

          <div className="logoCarousel">
            <a href="https://www.mryum.com.au/onda"><Img src="/venueLogos/Onda_logo.png" alt="Onda"/></a>

            <a href="https://www.mryum.com.au/addict"><Img src="/venueLogos/addict_logo.png" alt="addict"/></a>

            <a href="https://www.mryum.com.au/sircharles"><Img src="/venueLogos/Sir_Charles_logo.png" alt="Sir Charles"/></a>

            <a href="https://www.mryum.com.au/madrasbrothers"><Img src="/venueLogos/madras_logo.png" alt="madras brothers"/></a>

            <a href="https://www.mryum.com.au/threebagsfull"><Img src="/venueLogos/3bf.svg" alt="3 bags full" width="100%" height="100%" decode={false} /></a>

            <a href="https://www.mryum.com.au/holla"><Img src="/venueLogos/holla_logo.png" alt="holla"/></a>

            {/* Few other venue logos */}

            {/* <a href="https://www.mryum.com.au/streat"><Img src="/venueLogos/Cromwell.png" alt="streat"/></a> */}

            {/* <a href="https://www.mryum.com.au/senstorm"><Img src="/venueLogos/senstorm.png" alt="senstorm"/></a> */}

            {/* <a href="https://www.mryum.com.au/lmo"><Img src="/venueLogos/LMO.png" alt="lmo"/></a> */}

            {/* <a href="https://www.mryum.com.au/newjaffa"><Img src="/venueLogos/newjaffa_logo.png" alt="New Jaffa"/></a> */}

          </div>

        </div>

        <div className="cards">
          <div className="subHeading">
            <span>Menus are confusing. <br/> What's the portion size? What does it look like? What's this ingredient? <br/><br/> Mr Yum puts an end to...</span>
          </div>

          <div className="cardOdd">
            <div className="cardImage">
              <Img src="/landing_page/online_stalking.jpg" alt="online-stalking" width="100%" />
            </div>

            <div className="cardText">
              <span className="cardNumber">01</span>

              <span className="cardHeading">Online stalking</span>

              <span className="cardBody">
                Playing an investigative matching game between the menu in front of you and Instagram food images.
              </span>

            </div>
          </div>

          <div className="cardEven">
            <div className="cardImage">
              <Img src="/landing_page/ingredients.jpg" alt="ingredients" width="100%" />
            </div>

            <div className="cardText">
              <span className="cardNumber">02</span>

              <span className="cardHeading">Ingredient confusion</span>

              <span className="cardBody">
                Not recognising half the ingredients on a dish… Like... <span className="changeWords">milk crumb</span>??
              </span>

            </div>
          </div>

          <div className="cardOdd">
            <div className="cardImage">
              <Img src="/landing_page/food_perv.jpg" alt="food perv" width="100%" />
            </div>

            <div className="cardText">
              <span className="cardNumber">03</span>

              <span className="cardHeading">Food perving</span>

              <span className="cardBody">
                Creepily scanning the room to see what other people’s food looks like.
              </span>

            </div>
          </div>

          <div className="cardEven">
            <div className="cardImage">
              <Img src="/landing_page/same_order.jpg" alt="same boring order" width="100%" />
            </div>

            <div className="cardText">
              <span className="cardNumber">04</span>

              <span className="cardHeading">Same boring order</span>

              <span className="cardBody">
                Always ordering same damn thing because you’re worried about trying something you'll regret. "F**k it, I’ll just get the avo on toast”.
              </span>

            </div>
          </div>

          <div className="cardOdd">
            <div className="cardImage">
              <Img src="/landing_page/food_envy.jpg" alt="food envy" width="100%" />
            </div>

            <div className="cardText">
              <span className="cardNumber">05</span>

              <span className="cardHeading">Food envy</span>

              <span className="cardBody">
                Getting FOMO when the food arrives because your friend ordered something way better than you.
              </span>

            </div>
          </div>

          <HowItWorks />

          <LandingPageFooter saveEmail={this.props.saveEmail} />

        </div>

      </div>
    )
  }
}

export default LandingPageHome;
