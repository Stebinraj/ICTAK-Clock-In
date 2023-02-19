import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Admin = () => {

    const [apiData, setApiData] = useState([]);

    // for viewing specific employee
    const pickData = (value) => {
        sessionStorage.setItem('Id', value._id);
        console.log(value._id);
    };

    // handle side effects of fetching employees
    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('http://localhost:5000/users');
            setApiData(response.data);
        }
        getData();
    }, []);

    // delete employee
    const onDelete = async (_id) => {
        let deletedata = await axios.delete(`http://localhost:5000/delete/${_id}`);
        if (deletedata) {
            getData();
        }
        else {
            alert("Unsuccessful");
        }
    };

    // fetch employee list after deleted specific employee
    const getData = async () => {
        let response = await axios.get('http://localhost:5000/users');
        setApiData(response.data);
    }

    // store _id, name, username, password, role in sessions for updating employee
    const updateUser = (value) => {
        sessionStorage.setItem('UpdateId', value._id);
        sessionStorage.setItem('UpdateName', value.name);
        sessionStorage.setItem('UpdateUsername', value.username);
        sessionStorage.setItem('UpdatePassword', value.password)
        sessionStorage.setItem('UpdateRole', value.role);
    }

    // store _id in sessions for analyse a specific employee tracking history
    const analyzeData = (value) => {
        sessionStorage.setItem('analyzeId', value._id);
    }

    return (
        <>
            {/* admin navbar */}
            <AdminNavbar />

            {/* add employee */}
            <br />
            <Link to={'/addemployee'}><button className='btn btn-primary ms-2'>Add Employee</button></Link>

            {/* Add Project*/}

            <Link to={'/project'}><button className='btn btn-primary ms-2'>Add Project / Task</button></Link>
            <br />
            <br />
            {/* Employee list start */}
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">User Role</th>
                        <th scope="col">View</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.filter((data) => data.role === "user").map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.username}</td>
                                <td>{value.role}</td>
                                <td>
                                    <Link onClick={() => { pickData(value) }} to={'/view'}>
                                        <button className='btn btn-outline-info text-dark'>View</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link onClick={() => { updateUser(value) }} to={'/updateemployee'}>
                                        <button className='btn btn-outline-success'>Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button className='btn btn-outline-danger' onClick={() => { onDelete(value._id) }}>Delete</button>
                                </td>
                                <td>
                                    <Link onClick={() => { analyzeData(value) }} to={'/analysis'}><button className='btn btn-outline-warning text-dark'>Analyse</button></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* Employee list end */}
        </>
    )
}

export default Admin