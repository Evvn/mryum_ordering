import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './components/Common/actions/actions.js';
import { Route, Switch } from 'react-router' // react-router v4
import PropTypes from 'prop-types';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Landing/Home.js';
import Contact from './components/Landing/Contact.js';
import FAQ from './components/Landing/FAQ.js';
import MenuContainer from './components/Menu/MenuContainer.js';
import NotFound from './components/NotFound/NotFound.js';
import Brunch from './components/CategorySelection/Brunch.js';
import LoadingScreen from './components/LoadingScreen/LoadingScreen.js';


class App extends React.Component {

  componentWillMount() {
    const { getVenueNames, venueNames } = this.props
    if (!venueNames) {
      getVenueNames();
    }
  }

  componentWillUnmount(){
    localStorage.clear('persist:persistedStore')
  }

  render() {
    const { router, venueNames, isLoading } = this.props
    const path = router.location.pathname.split('/')[1];
    const showMenu = venueNames ? venueNames.includes(path) ? true : false : false;
    return isLoading ? <LoadingScreen/> :
    (
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/brunch" component={Brunch} />
          <Route path="/:venue" component={ showMenu  ? MenuContainer : NotFound } />
          <Route path="/:venue/:item" component={MenuContainer} />
          <Route component={NotFound} />
      </Switch>
    );
  }
}

App.propTypes = {
  // I removed the .isRequired from the end of the last line, could cause problems? Fixes an error that was being thrown
  moduleMappings: PropTypes.objectOf(PropTypes.object),
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  router: state.router,
  venueNames: state.persistentCommon.venueNames,
  isLoading: state.common.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
