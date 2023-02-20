import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './employee.css';
import EmpNavbar from './EmpNavbar';

const Employee = () => {

    // getting _id from session storage
    const _id = sessionStorage.getItem('Id');
    const empId = sessionStorage.getItem('Id');
    const token = sessionStorage.getItem('Token');

    const [project, setProject] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
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
        setStartTime(null);
        setStopTime(null);
    };

    const handleModeOfWork = (e) => {
        setModeOfWork(e.target.value);
        setJobDescription(null);
        setStartTime(null);
        setStopTime(null);
    }

    // start timer
    const start = () => {
        setStartTime(new Date());
        setRunning(true);
        setStopTime(null);
    };

    // stop timer
    const stop = () => {
        setStopTime(new Date());
        setRunning(false);
        setTime(0);
    };

    // pause timer
    const pause = () => {
        setStopTime(new Date());
        setRunning(false);
    };

    // handle side effects while saving, fetching start 
    useEffect(() => {

        // save timer
        let saveTimer = async () => {
            await axios.post('/api/tracker', { empId, project, task, jobDescription, modeOfWork, startTime, endTime, token });
        };
        saveTimer();

        // fetch tracker history
        const getData = async () => {
            try {
                let response = await axios.post(`/api/tracker/${_id}`, { token });
                setApiData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getData();

        // fetch project
        const getProject = async () => {
            let project = await axios.post('/api/projects', { token });
            setProjectData(project.data);
        }
        getProject();

        // fetch task
        const getTask = async () => {
            let task = await axios.post('/api/tasks', { token });
            setTaskData(task.data);
        }
        getTask();

        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);

    }, [running, empId, project, task, jobDescription, modeOfWork, startTime, endTime, _id, token]);
    // handle side effects while saving, fetching end

    return (
        <>
            {/* Employee Navbar */}
            <EmpNavbar />

            {/* Employee project, task, job description, mode of work, start time,end time start*/}
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-2">
                        <select className="form-select w-100" value={project} onChange={handleProject}>
                            <option value="">Project</option>
                            {projectData.map((item, index) => {
                                return (
                                    <option key={index} value={item.label}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-12 col-lg-2">
                        <select className="form-select w-100" value={task} onChange={handleTask}>
                            <option value="">Task</option>
                            {taskData.map((item, index) => {
                                return (
                                    <option key={index} value={item.label}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-12 col-lg-2">
                        <select className="form-select w-100" value={modeOfWork} onChange={handleModeOfWork}>
                            <option value="">Mode of Work</option>
                            <option value="Work from Office">Work from Office</option>
                            <option value="Work from Home">Work from Home</option>
                        </select>
                    </div>

                    <div className="col-sm-12 col-lg-2">
                        <div className="input-group">
                            <input type="text" className="form-control w-100" placeholder='Job Description' onChange={handleJobDesc} />
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-4">
                        <div className="d-flex justify-content-end w-100">
                            <div className="timer mt-2 me-1">
                                <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                            </div>
                            <div>
                                {running ?
                                    (
                                        <>
                                            <button className="btn me-1 btn-danger" onClick={stop}>Stop</button>
                                            <button className="btn btn-primary" onClick={pause}>Pause</button>
                                        </>
                                    )
                                    :
                                    (
                                        <button className="btn btn-success" onClick={start}>Start</button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Employee project, task, job description, mode of work, start time,end time end*/}
            <br />
            {/* Employee time tracker history start */}
            <table className="table table-striped table-hover table-responsive employee-table">
                <thead>
                    <tr>
                        <th scope="col" >Date</th>
                        <th scope="col" >Project</th>
                        <th scope="col">Task</th>
                        <th scope="col">Mode of Work</th>
                        <th scope="col">Job Description</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td >{moment(value.startTime).format('DD-MM-YYYY')}</td>
                                <td>{value.project}</td>
                                <td>{value.task}</td>
                                <td>{value.modeOfWork}</td>
                                <td>{value.jobDescription}</td>
                                <td >{moment(value.startTime).format('HH:mm:ss')}</td>
                                <td>{moment(value.endTime).format('HH:mm:ss')}</td>
                                <td>{moment.utc(moment(value.endTime).diff(moment(value.startTime))).format("HH:mm:ss")}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* Employee time tracker history end */}
        </>
    )
}

export default Employee