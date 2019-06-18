import * as actions from "./components/Common/actions/actions.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router"; // react-router v4
import React from "react";
// import Landing from "./components/Landing/Landing.js";
import MenuContainer from "./components/Menu/MenuContainer.js";
import CartContainer from "./components/Cart/CartContainer.js";
import NotFound from "./components/NotFound/NotFound.js";
import ServerError from "./components/NotFound/ServerError.js";
import Closed from "./components/NotFound/Closed.js";
// import LoadingScreen from "./components/LoadingScreen/LoadingScreen.js";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga";
// import { loggerPlugin } from "router5";
ReactGA.initialize("UA-129043240-2");
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends React.Component {
  // componentWillMount() {
  //   const { getVenueNames, venueNames } = this.props;
  //   if (!venueNames) {
  //     getVenueNames();
  //   }
  // }

  componentWillUnmount() {
    localStorage.clear("persist:persistedStore");
  }

  routeTo(suffix) {
    window.location = `/${suffix}`;
  }

  render() {
    // eslint-disable-next-line
    // const { router, venueNames, isLoading } = this.props;
    const date = new Date();
    const hour = date.getHours();
    const dayIndex = date.getDay();

    /// to do - move kitchen opening times to database, no more hard coding
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[dayIndex];

    let isOpen = false;
    if (day === "Mon" || day === "Tue" || day === "Wed" || day === "Thu") {
      if (hour >= 12 && hour < 22) {
        isOpen = true;
      }
    }
    if (day === "Fri" || day === "Sat") {
      if (hour >= 11) {
        isOpen = true;
      }
    }
    if (day === "Sun") {
      if (hour >= 11 && hour < 23) {
        isOpen = true;
      }
    }

    // FOR DEV
    if (process.env.REACT_APP_REDUX_DEV_TOOLS === "true") {
      isOpen = true;
    }

    // const path = router.location.pathname.split('/')[1];
    // const showMenu = venueNames ? venueNames.includes(path) ? true : false : false;
    return (
      <Router>
        <div>
          <ToastContainer
            position={toast.POSITION.TOP_CENTER}
            autoClose={1500}
          />
          {/* {isLoading ? <LoadingScreen /> : ""} */}
          {isOpen ? (
            <Switch>
              {/* <Route
                exact
                path="/:venueurl/landing"
                component={({ match }) => (
                  <Landing
                    venueUrl={match.params.venueurl}
                    routeTo={this.routeTo}
                  />
                )}
              /> */}
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
                  <CartContainer venueUrl={match.params.venueurl} />
                )}
              />
              {/* for wv */}
              <Route
                exact
                path="/wv"
                component={({ match }) => (
                  <MenuContainer venueUrl={"wv"} itemId={false} />
                )}
              />
              <Route
                exact
                path="/"
                component={({ match }) => (
                  <MenuContainer venueUrl={"wv"} itemId={false} />
                )}
              />
              <Route
                exact
                path="/servererror"
                component={({ match }) => <ServerError />}
              />
              <Route component={NotFound} />
            </Switch>
          ) : (
            <Route component={Closed} />
          )}
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  router: state.router,
  venueNames: state.persistentCommon.venueNames,
  isLoading: state.common.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
