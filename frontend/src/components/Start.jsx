import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Start = () => {

    let [startTime, setStartTime] = useState('');
    let [endTime, setEndTime] = useState('');
    let [isStart, setIsStart] = useState(false);

    let startTimer = () => {
        setEndTime(null);
        setStartTime(new Date());
        setIsStart(true);
    };

    let endTimer = () => {
        setEndTime(new Date());
        setIsStart(false);
    };

    useEffect(() => {
        let saveTimer = async () => {
            await axios.post('http://localhost:5000/tracker', { startTime, endTime });
        };
        saveTimer();
    }, [startTime, endTime]);

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