// textarea input for contact page email form
import React, { Component } from 'react'

class TextArea extends Component {
  render() {
    return(
      <div className="form-group">
        <textarea
          placeholder = {this.props.placeholder}
          name = {this.props.name}
          id = {this.props.id}
          required = {this.props.required}
          className = {this.props.className}
          rows = {this.props.rows}
          onChange = {this.props.onChange}
          value = {this.props.value}
        />
        <span className="error">{this.props.error}</span>
      </div>
    )
  }
}

export default TextArea
