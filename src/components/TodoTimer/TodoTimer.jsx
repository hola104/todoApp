import React, { Component } from "react";
import PropTypes from "prop-types";

import "./TodoTimer.css";

export default class Timer extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
    zero: false,
    active: false,
  };

  static defaultProps = {
    update: () => {},
    startTimer: () => {},
    stopTimer: () => {},
  };

  static propTypes = {
    min: PropTypes.number,
    sec: PropTypes.number,
    zero: PropTypes.bool,
    active: PropTypes.bool,
    update: PropTypes.func,
    startTimer: PropTypes.func,
    stopTimer: PropTypes.func,
  };

  update = () => {
    const { zero, min, sec } = this.state;
    if (zero) {
      this.setState({ min, sec: sec + 1 });
      sec === 59 && this.setState({ min: min + 1, sec: 0 });
    } else {
      this.setState({ min, sec: sec - 1 });
      sec === 0 && this.setState({ min: min - 1, sec: 59 });
      if (min === 0 && sec === 0) {
        this.setState({ min: 0, sec: 0 });
        clearInterval(this.interval);
      }
    }
  };

  startTimer = () => {
    this.setState({ active: true });
    this.interval = setInterval(() => this.update(), 1000);
  };

  stopTimer = () => {
    this.setState({ active: false });
    clearInterval(this.interval);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    const { min, sec } = this.state;
    if (min === 0 && sec === 0) {
      this.setState({ zero: true });
    }
  }

  render() {
    const { active, min, sec } = this.state;

    let minNumber;
    let secNumber;

    if (min < 10) {
      minNumber = `0${min}`;
    } else {
      minNumber = min;
    }

    if (sec < 10) {
      secNumber = `0${sec}`;
    } else {
      secNumber = sec;
    }

    return (
      <span className="description">
        <button type="button" className="icon icon-play" onClick={this.startTimer} disabled={active} />
        <button type="button" className="icon icon-pause" onClick={this.stopTimer} />
        <span className="timer">
          {minNumber} : {secNumber}
        </span>
      </span>
    );
  }
}
