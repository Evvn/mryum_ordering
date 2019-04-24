import React from 'react'

class Modal extends React.Component {
  render() {
    const { heading, body, cta, onClick } = this.props

    return(
      <div className="modalCont">
        <div className="modalInner">
          <h2 className="modalHeading">{ heading }</h2>
          <p className="modalBody">{ body }</p>
          <div className="modalCta" onClick={ () => {onClick()} }>{ cta }</div>
        </div>
      </div>
    )
  }
}

export default Modal
