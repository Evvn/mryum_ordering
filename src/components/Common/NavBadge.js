import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import AnchorLink from 'react-anchor-link-smooth-scroll';

class NavBadge extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     alertedParent: false
  //   }
  // }

  componentDidMount() {
    if (this.className === 'red') {
      const {updateSection} = this.props;
      const offset = ReactDOM.findDOMNode(this).offsetLeft;
      // console.log(offset);
      updateSection(offset);
    }
  }

  componentDidUpdate() {
    // const {alertedParent} = this.state;
    const offset = ReactDOM.findDOMNode(this).offsetLeft;
    // console.log(offset, this.props.section);
    if (this.className === 'red') {
      // this.setState({alertedParent: true});
      const {updateSection} = this.props;
      updateSection(offset);
    }
  }

  render() {
    // eslint-disable-next-line
    const {section, onSelect, currentPosition, interval} = this.props;
    this.className = currentPosition >= interval[0] - 50 && currentPosition < interval[1] - 50 ? 'red' : '';

    return (
      <AnchorLink href={`#$scroll-nav-${section}`} onClick={(e) => {
          onSelect(e)
          }} key={uuid()}
      >
        <span style={{
              cursor: 'pointer'
            }}
          id={`$scroll-nav-${section}`} key={uuid()} className={this.className}
        >
            {section}
        </span>
      </AnchorLink>
    );
  }
}

export default NavBadge;
