import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AddProject = () => {

    const [label, setLabel] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const token = sessionStorage.getItem('Token');

    // add project
    const sendProject = async () => {
        let response = await axios.post('/api/project', { label, token });
        if (response) {
            alert('Added Successfull');
        } else {
            alert('Unsuccessfull')
        }
    };

    // add tasks
    const sendTask = async () => {
        let res = await axios.post('/api/task', { label, token });
        if (res) {
            alert('Added Successfully');
        } else {
            alert('Unsuccessfull')
        }
    };

    useEffect(() => {
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
    }, [token])


    return (
        <>
            {/* admin navbar */}
            <AdminNavbar />

            {/* add project start */}
            <main className="container mt-3">
                <div className="row">
                    <section className="col-lg-6">
                        <h2 className="section-header">Add Project</h2>
                        <form className="form" size="large">
                            <div className="form-group">
                                <input id="projectName" className="form-control" type="text" placeholder="Enter Project Name" onChange={(e) => { setLabel(e.target.value) }} />
                            </div>
                            <button className="btn btn-primary mt-2" onClick={sendProject}>Add project</button>
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
                                <input id="taskName" className="form-control" type="text" placeholder="Enter task name" onChange={(e) => { setLabel(e.target.value) }} />
                            </div>
                            <button className="btn btn-primary mt-2" onClick={sendTask}>Add task</button>
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
            {/* add project end */}
        </>
    )
}

export default AddProject