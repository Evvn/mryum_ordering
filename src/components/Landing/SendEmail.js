// contact page email form for landing page
import React from 'react'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import * as emailjs from 'emailjs-com'

class SendEmail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      subject: 'Mr Yum Website Contact!',
      message: '',
      errors: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }

  // updates input values (stored in state) and prevents default actions
  handleInputChange(event) {
    event.preventDefault()
    let target = event.target
    let name = target.name
    let value = target.value

    this.setState({[name]: value})
  }

  // validates inputs to check if form is valid for sending or not
  validateMail() {
    let errors = {}
    let formIsValid = true

    if (!this.state.name || this.state.name.length < 3) {
      errors.name = 'Minimum 3 characters'
      formIsValid = false
    }

    if (!this.state.subject || this.state.subject.length < 3) {
      errors.subject = 'Minimum 3 characters'
      formIsValid = false
    }

    if (!this.state.message || this.state.message.length < 3) {
      errors.message = 'Minimum 3 characters'
      formIsValid = false
    }

    if (!this.state.email || this.state.email.length < 3) {
      errors.email = 'Minimum 3 characters'
      formIsValid = false
    }

    let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

    if (!pattern.test(this.state.email)) {
      errors.email = 'This is not a valid email'
      formIsValid = false
    }

    this.setState({errors: errors})

    return formIsValid
  }

  // function to send email (fired on send button click)
  sentMessage(event) {

    // prevents form submit default action
    event.preventDefault()

    // if any inputs are invalid, return the function here
    if (!this.validateMail()) {
      return
    }

    // set email template to inputs from contact form
    let templateParams = {
      from_name: this.state.name + ' (' + this.state.email + ')',
      to_name: 'Mr Yum',
      subject: this.state.subject,
      message_html: this.state.message
    }

    // emailjs function and user id
    emailjs.send('gmail', 'template_dG7ZOoY7', templateParams, 'user_7WhVOMChLFHTXUuiEIk1J').then(function(response) {
      console.log('Success!', response.status, response.text)
    }, function(err) {
      console.log(err)
    })

    // sets inputs to disabled and 'sent' states, as well as displaying sent confirmation
    document.querySelectorAll('input').forEach((node) => {
      node.style.pointerEvents = 'none';
      node.style.backgroundColor = '#ffffff'
      node.placeholder = ''
      node.disabled = true

    })
    document.querySelectorAll('textarea').forEach((node) => {
      node.style.pointerEvents = 'none';
      node.style.backgroundColor = '#ffffff'
      node.placeholder = ''
      node.disabled = true
    })
    document.querySelectorAll('button').forEach((node) => {
      node.parentNode.removeChild(node)
    })

    let node = document.createElement('h2')
    let textnode = document.createTextNode('Talk to you soon!')
    node.appendChild(textnode)
    document.querySelector('form').appendChild(node)

    this.setState({name: this.state.name, email: this.state.email, subject: '', message: this.state.message})
  }

  render() {

    return (<div>

      {/* Inputs for each field of the contact form - on changes, checks if they are valid or not */}
      <form id={this.props.id} className={this.props.className} name={this.props.name} method={this.props.method} action={this.props.action}>

        <Input type='text' name='name' placeholder="Your name" className='form-control' required='required' onChange={this.handleInputChange.bind(this)} value={this.state.name} error={this.state.errors.name}/>

        <Input type='email' name='email' placeholder='Your email' className='form-control' required='required' onChange={this.handleInputChange.bind(this)} value={this.state.email} error={this.state.errors.email}/>

        <Input type='text' name='subject' placeholder='What the subject is' className='form-control hidden' required='required' onChange={this.handleInputChange.bind(this)}
          // value = {this.state.subject}
          value='Mr Yum Website Contact!' error={this.state.errors.subject} style={{display: 'none'}}/>

        <TextArea placeholder="Go ahead, we're listening..." name = 'message' id = 'message' required = 'required' className = 'form-control' rows = '8' onChange = {this.handleInputChange.bind(this)}
          value = {this.state.message}
          error = {this.state.errors.message}
          />

          <Button onClick={this.sentMessage.bind(this)} type='button' name='submit' className='btn btn-primary btn-lg' required='required'/>

        </form>

      </div>
      )
  }
}

export default SendEmail
