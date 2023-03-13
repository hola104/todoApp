import PropTypes from "prop-types";

import "./Timer.css";

function Timer({ sec, setPlay, setPaused }) {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <span className="description">
      <button
        className="icon icon-play"
        type="button"
        aria-label="Play"
        onClick={setPlay}
      />
      <button
        className="icon icon-pause"
        type="button"
        aria-label="Pause"
        onClick={setPaused}
      />
      {formatTime(sec)}
    </span>
  );
}

Timer.propTypes = {
  sec: PropTypes.number.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default Timer;
