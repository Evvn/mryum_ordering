import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footerCont">
        <div className="cta">
          <div className="mryum">
            <img src="/mryum_assets/wv_logo.svg" alt="Mr Yum" />
          </div>

          <h3>Did you know you can book an igloo for your next visit?</h3>

          <p>Check out our website to learn more and make your booking.</p>

          <a className="ctaBtn" href="https://thewintervillage.com.au/igloos">
            <span>Book an igloo!</span>
          </a>
        </div>

        <footer>Powered by Mr Yum © 2019</footer>
      </div>
    );
  }
}

export default Footer;
