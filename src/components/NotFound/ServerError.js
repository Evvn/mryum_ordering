// 404 page featuring Johnny boy
import React from 'react'

class ServerError extends React.Component {

  render() {
    return(
      <div className="loading">
        <img className="pnf" src="/mryum_assets/wv_logo_white.svg" alt="Mr Yum"/>
        <div>
          <h2 className="pnf">Network error :( <br/><br/> Sorry! Please try again in a few minutes.</h2>
        </div>
        {/* <img className="lost" src="/mryum_assets/lost.gif" alt="404"/> */}
      </div>
    )
  }
}

export default ServerError
