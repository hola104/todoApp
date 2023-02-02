import React, { Component } from "react";
import "./NewTaskForm.css";

class NewTaskForm extends Component {
  state = {
    min: "",
    sec: "",
    title: "",
  };

  onLabelChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onLabelChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onLabelChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    if (this.state.title === "") {
      return;
    }

    this.props.addTask(this.state.title, this.state.min, this.state.sec);
    this.setState({
      title: "",
    });
  };

  onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (this.state.title !== "" && this.state.min !== "" && this.state.sec !== "") {
        this.props.addTask(this.state.title, parseInt(this.state.min) * 60 + parseInt(this.state.sec));

        this.setState({
          title: "",
          min: "",
          sec: "",
        });
      }
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form className="new-todo-form" onKeyDown={(e) => this.onClickEnter(e)}>
          <input
            placeholder="What needs to be done?"
            type="text"
            value={this.state.title}
            className="new-todo"
            onChange={this.onLabelChangeTitle}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
            onChange={this.onLabelChangeMin}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
            onChange={this.onLabelChangeSec}
          />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
