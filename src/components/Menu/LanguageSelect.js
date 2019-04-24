import React from 'react'
import _ from 'lodash'
import Modal from '../Common/Modal.js';
import { languageWarnings } from './enums/languageEnums.js'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    // TODO: handle this with redux / local storage later
    this.state = {
      showModal: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.closeFilterMenu, 300, { trailing: true, leading: true }))
  }


  closeFilterMenu() {
    // close filter if it's open
    if (document.querySelector('.filterList') !== null) {
      document.querySelector('.filterList').classList.remove('open')
      if (document.querySelector('.filterList').classList.contains('open')) {
        document.querySelector('.filterText').textContent = 'close'
      } else {
        document.querySelector('.filterText').textContent = 'filter'
      }
    }
  }

  // on language section click
  langClick = (e) => {
    // toggle 'open' classes
    document.querySelector('.langArrow').classList.toggle('rotate')
    document.querySelector('.languageList').classList.toggle('langOpen')
    this.closeFilterMenu()
  }

  printLanguages(languageList) {
    const { lang, updateLang } = this.props
    let languageButtons = []
    languageList.forEach(language => {
      let className = 'radioBtn'
      if (language.code === lang) {
        className = 'radioBtn radioSelected'
      }
      languageButtons.push(
        <p
          key={language.name}
          className="language"
          id={language.name}
          code={language.code}
          onClick={ (e) => {
            updateLang(language.code)
            this.setState({
              showModal: true,
            })
          } }
        >
          <span className={className} code={language.code} />{language.name}
        </p>
      )
    })
    return languageButtons
  }

  renderModal(lang) {
    const warning = languageWarnings[lang.replace('-','')]

    return(
      <Modal
        heading={warning.greeting}
        body={warning.instructions}
        cta={warning.confirmation}
        onClick={() => {
          this.setState({
            showModal: false,
          })
        }
      }/>
    )
  }

  render() {
    const { lang, } = this.props
    const languageList = [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'fr',
        name: 'Français',
      },
      {
        code: 'el',
        name: 'ελληνικά',
      },
      {
        code: 'zh-CN',
        name: '中文',
      },
      {
        code: 'es',
        name: 'Español',
      },
      {
        code: 'it',
        name: 'Italiano',
      },
    ]

    return(
      <div className="selectLanguage">

        { this.state.showModal && lang !== 'en' ?
          this.renderModal(lang)
          : '' }

        <span className="langCode" onClick={this.langClick}>{lang}</span>
        <div className="langArrow" onClick={this.langClick}></div>

        <div className="languageList">
          {this.printLanguages(languageList)}
        </div>
      </div>
    )
  }
}

export default Filter
