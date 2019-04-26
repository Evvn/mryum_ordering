import React, {Component} from 'react';
import NotFound from '../NotFound/NotFound.js'
import Section from './Section.js'
import ItemDetail from './ItemDetail.js'
import ClassNames from 'classnames'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showWater: false,
    }
  }

  getTags(){
    const { filter } = this.props;
    const tagsInUse = [];
    Object.keys(filter).forEach(tag => {
      if (filter[tag]) {
        tagsInUse.push(tag);
      }
    });

    return tagsInUse;
  }

  componentDidUpdate() {

  }

  getSections(){
    const { menuItems, menuItemKeys } = this.props;
    const menuSections = {};
    menuItemKeys.forEach(item => {
      const placedSections = Object.keys(menuSections);
      const menuItem = menuItems[item];
      const section = menuItem.fields.sections;
      if (!placedSections.includes(section)){
        menuSections[section] = [menuItem];
      }
      else{
        menuSections[section] = menuSections[section].concat([menuItem]);
      }
    });

    return menuSections;
  }

  getMenu() {
    const {
      setSectionPosition,
      lang,
      routeToItemDetail
    } = this.props
    const menuSections = this.getSections();
    const tagsInUse = this.getTags();

    if (menuSections.length === 0) {
      return <NotFound/>;
    } else {
      let sections = []

      Object.keys(menuSections).forEach((section,index) => {
          sections.push(
            <Section
              key={index}
              index={index}
              menuSection={menuSections[section]}
              name={section}
              setSectionPosition={setSectionPosition}
              tagsInUse={tagsInUse}
              routeToItemDetail={routeToItemDetail}
              lang={lang}
            />
          )
        });
      return sections;
    }
  }

  render() {
    const {
      lang,
      menuItems,
      itemId,
    } = this.props
    console.log(menuItems[itemId]);
    const desktopView = window.innerWidth > 768 ? true : false;

    return desktopView ?
      (
        <div>
          <div className={ClassNames(itemId ? 'menuCont lockScroll' : 'menuCont')}>
            { this.getMenu() }
          </div>

        { itemId ?
          <ItemDetail details={menuItems[itemId].fields} lang={lang} />
           : '' }
      </div>
    )
      :
    (
      <div>
        { itemId ?
          <ItemDetail details={menuItems[itemId].fields} lang={lang} />
           :
           <div>
             { this.getMenu() }
           </div>
          }
      </div>
    )
  }
}


export default Menu;
