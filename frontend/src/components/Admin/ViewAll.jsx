import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateTracker from './UpdateTracker';
import AdminNavbar from './AdminNavbar';

const ViewAll = () => {

    const [getData, setGetData] = useState([]);
    const _id = sessionStorage.getItem('Id');
    console.log(_id)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tracker/${_id}`);
                setGetData(await response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [_id]);

    const updateTracker = (value) => {
        sessionStorage.setItem('TrackerId', value._id);
        sessionStorage.setItem('TrackerProject', value.project);
        sessionStorage.setItem('TrackerTask', value.task);
        sessionStorage.setItem('TrackerJobDesc', value.jobDescription);
        sessionStorage.setItem('TrackerModeOfWork', value.modeOfWork);
        sessionStorage.setItem('TrackerStartTime', value.startTime);
        sessionStorage.setItem('TrackerEndTime', value.endTime);
    };

    const deleteData = (_id) => {
        let deleted = axios.delete(`http://localhost:5000/tracker/${_id}`);
        if (deleted) {
            alert('Deleted Successfull');
            gettData();
        }
        else {
            alert('Unsuccessfull');
        }
    };

    const gettData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tracker/${_id}`);
            setGetData(await response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <AdminNavbar />

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
        </>
    )
}

export default ViewAll