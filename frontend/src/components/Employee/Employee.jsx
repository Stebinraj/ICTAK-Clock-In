import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
const Employee = () => {

    const [_id, setId] = useState('');
    const [empId, setEmpId] = useState('');
    const [project, setProject] = useState('');
    const [task, setTask] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [modeOfWork, setModeOfWork] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setStopTime] = useState('');
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [apiData, setApiData] = useState([]);


    const handleProject = (e) => {
        setProject(e.target.value);
        setTask(null);
        setJobDescription(null);
        setModeOfWork(null);
        setStartTime(null);
        setStopTime(null);
    };

    const handleTask = (e) => {
        setTask(e.target.value);
        setJobDescription(null);
        setModeOfWork(null);
        setStartTime(null);
        setStopTime(null);
    };

    const handleJobDesc = (e) => {
        setJobDescription(e.target.value);
        setModeOfWork(null);
        setStartTime(null);
        setStopTime(null);
    };

    const handleModeOfWork = (e) => {
        setModeOfWork(e.target.value);
        setStartTime(null);
        setStopTime(null);
    }

    // start
    const start = () => {
        setStartTime(new Date());
        setRunning(true);
        setStopTime(null);
    };

    const stop = () => {
        setStopTime(new Date());
        setRunning(false);
        setTime(0);
    };

    const pause = () => {
        setStopTime(new Date());
        setRunning(false);
    };

    const getData = async () => {
        try {
            let response = await axios.get(`http://localhost:5000/tracker/${_id}`);
            setApiData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        setEmpId(sessionStorage.getItem('Id'));
        setId(sessionStorage.getItem('Id'));

        let saveTimer = async () => {
            await axios.post('http://localhost:5000/tracker', { empId, project, task, jobDescription, modeOfWork, startTime, endTime });
        };
        saveTimer();


        getData();

        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);

    }, [running, empId, project, task, jobDescription, modeOfWork, startTime, endTime, _id]);

    return (
        <>
            <div className="dropdown">

                <select value={project} onChange={handleProject}>
                    <option value="">Project</option>
                    <option value="Academic">Academic</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Government">Government</option>
                    <option value="Knowledge Office">Knowledge Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Administration">Administration</option>
                </select>

                <select value={task} onChange={handleTask}>
                    <option value="">Task</option>
                    <option value="Training">Training</option>
                    <option value="Meetings & Discussions">Meetings & Discussions</option>
                    <option value="Lark Activity">Lark Activity</option>
                    <option value="Content Development">Content Development</option>
                </select>

                <input type="text" placeholder='Job Description' onChange={handleJobDesc} />

                <select value={modeOfWork} onChange={handleModeOfWork}>
                    <option value="">Mode of Work</option>
                    <option value="Work from Office">Work from Office</option>
                    <option value="Work from Home">Work from Home</option>
                </select>

                <div>
                    <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
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
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Task</th>
                        <th scope="col">Job Description</th>
                        <th scope="col">Mode of Work</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.project}</td>
                                <td>{value.task}</td>
                                <td>{value.jobDescription}</td>
                                <td>{value.modeOfWork}</td>
                                <td >{moment(value.startTime).format('HH:mm:ss')}</td>
                                <td>{moment(value.endTime).format('HH:mm:ss')}</td>
                                <td>{moment.utc(moment(value.endTime).diff(moment(value.startTime))).format("HH:mm:ss")}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </>
    )
}

export default Employee