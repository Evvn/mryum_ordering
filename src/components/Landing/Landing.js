// not being used, ref. for boiler

import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions.js'
import Home from './Home.js';
import Contact from './Contact.js';
import FAQ from './FAQ.js';

class App extends React.Component {

  render() {
    const { route, setLandingRoute } = this.props;

    switch (route) {
      case 'home':
        return <Home setLandingRoute={setLandingRoute} />
      case 'contact':
        return <Contact setLandingRoute={setLandingRoute} />
      case 'faq':
        return <FAQ setLandingRoute={setLandingRoute} />
      default:
        return <Home setLandingRoute={setLandingRoute} />
    }
  }
}

// redux component boiler 
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  route: state.route,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
