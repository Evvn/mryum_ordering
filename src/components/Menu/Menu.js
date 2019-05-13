import React, { Component } from "react";
import NotFound from "../NotFound/NotFound.js";
import Section from "./Section.js";
import ItemDetail from "./ItemDetail.js";
import ClassNames from "classnames";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWater: false
    };
  }

  getTags() {
    const { filter } = this.props;
    const tagsInUse = [];
    Object.keys(filter).forEach(tag => {
      if (filter[tag]) {
        tagsInUse.push(tag);
      }
    });

    return tagsInUse;
  }

  componentDidUpdate() {}

  getSections() {
    const { menuItems, menuItemKeys, searchRes, searchInUse } = this.props;
    const menuSections = {};
    // let searchedMenuArr = [];
    let searchedMenu = {};
    if (searchInUse) {
      searchRes.map((item, index) => {
        return (searchedMenu[item.id] = menuItems[searchRes[index].id]);
      });
      Object.keys(searchedMenu).forEach(item => {
        const placedSections = Object.keys(menuSections);
        const menuItem = menuItems[item];
        const section = menuItem.fields.sections;
        if (!placedSections.includes(section)) {
          menuSections[section] = [menuItem];
        } else {
          menuSections[section] = menuSections[section].concat([menuItem]);
        }
      });
    } else {
      menuItemKeys.forEach(item => {
        const placedSections = Object.keys(menuSections);
        const menuItem = menuItems[item];
        const section = menuItem.fields.sections;
        if (!placedSections.includes(section)) {
          menuSections[section] = [menuItem];
        } else {
          menuSections[section] = menuSections[section].concat([menuItem]);
        }
      });
    }

    return menuSections;
  }

  compareMenuOrder = (a, b) => {
    const indexA = a.fields.itemOrder;
    const indexB = b.fields.itemOrder;
    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
    return 0;
  };

  compareSectionOrder = (a, b) => {
    const indexA = a[0].fields.itemOrder;
    const indexB = b[0].fields.itemOrder;
    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
    return 0;
  };

  getMenu() {
    const {
      setSectionPosition,
      lang,
      routeToItemDetail,
      searchInUse,
      searchTerm
    } = this.props;
    const menuSections = this.getSections();
    const tagsInUse = this.getTags();

    if (menuSections.length === 0) {
      return <NotFound />;
    } else {
      let sortedSections = Object.values(menuSections).map(section => {
        return section.sort(this.compareMenuOrder);
      });

      sortedSections = sortedSections.sort(this.compareSectionOrder);

      sortedSections = sortedSections.map(section => {
        let sectionName = section[0].fields.sections;
        let sectionObj = {
          [sectionName]: section
        };
        return sectionObj;
      });

      sortedSections = sortedSections.map((section, index) => {
        return (
          <Section
            key={index}
            index={index}
            menuSection={Object.values(section)[0]}
            name={Object.keys(section)[0]}
            setSectionPosition={setSectionPosition}
            tagsInUse={tagsInUse}
            routeToItemDetail={routeToItemDetail}
            lang={lang}
            searchInUse={searchInUse}
            searchTerm={searchTerm}
          />
        );
      });

      return sortedSections;
    }
  }

  render() {
    const { lang, menuItems, itemId, addToCart } = this.props;
    const desktopView = window.innerWidth > 768 ? true : false;

    return desktopView ? (
      <div>
        <div
          className={ClassNames(itemId ? "menuCont lockScroll" : "menuCont")}
        >
          {this.getMenu()}
        </div>

        {itemId ? (
          <ItemDetail
            details={menuItems[itemId].fields}
            lang={lang}
            addToCart={addToCart}
          />
        ) : (
          ""
        )}
      </div>
    ) : (
      <div>
        {itemId ? (
          <ItemDetail
            details={menuItems[itemId].fields}
            lang={lang}
            addToCart={addToCart}
          />
        ) : (
          <div>{this.getMenu()}</div>
        )}
      </div>
    );
  }
}

export default Menu;
