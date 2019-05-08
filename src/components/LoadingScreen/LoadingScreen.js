import React from "react";

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src="/mryum_assets/wv_logo_white.svg" alt="Mr Yum" />
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
