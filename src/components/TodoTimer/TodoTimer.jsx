import PropTypes from "prop-types";

import "./TodoTimer.css";

function Timer({ time, setPlay, setPaused }) {
  const formatTime = (times) => {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times - minutes * 60);

    return [minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0")].join(":");
  };

  return (
    <span className="description">
      <button className="icon icon-play" type="button" aria-label="Play" onClick={setPlay} />
      <button className="icon icon-pause" type="button" aria-label="Pause" onClick={setPaused} />
      {formatTime(time)}
    </span>
  );
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default Timer;
