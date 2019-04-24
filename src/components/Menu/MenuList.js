import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

class MenuList extends React.Component {

  itemDetails(item) {
    const clampedDesc = (
      <LinesEllipsis
        text={item['Item Description Raw']}
        maxLine={3}
        ellipsis='...'
        basedOn='words'
        trimRight
      />
    )
    let trimmedName = item['Item Name']
    if (trimmedName && trimmedName.length > 30) {
      trimmedName = trimmedName.substring(0,31).trim() + '...'
    }

    return (
      <div>
        <div className="title">
          <h3>
            <span>{trimmedName}</span>
            <div className="info">
              <span className="price">{item['Price']}</span>
              <span className="tags">{ !!item.Tags ? item.Tags.join(' ') : null }</span>
            </div>
          </h3>
        </div>
        <div className="bodyText">{clampedDesc}</div>
      </div>
    )
  }

  render() {
    const { item, itemIndex, onClick } = this.props;

    return(
      // TODO: If order at table or pickup 'on', make these list items clickable (? needs clarification)
      <div className="menuItem menuListItem" key={ itemIndex } onClick={(e) => onClick(e)} >
        <div className="leftBox"></div>
        <div className="rightBox">
          { this.itemDetails(item) }
        </div>
      </div>
    )
  }
}

export default MenuList
