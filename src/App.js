import * as actions from './components/Common/actions/actions.js';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { BrowserRouter as Router} from "react-router-dom";
import { Route, Switch } from 'react-router' // react-router v4
import React from 'react';
import Landing from './components/Landing/Landing.js';
import MenuContainer from './components/Menu/MenuContainer.js';
import CartContainer from './components/Cart/CartContainer.js';
import NotFound from './components/NotFound/NotFound.js';
import LoadingScreen from './components/LoadingScreen/LoadingScreen.js';
import './App.css';

class App extends React.Component {

  componentWillMount() {
    const { getVenueNames, venueNames } = this.props
    /*if (!venueNames) {
      getVenueNames();
    }*/
  }

  componentWillUnmount(){
    localStorage.clear('persist:persistedStore')
  }

  routeTo(suffix){
    window.location = `/${suffix}`;
  }

  render() {
    const { router, venueNames, isLoading } = this.props
    // const path = router.location.pathname.split('/')[1];
    // const showMenu = venueNames ? venueNames.includes(path) ? true : false : false;
    return (
      <Router>
      <div>
        {isLoading ? <LoadingScreen/> : ''}
        <Switch>
        <Route
              exact
              path="/:venueurl/landing"
              component={({ match }) => (
                <Landing
                  venueUrl={match.params.venueurl}
                  routeTo={this.routeTo}
                />
              )}
          />
        <Route
              exact
              path="/:venueurl/menu"
              component={({ match }) => (
                <MenuContainer
                  venueUrl={match.params.venueurl}
                  itemId={false}
                />
              )}
          />
        <Route
              exact
              path="/:venueurl/menu/:itemId"
              component={({ match }) => (
                <MenuContainer
                  venueUrl={match.params.venueurl}
                  itemId={match.params.itemId}
                />
              )}
          />
        <Route
            exact
            path="/:venueurl/cart"
            component={({ match }) => (
              <CartContainer
                venueUrl={match.params.venueurl}
              />
            )}
        />
        <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  router: state.router,
  venueNames: state.persistentCommon.venueNames,
  isLoading: state.common.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
