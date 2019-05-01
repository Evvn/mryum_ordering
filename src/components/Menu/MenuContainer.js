import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import HorizontalScrollNav from '../Common/HorizontalScrollNav';
import Filter from './Filter.js';
import LanguageSelect from './LanguageSelect.js';
import Menu from './Menu';
// import { persistStore } from 'redux-persist'
import Footer from './Footer';
// import MenuSearch from '../Common/MenuSearch';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import * as actions from './actions/actions.js';
import * as cartActions from '../Cart/actions/actions.js';
import classNames from 'classnames'
// import ReactGA from 'react-ga'
import { venues } from '../Common/enums/commonEnums.js';

import CategorySelect from '../CategorySelect/CategorySelect.js';

class MenuContainer extends React.Component {
  constructor(props) {
    super(props)

    const paramArray = window.location.href.split('/');
    this.params = {
       requestedVenue: paramArray[3],
       item: paramArray.length === 5 ? paramArray[4] === 'qr' || paramArray[4] === 'test' || paramArray[4] === 'menu' ? false : paramArray[4] : false,
    }

    this.routeToItemDetail = this.routeToItemDetail.bind(this)
  }

 componentWillMount() {
   const { venue, getMenuData, bffRes, itemId, setItemId, clearSectionPositions, venueUrl } = this.props;;
   if (!bffRes || venue !== venueUrl) {
    document.title = "Mr Yum";
     getMenuData(venueUrl);
     clearSectionPositions();
   } else{
    //const venueName = Object.values(bffRes)[0].fields.Venue;
    document.title = venueUrl + " Menu";
   }
   if(this.params.item !== itemId){
     setItemId(this.params.item)
   }
 }

 componentWillUpdate() {
   const { venue, venueUrl, getMenuData, bffRes, itemId, setItemId, clearSectionPositions } = this.props;
   if (!bffRes || venue !== venueUrl) {
     getMenuData(venueUrl);
     clearSectionPositions();
   }

   if(this.params.item !== itemId){
     setItemId(this.params.item)
   }
 }

 componentWillUnmount() {
   const { clearSectionPositions } = this.props;
   clearSectionPositions();
   window.scrollTo(0,0)
   //persistStore(this.props).purge();
 }

 routeToItemDetail(e, id, lang) {
   //const { setItemId } = this.props;
   const newId = id ? id : false;
   const refSuffix = newId ? `/${id}` : '';
   window.location = window.location.href + `${refSuffix}`
 }

 openCart(){
   const { venueUrl } = this.props;
  window.location = `/${venueUrl}/cart`;
 }


  getHeader(){
    const {
      sectionPositions,
      filter,
      updateFilter,
      updateLang,
      lang,
      itemId,
      venueUrl,
      category,
      setCategory,
    } = this.props;
    // const venueName = bffRes ? Object.values(bffRes.menuByItem)[0].fields.Venue : false;
    const itemView = itemId ? true : false;
    const filtersInUse = Object.values(filter).includes(true)

    // replace venues.wv when we have a real bff res
    // {venues[venueUrl]}

    return (
      <div>
        <header className={ classNames('header', itemView ? 'previewHeader' : '') }>
          {/* back arrow for routing, control this and venuename via props */}
          { itemView ? <img onClick={() => {window.history.back()}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/> : null }
          { category && !!venueUrl && !itemView? <img onClick={() => {setCategory(false)}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/> : null }
          { !category && !itemView? <h1 className="venue">{venues.wintervillage}</h1> : null }
          { !itemView && <Filter filter={filter} updateFilter={updateFilter} lang={lang} /> }
          { category && !itemView && !filtersInUse ? <HorizontalScrollNav sectionPositions={sectionPositions}/> : ''}
          { !itemView && <LanguageSelect lang={lang} updateLang={updateLang} /> }
          {/* { !itemView && <MenuSearch data={bffRes} hide={false} onInput={(result) => console.log(result)}/>} */}
          <img onClick={(e)=>{this.openCart()}} className="cartIcon" src="/icons/cart_icon.svg" alt="cart"/>

          {/* TODO: check if cart has items, display badge if so */}
          {/* { somethingHere && <div className="cartBadge"/> } */}
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
    } = this.props;


    return (
      isLoading || !bffRes ? <LoadingScreen/> :
      (
        <div className="Menu">
          {this.getHeader()}
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
              />
              <Footer/>
            </div>
          ) : (
            <CategorySelect
              categories={Object.keys(bffRes.menuByCategory)}
              setCategory={setCategory}
            />
          )}
        </div>
      )
    );
  }

};

const mapDispatchToProps = dispatch => bindActionCreators({...actions, ...cartActions}, dispatch)

const mapStateToProps = state => ({
  bffRes: state.persistentMenu.bffRes,
  category: state.persistentMenu.category,
  isLoading: state.common.isLoading,
  venue: state.persistentMenu.venue,
  sectionPositions: state.menu.sectionPositions,
  filter: state.persistentMenu.filter,
  lang: state.persistentMenu.lang,
  setCategory: state.persistentMenu.setCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
