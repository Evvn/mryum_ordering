import { createRouteNodeSelector } from 'redux-router5';
import {connect} from 'react-redux'
import React from 'react'
import LandingPageNav from './LandingPageNav.js'
import LandingPageFooter from './LandingPageFooter.js'
import SendEmail from './SendEmail.js'
import Airtable from 'airtable'

class LandingPageContact extends React.Component {

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

        <div className="hero contactHero">

          <LandingPageNav showHIW={false} />

          <div className="heroText">
            <span>Let's have a chat!</span>
            <span>We want to hear from you. Submit the form below and we'll be in touch soon.</span>

          </div>

        </div>

        <div className="emailForm">

          { <SendEmail /> }

        </div>

        <LandingPageFooter saveEmail={ this.props.saveEmail } />

      </div>
    )
  }
}

export default connect(createRouteNodeSelector('faq') )(LandingPageContact);
