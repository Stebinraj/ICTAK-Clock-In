import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// const Analysis = () => {
//     const [_id, setId] = useState('');
//     const [range, setRange] = useState('daily');
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [totalTime, setTotalTime] = useState(0);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const start = moment(startDate).startOf('day').toISOString();
//             const end = moment(endDate).endOf('day').toISOString();
//             const res = await axios.get(`http://localhost:5000/${_id}/${range}?start=${start}&end=${end}`);
//             setTotalTime(res.data.total);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         setId(sessionStorage.getItem('analyzeId'));
//     }, []);

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="range">Time Range</label>
//                 <select id="range" value={range} onChange={(e) => setRange(e.target.value)}>
//                     <option value="daily">Daily</option>
//                     <option value="weekly">Weekly</option>
//                     <option value="monthly">Monthly</option>
//                     <option value="yearly">Yearly</option>
//                 </select>
//                 <label htmlFor="start-date">Start Date</label>
//                 <DatePicker id="start-date" selected={startDate} onChange={(date) => setStartDate(date)} />
//                 <label htmlFor="end-date">End Date</label>
//                 <DatePicker id="end-date" selected={endDate} onChange={(date) => setEndDate(date)} />
//                 <button type="submit">Submit</button>
//             </form>
//             <p>Total Time Tracked: {totalTime}</p>
//         </div>
//     );
// };

// export default Analysis;



const Analysis = () => {
    const [reportData, setReportData] = useState(null);
    const [_id, setId] = useState(''); // ID of the employee to retrieve data for
    const [range, setRange] = useState('daily');

    //   const handleEmployeeIdChange = (event) => {
    //     setEmployeeId(event.target.value);
    //   };

    const handleRangeChange = (event) => {
        setRange(event.target.value);
    };

    const handleReportSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:5000/${_id}/${range}`)
            .then(response => setReportData(response.data))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        setId(sessionStorage.getItem('analyzeId'));
    }, []);

    return (
        <div>
            <h2>Tracker Report</h2>
            <form onSubmit={handleReportSubmit}>
                <br />
                <label>
                    Range:
                    <select value={range} onChange={handleRangeChange}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </label>
                <br />
                <button type="submit">Get Report</button>
            </form>

            {reportData && (
                <div>
                    <h3>Total time tracked: {reportData.total}</h3>
                    <ul>
                        {reportData.data.map(item => (
                            <li key={item._id}>
                                <p>Project: {item.project}</p>
                                <p>Task: {item.task}</p>
                                <p>Job Description: {item.jobDescription}</p>
                                <p>Mode of Work: {item.modeOfWork}</p>
                                <p>Start Time: {item.startTime}</p>
                                <p>End Time: {item.endTime}</p>
                                <p>Duration: {moment.duration(moment(item.endTime).diff(moment(item.startTime))).asSeconds()} seconds</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Analysis;