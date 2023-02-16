import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

const UpdateTracker = () => {

    const [_id, setId] = useState('');
    const [project, setProject] = useState('');
    const [task, setTask] = useState('');
    const [jobDescription, setJobDesc] = useState('')
    const [modeOfWork, setModeOfWork] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setId(sessionStorage.getItem('TrackerId'));
        setProject(sessionStorage.getItem('TrackerProject'));
        setTask(sessionStorage.getItem('TrackerTask'));
        setJobDesc(sessionStorage.getItem('TrackerJobDesc'));
        setModeOfWork(sessionStorage.getItem('TrackerModeOfWork'));
        setStartTime(sessionStorage.getItem('TrackerStartTime'))
        setEndTime(sessionStorage.getItem('TrackerEndTime'))
    }, []);

    const updateTracker = () => {
        let updatedTracker = axios.put(`http://localhost:5000/tracker/${_id}`, { project, task, jobDescription, modeOfWork });
        if (updatedTracker) {
            alert('Update Successfully');
            navigate('/view', { replace: true });
        }
        else {
            alert('Data cannot be updated');
        }
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color='blue' textAlign='center'>
                    <h2>Tracker Update</h2>
                </Header>
                <Form size='large'>
                    <Segment>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='Project' type='text' onChange={(e) => { setProject(e.target.value) }} value={project} />
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Task' type='text' onChange={(e) => { setTask(e.target.value) }} value={task} />
                        <Form.Input fluid icon='key' iconPosition='left' placeholder='Job Description' type='text' onChange={(e) => { setJobDesc(e.target.value) }} value={jobDescription} />
                        <Form.Input fluid icon='key' iconPosition='left' placeholder='Mode of Work' type='text' onChange={(e) => { setModeOfWork(e.target.value) }} value={modeOfWork} />
                        <button onClick={updateTracker} className="ui primary button" style={{ width: '100%' }}>Update</button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default UpdateTracker