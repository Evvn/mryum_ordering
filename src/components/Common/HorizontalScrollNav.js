import React from "react";
import _ from "lodash";
import NavBadge from "./NavBadge";

class HorizontalScrollNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      currentPosition: 0,
      offset: 0
    };
    this.current = false;
    this.currentPosition = 0;

    this.handleSelection = this.handleSelection.bind(this);
    this.sectionUpdateHandle = this.sectionUpdateHandle.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.mouseUpHandle.bind(this));
    window.addEventListener("mousemove", this.mouseMoveHandle.bind(this));
    // add event listener on scroll with throttling to prevent excessive events being fired
    window.addEventListener(
      "scroll",
      _.throttle(this.scrollHandle.bind(this), 500, {
        trailing: true,
        leading: true
      })
    );
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.mouseUpHandle.bind(this));
    window.removeEventListener("mousemove", this.mouseMoveHandle.bind(this));
    window.removeEventListener("scroll", this.scrollHandle.bind(this));
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.current = false;
  }

  sortByValue(obj) {
    const newObj = {};
    const sortable = Object.keys(obj).map((key, index) => [
      key,
      obj[key],
      obj[Object.keys(obj)[index + 1]]
    ]);
    sortable.sort((a, b) => a[1] - b[1]);
    sortable.forEach(obj => {
      newObj[obj[0]] = [obj[1], obj[2] ? obj[2] : Infinity];
    });

    return newObj;
  }

  scrollHandle(e) {
    e.preventDefault();
    this.setState({ currentPosition: window.scrollY });
  }

  handleSelection(e, id, section) {
    const { sectionPositions } = this.props;
    document.getElementById(id).classList.add("red");

    const moveTo = () => {
      const offset =
        sectionPositions[section] < 50 ? 0 : sectionPositions[section] + 124; // change this number if header height changes
      this.refs.container.scrollLeft = this.state.offset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    };

    this.setState({ offset: document.getElementById(id).offsetLeft }, moveTo);
    e.stopPropagation();
  }

  sectionUpdateHandle(offset) {
    if (this.refs.container) {
      this.refs.container.scrollLeft = offset;
    }
  }

  mouseUpHandle(e) {
    if (this.state.dragging) {
      this.setState(this.state);
    }
  }

  mouseDownHandle(e) {
    if (!this.state.dragging) {
      this.setState(this.state);
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
      e.preventDefault();
    }
  }

  mouseMoveHandle(e) {
    if (this.state.dragging) {
      this.refs.container.scrollLeft -=
        -this.lastClientX + (this.lastClientX = e.clientX);
      this.refs.container.scrollTop -=
        -this.lastClientY + (this.lastClientY = e.clientY);
    }
  }

  render() {
    const { sectionPositions } = this.props;
    const { currentPosition } = this.state;
    const sectionNames = Object.keys(sectionPositions);
    const sortedPositions = this.sortByValue(sectionPositions);

    return (
      <div
        className="selectSection"
        onMouseUp={this.mouseUpHandle.bind(this)}
        onMouseMove={this.mouseMoveHandle.bind(this)}
        ref="container"
      >
        {sectionNames.map((section, index) => (
          <NavBadge
            key={sectionPositions[section]}
            section={section}
            onSelect={e => {
              this.handleSelection(e, `$scroll-nav-${section}`, section);
            }}
            ref={`$scroll-nav-${section}`}
            currentPosition={currentPosition}
            interval={sortedPositions[section]}
            updateSection={this.sectionUpdateHandle}
          />
        ))}
      </div>
    );
  }
}

export default HorizontalScrollNav;
