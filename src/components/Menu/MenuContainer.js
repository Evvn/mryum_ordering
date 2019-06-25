import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HorizontalScrollNav from "../Common/HorizontalScrollNav";
import Filter from "./Filter.js";
import LanguageSelect from "./LanguageSelect.js";
import Menu from "./Menu";
// import { persistStore } from 'redux-persist'
import Footer from "./Footer";
import MenuSearch from "../Common/MenuSearch";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import * as actions from "./actions/actions.js";
import * as cartActions from "../Cart/actions/actions.js";
import * as commonActions from "../Common/actions/actions.js";
import classNames from "classnames";
// import ReactGA from 'react-ga'
import CategorySelect from "../CategorySelect/CategorySelect.js";

import "./styles/menuContainer.scss";

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    const paramArray = window.location.href.split("/");
    this.params = {
      requestedVenue: paramArray[3],
      item:
        paramArray.length === 5
          ? paramArray[4] === "qr" ||
            paramArray[4] === "test" ||
            paramArray[4] === "menu"
            ? false
            : paramArray[4]
          : false
    };

    this.routeToItemDetail = this.routeToItemDetail.bind(this);
  }

  componentWillMount() {
    const {
      venue,
      getMenuData,
      bffRes,
      itemId,
      setItemId,
      clearSectionPositions,
      venueUrl
    } = this.props;

    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/wv"
    ) {
      window.location.pathname = "/wv/menu";
    } else {
      if (!bffRes || venue !== venueUrl) {
        document.title = "Mr Yum";
        getMenuData(venueUrl);
        clearSectionPositions();
      } else {
        // replace with actual venue name from bff res
        document.title = `Winter Village Menu`;
      }
      if (this.params.item !== itemId) {
        setItemId(this.params.item);
      }
    }
  }

  componentWillUpdate() {
    const {
      venue,
      venueUrl,
      getMenuData,
      bffRes,
      itemId,
      setItemId,
      clearSectionPositions
    } = this.props;

    if (!bffRes || venue !== venueUrl) {
      getMenuData(venueUrl);
      clearSectionPositions();
    }

    if (this.params.item !== itemId) {
      setItemId(this.params.item);
    }
  }

  componentWillUnmount() {
    const { clearSectionPositions } = this.props;
    clearSectionPositions();
    window.scrollTo(0, 0);
    //persistStore(this.props).purge();
  }

  routeToItemDetail(e, id, lang) {
    //const { setItemId } = this.props;
    const newId = id ? id : false;
    const refSuffix = newId ? `/${id}` : "";
    window.location = window.location.href + `${refSuffix}`;
  }

  openCart() {
    const { venueUrl } = this.props;
    window.location = `/${venueUrl}/cart`;
  }

  getHeader() {
    const {
      // bffRes,
      sectionPositions,
      filter,
      updateFilter,
      updateLang,
      lang,
      itemId,
      category,
      currentOrder,
      searchLength
      // setCategory,
      // venueUrl,
    } = this.props;
    // const venueName = bffRes ? Object.values(bffRes.menuByItem)[0].fields.Venue : false;
    const itemView = itemId ? true : false;
    const filtersInUse = Object.values(filter).includes(true);
    const cartInUse = Object.keys(currentOrder).length > 0 ? true : false;
    const searchInUse = searchLength > 0 ? true : false;

    // replace venues.wv when we have a real bff res
    // {venues[venueUrl]}

    return (
      <div>
        <header
          className={classNames("header", itemView ? "previewHeader" : "")}
        >
          {/* back arrow for routing, control this and venuename via props */}
          {itemView ? (
            <img
              onClick={() => {
                window.history.back();
              }}
              src="/icons/arrow-left-solid-white.svg"
              className="headerBackArrow"
              alt="back arrow"
            />
          ) : null}
          {/* { category && !!venueUrl && !itemView? <img onClick={() => {setCategory(false)}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/> : null } */}
          {category && !itemView ? (
            <h1 className="venue">Winter Village</h1>
          ) : null}
          {!itemView && (
            <Filter filter={filter} updateFilter={updateFilter} lang={lang} />
          )}
          {category && !itemView && !filtersInUse && !searchInUse ? (
            <HorizontalScrollNav sectionPositions={sectionPositions} />
          ) : (
            ""
          )}
          {!itemView && <LanguageSelect lang={lang} updateLang={updateLang} />}
          <img
            onClick={e => {
              this.openCart();
            }}
            className="cartIcon"
            src="/icons/cart_icon.svg"
            alt="cart"
          />

          {cartInUse && <div className="cartBadge" />}
        </header>
      </div>
    );
  }

  render() {
    const {
      filter,
      lang,
      bffRes,
      isLoading,
      setSectionPosition,
      itemId,
      category,
      setCategory,
      addToCart,
      searchTerm,
      setSearchRes,
      searchLength,
      searchRes
    } = this.props;
    const itemView = itemId ? true : false;
    const searchInUse = searchLength > 0 ? true : false;

    return isLoading || !bffRes ? (
      <LoadingScreen />
    ) : (
      <div className="Menu">
        {this.getHeader()}
        {!itemView && (
          <MenuSearch
            data={bffRes}
            hide={false}
            onInput={result => result}
            setSearchRes={setSearchRes}
            searchInUse={searchInUse}
          />
        )}
        {category ? (
          <div className="menu">
            <Menu
              menuItemKeys={Object.keys(bffRes.menuByCategory[category])}
              menuItems={bffRes.menuByCategory[category]}
              filter={filter}
              lang={lang}
              itemId={itemId}
              routeToItemDetail={this.routeToItemDetail}
              setSectionPosition={setSectionPosition}
              addToCart={addToCart}
              searchInUse={searchInUse}
              searchTerm={searchTerm}
              searchRes={searchRes}
            />
            {searchInUse && searchRes.length === 0 ? (
              <div className="noSearchRes">
                <img
                  src="/icons/no_results.svg"
                  alt=""
                  className="searchFace"
                />
                <p>Sorry, looks like there are no results.</p>
                <p>Try something else!</p>
              </div>
            ) : (
              ""
            )}
            <Footer />
          </div>
        ) : (
          <CategorySelect
            categories={Object.keys(bffRes.menuByCategory)}
            setCategory={setCategory}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...actions, ...cartActions, ...commonActions },
    dispatch
  );

const mapStateToProps = state => ({
  bffRes: state.persistentMenu.bffRes,
  category: state.persistentMenu.category,
  isLoading: state.common.isLoading,
  venue: state.persistentMenu.venue,
  sectionPositions: state.menu.sectionPositions,
  filter: state.persistentMenu.filter,
  lang: state.persistentMenu.lang,
  setCategory: state.persistentMenu.setCategory,
  currentOrder: state.persistentCart.currentOrder,
  clientInfo: state.persistentCommon.clientInfo,
  searchTerm: state.common.searchTerm,
  searchRes: state.common.searchRes,
  searchLength: state.common.searchLength
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer);
