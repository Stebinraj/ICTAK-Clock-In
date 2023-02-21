import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateTracker from './UpdateTracker';
import AdminNavbar from './AdminNavbar';

const ViewAll = () => {

    const [getData, setGetData] = useState([]);
    const _id = sessionStorage.getItem('Id');
    let token = sessionStorage.getItem('Token');

    useEffect(() => {

        // fetch tracker history of specific user
        const fetchData = async () => {
            try {
                const response = await axios.post(`/api/tracker/${_id}`, { token });
                setGetData(await response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [_id, token]);

    // store data in session for updating specific employee tracker history
    const updateTracker = (value) => {
        sessionStorage.setItem('TrackerId', value._id);
        sessionStorage.setItem('TrackerProject', value.project);
        sessionStorage.setItem('TrackerTask', value.task);
        sessionStorage.setItem('TrackerJobDesc', value.jobDescription);
        sessionStorage.setItem('TrackerModeOfWork', value.modeOfWork);
        sessionStorage.setItem('TrackerToken', token);
    };

    // delete specific employee tracker history
    const deleteData = (_id) => {
        let deleted = axios.delete(`/api/tracker/${_id}`);
        if (deleted) {
            alert('Deleted Successfully');
            gettData();
        }
        else {
            alert('Unsuccessfull');
        }
    };

    // fetch data after deleted specific employee tracker history
    const gettData = async () => {
        try {
            const response = await axios.post(`/api/tracker/${_id}`, { token });
            setGetData(await response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {/* admin navbar */}
            <AdminNavbar />

            {/* tracker history start */}
            <table className="table table-striped table-hover table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Project</th>
                        <th scope="col">Task</th>
                        <th scope="col">Job Description</th>
                        <th scope="col">Mode of Work</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Total Time</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{moment(value.startTime).format('DD-MM-YYYY')}</td>
                                <td>{value.project}</td>
                                <td>{value.task}</td>
                                <td>{value.jobDescription}</td>
                                <td>{value.modeOfWork}</td>
                                <td>{moment(value.startTime).format('HH:mm:ss')}</td>
                                <td>{moment(value.endTime).format('HH:mm:ss')}</td>
                                <td>{moment.utc(moment(value.endTime).diff(moment(value.startTime))).format("HH:mm:ss")}</td>
                                <td>
                                    <Link onClick={() => { updateTracker(value) }} to={'/updatetracker'} element={<UpdateTracker />}>
                                        <button className='btn btn-outline-success'>Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button className='btn btn-outline-danger' onClick={() => { deleteData(value._id) }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* tracker history end */}
        </>
    )
}

export default ViewAll