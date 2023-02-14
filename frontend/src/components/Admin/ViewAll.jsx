import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const ViewAll = () => {

    const [getData, setGetData] = useState([]);
    const [_id, setEmpId] = useState('');

    useEffect(() => {
        setEmpId(sessionStorage.getItem('Id'));

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


    return (
        <>
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
                    {getData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.project}</td>
                                <td>{value.task}</td>
                                <td>{value.jobDescription}</td>
                                <td>{value.modeOfWork}</td>
                                <td>{moment(value.startTime).format('HH:mm:ss')}</td>
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

export default ViewAll