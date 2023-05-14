import React from 'react'

export default function Drumpad(props) {
    
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [props.power && !props.bank])
    
    const handleKeyPress = (event) => {
        if (event.keyCode === props.keyCode) {
            playSound();
            props.handleClick();
        }
    }
    
    function playSound() {
        if (props.power && !props.bank) {
            const audioSample = document.getElementById(props.sample)
            // audioSample.volume = props.volume
            audioSample.currentTime = 0
            audioSample.play()
        }
    }
  
    return (
        <div className="drum-pad" onClick={() => {playSound(); props.handleClick()}} >
            <div>{props.power ? props.letter : ''}</div>
            <audio src={props.url} className="clip" id={props.sample} key={props.letter} />
        </div>
    )
}