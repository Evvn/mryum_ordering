import React from 'react'

class Water extends React.Component {
  render() {
    return(
      <div
        className='menuItem water tiny'
        filters="filters undefined"
        id="999"
      >
        <div
          className="leftBox"
          id="999"
          style={{
            backgroundImage: "url('/mryum_assets/water.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}
        />

        <div className="rightBox" id="999">
          <h3 className="title" id="999">
            Water (sorry)
          </h3>
          <p className="bodyText" id="999">
            It looks like there's nothing on the menu for you! Jokes. Chat
            to the staff and they’ll be able to help.{" "}
            <span role="img" aria-label="smile" style={{ lineHeight: 0 }}>
              🙂
            </span>
          </p>
          <div className="info" id="999">
            <span className="price" id="999">
              Free
            </span>
            <span className="tags" id="999" />
          </div>
        </div>
      </div>
    )
  }
}

export default Water
