import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import * as actions from './actions/actions.js'
import { clientTypes, routes } from '../Common/enums/commonEnums.js';

class Landing extends React.Component {

  componentWillMount(){
    const { clientType, venueUrl, routeTo } = this.props;
    if (clientType) {
      window.location = `/${venueUrl}/${routes.MENU}`;
    }
  }

  componentWillUpdate(){
    const { clientType, venueUrl, routeTo } = this.props;
    if (clientType) {
      window.location = `/${venueUrl}/${routes.MENU}`;
    }
  }

  render() {
    const { setClientType, clientType } = this.props;
    return (
      <div>
        <h1>Landing</h1>
        <div>
          <button style={{cursor:'pointer'}} onClick={() => setClientType(clientTypes.SEATED)}>
            {clientTypes.SEATED}
          </button>
          <button style={{cursor:'pointer'}} onClick={() => setClientType(clientTypes.STANDING)}>
            {clientTypes.STANDING}
          </button>
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
