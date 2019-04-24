import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
// import JsxParser from 'react-jsx-parser'

class MenuItem extends React.Component {

  itemDetails(item) {
    const { lang } = this.props
    let name = item['Item Name']
    let desc = item['Item Description Raw']
    let translatedName = 'name-' + lang
    let translatedDesc = 'description-' + lang
    let trimmedName;

    if (lang !== 'en') {
      name = item[translatedName]
      desc = item[translatedDesc]
    }

    if (name){
    trimmedName = name
    if (trimmedName.length > 30) {
      trimmedName = trimmedName.substring(0,31).trim() + '...'
    }}
    else{
      trimmedName = '';
    }

    // <JsxParser
    //   jsx={
    //     `${desc}`
    //   }
    // />

    const clampedDesc = (
      <LinesEllipsis
        text={desc}
        maxLine={3}
        ellipsis='...'
        basedOn='words'
        trimRight
      />
    )

    return (
      <div>
        <h3 className="title">{ trimmedName }</h3>
        <div className="bodyText">{ clampedDesc }</div>
        <div className="info">
          <span className="price">{item['Price']}</span>
          <span className="tags">{ !!item.Tags ? item.Tags.join(' ') : null }</span>
        </div>
      </div>
    )
  }

  render() {
    const { item, itemIndex, onClick } = this.props;
    let img = item['Image'] ? item['Image'][0].url : '/mryum_assets/missing_photo.jpg'
    const style = {
      backgroundImage: 'url(' + img + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    // if even/odd
    if (itemIndex % 2 === 0) {
      return (
        <div className="menuItem" onClick={(e) => onClick(e)}>
          <div className="leftBox itemPhoto" style={style}></div>
          <div className="rightBox">
            { this.itemDetails(item) }
          </div>
        </div>
      )
    } else {
      return (
        <div className="menuItem" onClick={(e) => onClick(e)}>
          <div className="leftBox">
            { this.itemDetails(item) }
          </div>
          <div className="rightBox itemPhoto" style={style}></div>
        </div>
      )
    }
  }
}

export default MenuItem
