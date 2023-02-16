import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';

const AddProject = () => {

    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);

    const sendProject = async () => {
        let response = await axios.post('http://localhost:5000/project', { label, value });
        if (response) {
            alert('Added Successfull');
        } else {
            alert('Unsuccessfull')
        }
    };

    const sendTask = async () => {
        let res = await axios.post('http://localhost:5000/task', { label, value });
        if (res) {
            alert('Added Successfull');
        } else {
            alert('Unsuccessfull')
        }
    };

    useEffect(() => {
        const getProject = async () => {
            let project = await axios.get('http://localhost:5000/project');
            setProjectData(project.data);
        }
        getProject();

        const getTask = async () => {
            let task = await axios.get('http://localhost:5000/task');
            setTaskData(task.data);
        }
        getTask();
    }, [])


    return (
        <>
            <main className="container mt-3">
                <div className="row">
                    <section className="col-lg-6">
                        <h2 className="section-header">Add Project</h2>
                        <form className="form" size="large">
                            <div className="form-group">
                                <label htmlFor="projectName">Name:</label>
                                <input id="projectName" className="form-control" type="text" placeholder="Enter project name" onChange={(e) => { setLabel(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectValue">Value:</label>
                                <input id="projectValue" className="form-control" type="text" placeholder="Enter project value" onChange={(e) => { setValue(e.target.value) }} />
                            </div>
                            <button className="btn btn-primary" onClick={sendProject}>Add project</button>
                        </form>
                        <h2 className="section-header">Available Projects</h2>
                        <ul className="list-group">
                            {projectData.map((value, index) => {
                                return (
                                    <li className="list-group-item" key={index}>{value.label}</li>
                                )
                            })}
                        </ul>
                    </section>
                    <section className="col-lg-6">
                        <h2 className="section-header">Add Task</h2>
                        <form className="form" size="large">
                            <div className="form-group">
                                <label htmlFor="taskName">Name:</label>
                                <input id="taskName" className="form-control" type="text" placeholder="Enter task name" onChange={(e) => { setLabel(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskValue">Value:</label>
                                <input id="taskValue" className="form-control" type="text" placeholder="Enter task value" onChange={(e) => { setValue(e.target.value) }} />
                            </div>
                            <button className="btn btn-primary" onClick={sendTask}>Add task</button>
                        </form>
                        <h2 className="section-header">Available Tasks</h2>
                        <ul className="list-group">
                            {taskData.map((value, index) => {
                                return (
                                    <li className="list-group-item" key={index}>{value.label}</li>
                                )
                            })}
                        </ul>
                    </section>
                </div>
            </main>

        </>
    )
}

export default AddProject