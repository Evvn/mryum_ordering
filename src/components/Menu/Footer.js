import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <div className="footerCont">

        <div className="cta">
          <div className="mryum">
            <img src="/mryum_assets/Mr_Yum_logo_red.svg" alt="Mr Yum"/>
          </div>

          <h3>Are you loving Mr Yum's visual menus?</h3>

          <p>Check out our website to learn more and discover other participating venues.</p>

          <a className='ctaBtn' href="/">
            <span>Check it out!</span>
          </a> 
        </div>

        <footer>©Copyright Mr Yum 2018</footer>
      </div>
    )
  }
}

export default Footer
