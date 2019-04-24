import React from 'react'

class MenuInfo extends React.Component {

  printInfo(infoSections) {
    let renderInfo = []

    Object.keys(infoSections).forEach(section => {
      renderInfo.push(
        <span className="listSection" key={Math.random(999)} >{ section !== 'undefined' ? section : '' }</span>
      )
      infoSections[section].forEach(item => {
        renderInfo.push(
          <div className="listItem" key={Math.random(999)} >
            <span className="itemDesc">{ item.desc !== 'undefined' ? item.desc : '' }</span>
            <span className="itemPrice">{ item.price !== 'undefined' ? item.price : '' }</span>
          </div>
        )
      })
    })
    return renderInfo
  }

  processInfo(infoList) {
    let infoSectionNames = []
    let infoSections = {}

    // create array of unique info section names to avoid duplicate sections
    infoList.forEach((info, index) => {
      let sectionName = info['Item Name']
      let details = {
        desc: info['Item Description Raw'],
        price: info.Price,
      }

      if (!infoSectionNames.includes(sectionName)) {
        infoSectionNames.push(sectionName)
        infoSections[sectionName] = []
      }
      infoSections[sectionName].push(details)
    })
    return this.printInfo(infoSections)
  }

  render() {
    const { infoList } = this.props

    return(
      <div className="menuList">
        { this.processInfo(infoList) }
      </div>
    )
  }
}

export default MenuInfo
