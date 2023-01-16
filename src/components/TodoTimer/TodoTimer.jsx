import "./TodoTimer.css"
import { useState, useEffect } from "react"

function Timer() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCounting, setIsCounting] = useState(false)

  const getPadTime = (time) => time.toString().padStart(2, "0")
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimeLeft((timeLeft) => timeLeft + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isCounting])

  const handleStart = () => {
    setIsCounting(true)
  }
  const handleStop = () => {
    setIsCounting(false)
  }

  return (
    <span className="description">
      <button type="button" className="icon icon-play" onClick={handleStart} />
      <button type="button" className="icon icon-pause" onClick={handleStop} />
      <span className="timer">
        {minutes}:{seconds}
      </span>
    </span>
  )
}

export default Timer
