import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import * as actions from './actions/actions.js'
import { clientTypes, routes } from '../Common/enums/commonEnums.js';
import classNames from 'classnames'

//css
import './styles/landing.scss'

class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.routeToMenu = this.routeToMenu.bind(this)
  }


  routeToMenu() {
    const { venueUrl} = this.props;
    window.location = `/${venueUrl}/${routes.MENU}`;
  }

  render() {
    const { setClientType, clientType } = this.props;

    return (
      <div className="landingCont">

        <h2>Are you...</h2>

        <div className="buttons">
          <button
            className={classNames(clientType && clientType === clientTypes.SEATED ? 'clientType selected' : 'clientType')}
            onClick={() => setClientType(clientTypes.SEATED)}
          >
            {clientTypes.SEATED}
          </button>
          <button
            className={classNames(clientType && clientType === clientTypes.STANDING ? 'clientType selected' : 'clientType')}
            onClick={() => setClientType(clientTypes.STANDING)}
          >
            {clientTypes.STANDING}
          </button>
        </div>

        <div className="instructions">
          <p>
            {
              clientType ?
                (
                  clientType === clientTypes.SEATED ? clientTypes.SEATED_INTRO :
                  clientType === clientTypes.STANDING ? clientTypes.STANDING_INTRO : ''
                )
              : <span>&nbsp;</span>
             }
          </p>
          <p>
            {
              clientType ?
                (
                  clientType === clientTypes.SEATED ? clientTypes.SEATED_INSTRUCTIONS :
                  clientType === clientTypes.STANDING ? clientTypes.STANDING_INSTRUCTIONS : ''
                )
              : <span>&nbsp;</span>
             }
          </p>
        </div>

        {
          clientType ?
            (
              clientType === clientTypes.SEATED ?
                <input className="collectInfo"type="text" placeholder={clientTypes.SEATED_INPUT}/> :
              clientType === clientTypes.STANDING ?
                <input className="collectInfo"type="text" placeholder={clientTypes.STANDING_INPUT}/> :
              ''
            )
          : ''
         }

        { clientType ? <div className="viewMenu" onClick={this.routeToMenu}>View menu</div> : '' }

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  clientType: state.persistentCommon.clientType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
