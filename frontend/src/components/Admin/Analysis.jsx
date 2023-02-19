import { useEffect, useState } from 'react';
// import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AdminNavbar from './AdminNavbar';

const Analysis = () => {
    const [_id, setId] = useState('');
    const [range, setRange] = useState('daily');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [total, setTotal] = useState('');

    const fetchData = async () => {
        const start = startDate.toISOString();
        const end = endDate.toISOString();
        const response = await fetch(`http://localhost:5000/${_id}/${range}/${start}/${end}`);
        const result = await response.json();
        setData(result.data);
        setTotal(result.total);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };

    useEffect(() => {
        setId(sessionStorage.getItem('analyzeId'));
    }, []);

    return (
        <>
            <AdminNavbar />
            <br />

            <div className="container-fluid p-0">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <form className="d-flex align-items-center mb-3" onSubmit={handleSubmit}>
                            <div className="form-group mr-3 ms-3">
                                <label htmlFor="range" className="mr-2"> <h5>Range:</h5> </label>
                                <select id="range" className="form-control" value={range} onChange={(e) => { setRange(e.target.value) }}>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <div className="form-group mr-3 ms-3">
                                <label htmlFor="startDate" className="mr-2"> <h5>Start Date:</h5> </label>
                                <DatePicker
                                    id="startDate"
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                    selected={startDate}
                                    onChange={(date) => { setStartDate(date) }}
                                    wrapperClassName="w-100"
                                    popperPlacement="bottom-start"
                                    popperModifiers={{
                                        preventOverflow: {
                                            enabled: true,
                                            escapeWithReference: false,
                                            boundariesElement: "viewport",
                                        },
                                    }}
                                    calendarClassName="border-0 shadow"
                                    shouldCloseOnSelect={true}
                                />
                            </div>
                            <div className="form-group mr-3 ms-3">
                                <label htmlFor="endDate" className="mr-2 analysis-label"> <h5>End Date:</h5> </label>
                                <DatePicker
                                    id="endDate"
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                    selected={endDate}
                                    onChange={(date) => { setEndDate(date) }}
                                    wrapperClassName="w-100"
                                    popperPlacement="bottom-start"
                                    popperModifiers={{
                                        preventOverflow: {
                                            enabled: true,
                                            escapeWithReference: false,
                                            boundariesElement: "viewport",
                                        },
                                    }}
                                    calendarClassName="border-0 shadow"
                                    shouldCloseOnSelect={true}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4 ms-3">Submit</button>
                        </form>


                        <div className="card mb-3 bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Total Hours : </h5>
                                <p className="card-text">{total}</p>
                            </div>
                        </div>

                        <table className="table table-striped table-hover table-responsive mt-1">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Project</th>
                                    <th>Task</th>
                                    <th>Job Description</th>
                                    <th>Mode of Work</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{moment(item.startTime).format('DD-MM-YYYY')}</td>
                                        <td>{item.project}</td>
                                        <td>{item.task}</td>
                                        <td>{item.jobDescription}</td>
                                        <td>{item.modeOfWork}</td>
                                        <td>{moment(item.startTime).format('hh:mm:ss a')}</td>
                                        <td>{moment(item.endTime).format('hh:mm:ss a')}</td>
                                        <td>{moment.utc(moment(item.endTime).diff(moment(item.startTime))).format("HH:mm:ss")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Analysis;