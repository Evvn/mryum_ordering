import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import * as actions from './actions/actions.js'
import { clientTypes, routes } from '../Common/enums/commonEnums.js';
import classNames from 'classnames'

//css
import './landing.scss'

class Landing extends React.Component {

  componentWillMount(){
    const { clientType, venueUrl, routeTo } = this.props;
    if (clientType) {
      console.log(clientType);
      // window.location = `/${venueUrl}/${routes.MENU}`;
    }
  }

  componentWillUpdate(){
    const { clientType, venueUrl, routeTo } = this.props;
    if (clientType) {
      console.log(clientType);
      // window.location = `/${venueUrl}/${routes.MENU}`;
    }
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
          <p>Nice legs!</p>
          <p>Enter your mobile number below to receive an sms when your order is ready.</p>
        </div>

        <input className="collectInfo"type="text" placeholder={'Your mobile number'}/>

        <div className="viewMenu">
          View menu
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  clientType: state.persistentCommon.clientType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
