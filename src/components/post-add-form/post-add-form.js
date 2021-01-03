import React, { Component } from 'react';

import '../post-add-form/post-add-form.css'

export default class PostAddForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(evt){
    this.setState({
      text: evt.target.value
    })
  }

  onSubmit(evt){
    evt.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState({
      text: ''
    })
  }

  render(){
    return (
      <form className="bottom-panel d-flex" onSubmit = {this.onSubmit}>
        <input 
          type = "text" 
          className="form-control new-post-label" 
          placeholder = "О чем Вы думаете сейчас?"
          onChange = {this.onValueChange}
          value = {this.state.text} />
        <button className="btn btn-outline-secondary" type = "submit">Добавить</button>
      </form>
    );
  }
}