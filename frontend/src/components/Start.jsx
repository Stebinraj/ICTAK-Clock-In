// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Start = () => {

//     let [startTime, setStartTime] = useState('');
//     let [endTime, setEndTime] = useState('');
//     let [isStart, setIsStart] = useState(false);

//     let startTimer = () => {
//         setEndTime(null);
//         setStartTime(new Date());
//         setIsStart(true);
//     };

//     let endTimer = () => {
//         setEndTime(new Date());
//         setIsStart(false);
//     };

//     useEffect(() => {
//         let saveTimer = async () => {
//             await axios.post('http://localhost:5000/tracker', { startTime, endTime });
//         };
//         saveTimer();
//     }, [startTime, endTime]);

//     return (
//         <>
//             {isStart ? (
//                 <button onClick={endTimer}>End</button>
//             ) : (
//                 <button onClick={startTimer}>Start</button>
//             )}
//         </>
//     )
// }

// export default Start





import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Start = () => {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    const [startTime, setStartTime] = useState('');
    const [endTime, setStopTime] = useState('');

    const start = () => {
        setRunning(true);
        setStartTime(new Date());
        setStopTime(null);
    };

    const stop = () => {
        setRunning(false);
        setStopTime(new Date());
        setTime(0);
    };

    const pause = () => {
        setRunning(false);
        setStopTime(new Date());
    }

    useEffect(() => {

        let saveTimer = async () => {
            await axios.post('http://localhost:5000/tracker', { startTime, endTime });
        };
        saveTimer();

        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);

    }, [running,startTime,endTime]);


    return (
        <>
            <h1>Stop Watch</h1>
            <div>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>

            <div>
                {running ?
                    (
                        <>
                            <button onClick={stop}>Stop</button>
                            <button onClick={pause}>Pause</button>
                        </>
                    )
                    :
                    (
                        <button onClick={start}>Start</button>
                    )}
            </div>
        </>
    )
}

export default Start;