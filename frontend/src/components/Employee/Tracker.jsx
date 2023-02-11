import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Tracker = () => {

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('http://localhost:5000/tracker');
            if (response) {
                setApiData(response.data);
            }
        };
        getData();
    }, []);


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
                    {apiData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.project}</td>
                                <td>{value.task}</td>
                                <td>{value.jobDescription}</td>
                                <td>{ value.modeOfWork}</td>
                                <td >{moment(value.startTime).format('HH:mm:ss')}</td>
                                <td>{moment(value.endTime).format('HH:mm:ss')}</td>
                                <td>{moment.utc(moment(value.endTime, "HH:mm:ss").diff(moment(value.startTime, "HH:mm:ss"))).format("HH:mm:ss")}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Tracker