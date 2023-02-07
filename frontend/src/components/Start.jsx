import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Start = () => {

    let [startTime, setStartTime] = useState('');
    let [endTime, setEndTime] = useState('');
    let [totalTime, setTotalTime] = useState('');
    let [isStart, setIsStart] = useState(false);

    let startTimer = () => {
        setEndTime(null);
        setTotalTime(null)
        setStartTime(new Date());
        setIsStart(true);
    };

    let endTimer = () => {
        setEndTime(new Date());
        setTotalTime(Date(endTime - startTime));
        setIsStart(false);
    };

    useEffect(() => {
        let saveTimer = async () => {
            await axios.post('http://localhost:5000/tracker', { startTime, endTime, totalTime });
        };
        saveTimer();
    }, [startTime, endTime, totalTime]);

    return (
        <>
            {isStart ? (
                <button onClick={endTimer}>End</button>
            ) : (
                <button onClick={startTimer}>Start</button>
            )}
        </>
    )
}

export default Start