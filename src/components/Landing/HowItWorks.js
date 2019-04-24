// 'how it works' section for landing page
import React from 'react'

class HowItWorks extends React.Component {
  render() {
    return(
      <div className="howItWorksCont" id="hiw">

        <h2>How it works</h2>

        <div className="steps">
          <div className="step">
            <h3><span className="stepNum">01</span>Head to one of our participating venues.</h3>
            <img src="/landing_page/howItWorks/step1.jpg" alt="walking"/>
          </div>

          <div className="step">
            <h3><span className="stepNum">02</span>Scan the QR code or type in the URL on the printed menu to view their Mr Yum mobile menu.</h3>
            <img src="/landing_page/howItWorks/step2.jpg" alt="phones"/>
          </div>

          <div className="step">
            <h3><span className="stepNum">03</span>Scroll through a menu with beautiful photos, ingredient definitions, dietary filtering and language translations. Yummineess awaits!</h3>
            <img src="/landing_page/howItWorks/step3.jpg" alt="party"/>
          </div>
        </div>

      </div>
    )
  }
}

export default HowItWorks
