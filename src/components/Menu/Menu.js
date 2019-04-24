import React, {Component} from 'react';
import NotFound from '../NotFound/NotFound.js'
import Section from './Section.js'
import ItemDetail from './ItemDetail.js'

class Menu extends Component {
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

  getSections(){
    const { menuItems, menuItemKeys } = this.props;
    const menuSections = {};
    menuItemKeys.forEach(item => {
      const placedSections = Object.keys(menuSections);
      const menuItem = menuItems[item];
      const section = menuItem.fields.Sections;
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
      routeToItemDetail,
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

    return (
      <div>
        {this.getMenu()}
        {
          itemId
            ? <ItemDetail details={menuItems[itemId].fields} lang={lang} />
            : ''
        }
      </div>
    );
  }
}


export default Menu;
