import React from 'react'
import _ from 'lodash'
import Modal from '../Common/Modal.js';
import { filterNames, filterWarnings } from './enums/filterEnums.js'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    // TODO: handle this with redux / local storage later
    this.state = {
      warningHasBeenShown: false,
      showModal: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.closeLangMenu, 300, {
      trailing: true,
      leading: true
    }))
  }

  closeLangMenu() {
    const path = window.location.pathname.split('/')
    if (!path[2]) {
      // on filter menu click, close language menu if it's currently open
      document.querySelector('.languageList').classList.remove('langOpen')
      document.querySelector('.langArrow').classList.remove('rotate')
    }
  }

  toggleFilterMenu = (e) => {
    document.querySelector('.filterList').classList.toggle('open')
    if (document.querySelector('.filterList').classList.contains('open')) {
      document.querySelector('.filterText').textContent = 'close'
    } else {
      document.querySelector('.filterText').textContent = 'filter'
    }
    // document.querySelector('.hamburger').classList.toggle('is-active')
    this.closeLangMenu()
  }

  renderModal(lang) {
    const warning = filterWarnings[lang.replace('-','')]

    return(
      <Modal
        heading={warning.greeting}
        body={warning.warning}
        cta={warning.confirmation}
        onClick={() => {
          this.setState({
            warningHasBeenShown: true,
            showModal: false,
          })
        }
      }/>
    )
  }

  render() {
    const { updateFilter, filter, lang } = this.props
    const filters = filterNames[lang.replace('-','')]
    const vegetarian = filters.V
    const vegan = filters.VE
    const gf = filters.GF

    return (<div className="filter">

      { this.state.showModal && !this.state.warningHasBeenShown ?
        this.renderModal(lang)
        : '' }

      <div className={Object.values(filter).indexOf(true) !== -1
          ? "filterIcon"
          : "filterIcon hidden"}></div>
      {/* <div className="hamburger hamburger--spin">
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div> */
      }
      <span className="filterText" onClick={this.toggleFilterMenu}>filter</span>

      {/* TODO: there's a lot of repetition going on here, would be nice to not hard code all the filters */
      }
      <div className="filterList">
        <p className="option" id="vegetarian" value="vegetarian" onClick={() => {
            updateFilter({
              ...filter,
              V: !filter.V
            },
            this.setState({
              showModal: true,
            })
          )
          }}>
          <span className={filter.V
              ? 'checkBox checkedBox'
              : 'checkBox'}/> {vegetarian}
        </p>
        <p className="option" id="vegan" value="vegan" onClick={() => {
            updateFilter({
              ...filter,
              VE: !filter.VE
            },
            this.setState({
              showModal: true,
            })
          )
          }}>
          <span className={filter.VE
              ? 'checkBox checkedBox'
              : 'checkBox'}/> {vegan}
        </p>
        <p className="option" id="gluten-free" value="gluten-free" onClick={() => {
            updateFilter({
              ...filter,
              GF: !filter.GF
            },
            this.setState({
              showModal: true,
            })
          )
          }}>
          <span className={filter.GF
              ? 'checkBox checkedBox'
              : 'checkBox'}/> {gf}
        </p>
        {/* Some un-used filters for later */}
        {/* <p className="option" id="dairy-free">
            <span className="checkBox" />
            Dairy Free
          </p>
          <p className="option" id="nut-free">
            <span className="checkBox" />
            Nut Free
          </p> */
        }
      </div>

    </div>)
  }
}

export default Filter
