import React from "react";
import ReactDOM from "react-dom";
import MenuItem from "./MenuItem";
import MenuList from "./MenuList";
import MenuInfo from "./MenuInfo";
import uuid from "uuid/v4";

class Section extends React.Component {
  componentDidMount() {
    const { name, setSectionPosition } = this.props;
    const position = ReactDOM.findDOMNode(this).offsetTop;
    setSectionPosition(name.split("%")[0], position);
  }

  processItem(item, index) {
    const { tagsInUse, routeToItemDetail, lang } = this.props;
    let tags = item.fields.filters;
    if (tags) {
      tags.forEach((tag, index) => {
        if (tag === "vegetarian") {
          tags[index] = "V";
        }
        if (tag === "vegan") {
          tags[index] = "VE";
        }
        if (tag === "gluten-free") {
          tags[index] = "GF";
        }
      });
    }

    // If menu item tags match any tags in filter -> should match ALL filter tags -> done
    // changed .some method to .every
    if (tags) {
      if (
        (tagsInUse.length > 0 && tagsInUse.every(tag => tags.includes(tag))) ||
        tagsInUse.length === 0
      ) {
        return (
          <MenuItem
            key={item.id}
            item={item.fields}
            itemIndex={index}
            lang={lang}
            onClick={e => {
              routeToItemDetail(e, item.id, lang);
            }}
          />
        );
      }
    }

    return "";
  }

  getList(item, index) {
    const { routeToItemDetail } = this.props;
    return (
      <MenuList
        key={item.id}
        // disable menu list item click until ordering
        onClick={e => {
          routeToItemDetail(e, item.id);
        }}
        item={item.fields}
        itemIndex={index}
      />
    );
  }

  getSection() {
    const { menuSection, lang, routeToItemDetail, tagsInUse } = this.props;

    let infoList = [];

    let section = menuSection
      ? menuSection.map((item, index) => {
          const hasTag = item.fields.tags ? true : false;
          const tags = item.fields.tags;
          const menuItemTemplate = (
            <MenuItem
              key={item.id}
              item={item.fields}
              itemIndex={index}
              lang={lang}
              onClick={e => {
                routeToItemDetail(e, item.id, lang);
              }}
            />
          );

          if (item.fields.itemType === "info") {
            infoList.push(item.fields);
            // eslint-disable-next-line
            return;
          }

          if (tagsInUse.length > 0 && !hasTag) {
            return "";
          }

          return hasTag
            ? tags[0] !== "LIST"
              ? this.processItem(item, index)
              : this.getList(item, index)
            : menuItemTemplate;
        })
      : [];

    if (tagsInUse.length === 0 && infoList.length > 0) {
      section.push(<MenuInfo key={uuid()} infoList={infoList} />);
    }

    return section;
  }

  render() {
    const { name, index, tagsInUse, searchInUse, searchTerm } = this.props;
    let tags = tagsInUse;
    let nameClone = name ? name : "";
    let subSection = "";
    let hideSection = false;

    if (nameClone.indexOf("%") !== -1) {
      subSection = nameClone.substring(
        nameClone.indexOf("%") + 1,
        nameClone.length
      );
      nameClone = nameClone.substring(0, nameClone.indexOf("%"));
    }

    // replace nameClone with tags in use
    if (tags.length > 0) {
      tags = tags.join(", ");
      nameClone = tags
        .replace(new RegExp("\\bV\\b"), "Vegetarian")
        .replace(new RegExp("\\bVE\\b"), "Vegan")
        .replace(new RegExp("\\bGF\\b"), "Gluten Free");
      subSection = "";
    }

    // replace nameClose with search term in use
    if (searchInUse) {
      nameClone = `Search results for '${searchTerm}'`;
      subSection = "";
    }

    // concat tags and filter res
    if (tags.length > 0 || searchInUse) {
      if (index > 0) {
        hideSection = true;
      }
    }

    let section = this.getSection();
    section = section.filter(elem => elem);

    return (
      <div>
        {hideSection ? (
          ""
        ) : (
          <h2
            className={`section ${
              index === 0 && tags.length === 0 ? "sectionTaller" : ""
            }`}
          >
            {nameClone}
            <span className="subSection">{subSection}</span>
          </h2>
        )}
        {section}
      </div>
    );
  }
}

export default Section;
