import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {

    const [apiData, setApiData] = useState([]);

    const pickData = (value) => {
        sessionStorage.setItem('Id', value._id);
    };

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('http://localhost:5000/users');
            setApiData(response.data);
        }
        getData();
    }, []);

    const onDelete = async (_id) => {
        let deletedata = await axios.delete(`http://localhost:5000/delete/${_id}`);
        if (deletedata) {
            getData();
        }
        else {
            alert("Unsuccessful");
        }
    };

    const getData = async () => {
        let response = await axios.get('http://localhost:5000/users');
        setApiData(response.data);
    }
    getData();

    const updateUser = (value) => {
        sessionStorage.setItem('UpdateId', value._id);
        sessionStorage.setItem('UpdateName', value.name);
        sessionStorage.setItem('UpdateUsername', value.username);
        sessionStorage.setItem('UpdatePassword', value.password)
        sessionStorage.setItem('UpdateRole', value.role);
    }

    const analyzeData = (value) => {
        sessionStorage.setItem('analyzeId', value._id);
    }

    return (
        <>
            {/* add employee button */}
            <Link to={'/addemployee'}><button>Add Employee</button></Link>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">User Role</th>
                        <th scope="col">View</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Analyze</th>
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
                                        <button>View</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link onClick={() => { updateUser(value) }} to={'/updateemployee'}>
                                        <button>Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => { onDelete(value._id) }}>Delete</button>
                                </td>
                                <td>
                                    <Link onClick={() => { analyzeData(value) }} to={'/analysis'}><button>Analysis</button></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Admin