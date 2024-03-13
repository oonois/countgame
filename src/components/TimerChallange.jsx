import { useRef, useState } from "react"
import ResultModal from "./ResultModal"


export default function TimerChallange({ title, targetTime }) {
  
  const [timeRemaining, setTimeRemaining] = useState(targetTime*1000)
  const timeisActive = timeRemaining > 0 && timeRemaining < targetTime *1000
  const dialog = useRef()
  const timer = useRef()

  if (timeRemaining <= 0 ) {
    clearInterval(timer.current)
    
    dialog.current.open()
  }

  function handlereset() {
    setTimeRemaining(targetTime*1000)
  }

  function handleStart() {
    timer.current = setInterval(()=> {
    setTimeRemaining(prevTimeRemaining => prevTimeRemaining -10) 
    }, 10)
    
  }

  function handleStop() {
    dialog.current.open()
    clearInterval(timer.current)
  }

  return (
    <>
    <ResultModal 
      ref={dialog} 
      targetTime={targetTime} 
      remainingTime={timeRemaining}
      onReset={handlereset}
    />
    <section className="challenge">
      <h2>{title}</h2>
      
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button  onClick={timeisActive ? handleStop : handleStart}>
          {timeisActive ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timeisActive ? 'active' : undefined}>
        {timeisActive ? 'Time is running ...' : 'timer inactive'}
      </p>
    </section>
    </>
  )
}
