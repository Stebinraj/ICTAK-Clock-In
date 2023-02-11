import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tracker from './Tracker';
const Employee = () => {


    let empId = sessionStorage.getItem('Id');
    const [project, setProject] = useState('');
    const [task, setTask] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [modeOfWork, setModeOfWork] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setStopTime] = useState('');
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);


    const handleProject = (e) => {
        setProject(e.target.value);
    };

    const handleTask = (e) => {
        setTask(e.target.value);
    };

    const handleJobDesc = (e) => {
        setJobDescription(e.target.value);
    };

    const handleModeOfWork = (e) => {
        setModeOfWork(e.target.value);
    }

    // start
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
            await axios.post('http://localhost:5000/tracker', {empId,project,task,jobDescription,modeOfWork, startTime, endTime });
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

    }, [running,startTime,endTime,empId,project,task,jobDescription,modeOfWork]);


    // useEffect(() => {
    //     let post = axios.post('http://localhost:5000/employee', { _id, project, task, jobDescription, modeOfWork });
    //     if (post) {
    //         console.log(post);
    //     }
    // }, [_id,project, task, jobDescription, modeOfWork]);

    // const sendData = async() => {
    //    let post=await axios.post('http://localhost:5000/tracker', {empId, project, task, jobDescription, modeOfWork });
    //     if (post) {
    //         console.log(post);
    // }
    // }

    return (
        <>

            {/* for project */}

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

                {/* for task */}
                <select value={task} onChange={handleTask}>
                    <option value="">Task</option>
                    <option value="Training">Training</option>
                    <option value="Meetings & Discussions">Meetings & Discussions</option>
                    <option value="Lark Activity">Lark Activity</option>
                    <option value="Content Development">Content Development</option>
                </select>
                
                {/* For job description */}
                <input type="text" placeholder='Job Description' onChange={handleJobDesc} />


                {/* for mode of work */}
                <select value={modeOfWork} onChange={handleModeOfWork}>
                    <option value="">Mode of Work</option>
                    <option value="Work from Office">Work from Office</option>
                    <option value="Work from Home">Work from Home</option>
                </select>

            {/* <button onClick={sendData}>Send me</button> */}
                

                {/* timer */}
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

                {<Tracker />}
                
            </div>
        </>
    )
}

export default Employee


// const Employee = () => {
//     const [selectedValue, setSelectedValue] = useState('');
//     console.log(selectedValue);
//     const handleChange = (e) => {
//       setSelectedValue(e.target.value);
//     }
//     const handleSubmit = () => {
//       if(selectedValue === '') {
//         alert('Please select an option');
//       } else {
//         // submit the form
//       }
//     }
  
//     return (
//       <div>
//         <select value={selectedValue} onChange={handleChange}>
//           <option value="">Select an Option</option>
//           <option value="1">Option 1</option>
//           <option value="2">Option 2</option>
//         </select>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     );
//   }
  
//   export default Employee;