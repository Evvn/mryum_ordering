// 404 page featuring Johnny boy
import React from "react";

class Closed extends React.Component {
  render() {
    return (
      <div className="loading">
        <img
          className="pnf"
          src="/mryum_assets/wv_logo_white.svg"
          alt="Mr Yum"
        />
        <div>
          <h2 className="pnf">Sorry, the kitchen is closed!!</h2>
          <h3 className="pnf">Kitchen hours are currently:</h3>
          <h3 className="pnf">
            <span>Monday to Thursday</span>
            <span>12pm - 10pm</span>
          </h3>
          <h3 className="pnf">
            <span>Friday & Saturday</span>
            <span>11am - Midnight</span>
          </h3>
          <h3 className="pnf">
            <span>Sunday</span>
            <span>11am - 11pm</span>
          </h3>
        </div>
        {/* <img className="lost" src="/mryum_assets/lost.gif" alt="404"/> */}
      </div>
    );
  }
}

export default Closed;
