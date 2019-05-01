import React from 'react'

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src="/mryum_assets/wv_logo.svg" alt="Mr Yum"/>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    )
  }
}

export default LoadingScreen
