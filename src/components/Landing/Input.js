// input for contact form onntact page
import React, { Component } from 'react'

class Input extends Component {
  render() {
    return (
      <div className="form-group">
        <input
          type = {this.props.type}
          name = {this.props.name}
          placeholder = {this.props.placeholder}
          className = {this.props.className}
          required = {this.props.required}
          onChange = {this.props.onChange}
          value = {this.props.value}
        />
        <span className="error">{this.props.error}</span>
      </div>
    )
  }
}

export default Input
