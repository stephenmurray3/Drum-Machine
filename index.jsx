import React from 'react';
import ReactDOM from 'react-dom/client';
import Audio from './Audio'
import Drumpad from './Drumpad'

function App() {
  
  const [power, setPower] = React.useState(false)
  
  const [bank, setBank] = React.useState(false)
  
  const [display, setDisplay] = React.useState('')
  
  const [volume, setVolume] = React.useState(50)
  
  React.useEffect(() => {
    if (power) {
      setDisplay(`Volume: ${volume}`)
    }
  }, [volume])
  
  function togglePower() {
    setPower(prevPower => !prevPower)
    setDisplay('')
  }
  
   function toggleBank() {
    setBank(prevBank => !prevBank)
    setDisplay('')
  }
  
  function displaySample(letter) {
    if (power) {
      setDisplay(Audio.map(item => {
        return item.letter === letter && !bank ? item.sample : ''
      })) 
    }
  }
  
  const styles = {
    opacity: power ? "1" : "0.2"
  }
  
  const drumPads = Audio.map(item => {
    return (
      <Drumpad
        key={item.letter}
        power={power}
        bank={bank}
        volume={volume}
        handleClick={() => displaySample(item.letter)}
        {...item}
      />
    )
  })
  
  return (
    <div id="drum-machine">
      <div id="drum-keys" className={power ? "on" : "off"} >
        {drumPads}
      </div>
      <div id="controls">
        <h4>Power</h4>
        <div className={power ? "on" : "off"} >
          <span className="option">Off</span>
          <div className="switches" >
            <div className="button" onClick={togglePower} ></div>
          </div>
          <span className="option">On</span>
        </div>
        <div id="display" style={styles} >{display}</div>
        <input 
              type="range" 
              step="1" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(event) => setVolume(event.target.value)}
              id="volume-slider" 
        />
        <h4>Bank</h4>
        <div className={bank ? "bankTwo" : "bankOne"} >
          <span className="option">Bank 1</span>
          <div className="switches">
            <div className="button" onClick={toggleBank} ></div>
          </div>
          <span className="option">Bank 2</span>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);