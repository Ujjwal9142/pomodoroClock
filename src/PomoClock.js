import React, { useState, useEffect } from 'react';
import './PomoClock.css';

const PomoClock = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [initial, setInitial] = useState(true);
    const [limit, setLimit] = useState(0);

    useEffect(() => {
        if(limit === 0){
            setInitial(true);
        }
        if(!initial){
            let interval = setInterval(() => {
                clearInterval(interval);
    
                if(seconds === 0){
                    if(minutes !== 0){
                        setSeconds(59);
                        setMinutes(minutes-1);
                    }
                    else{
                        // Set Another Timer and Display Break message
                        let minutes = displayMessage ? 24 : 4;
                        let seconds = 59;
                        setMinutes(minutes);
                        setSeconds(seconds);
                        setLimit(limit-1);
                        setDisplayMessage(!displayMessage);
                    }
                }
                else{
                    setSeconds(seconds-1);
                }
    
            }, 1000)
        }
        
    }, [seconds, initial]);

    const showMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const showSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const handleClick = () => {
        if(limit === 0){
            alert('Number of sessions cannot be 0!')
        }
        else{
            setInitial(false);
            setLimit(limit*2);
        }
    }

    return (
        <div className="pomoClock">
            <div className="break_message">
                { !initial && displayMessage && <h6>It's BREAK Session! New Work session will start in:</h6>}     
            </div>
            <div className="work_message">
                { !initial && !displayMessage && <h6>Work session will end in:</h6>}     
            </div>
            <div className="timer">
                { !initial && <h5>{showMinutes}:{showSeconds}</h5>}
            </div>
            <div className="timer">
                { initial && 
                    <div className="initial_message">
                        <h5>Set the number of Work Sessions</h5>
                        <input type="number" max="5" min="1" value={limit} onChange={(e) => setLimit(e.target.value)}></input>
                        <button onClick={handleClick} className="start_butn">START</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default PomoClock;