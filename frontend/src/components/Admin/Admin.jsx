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
            alert('deletd');
        }
        else {
            alert("error happen")
        }
    }




    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">User Role</th>
                    <th scope="col">View</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {apiData.filter((data)=>data.role==="user").map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.username}</td>
                                <td>{value.role}</td>
                                <td>{value._id}</td>
                                <td>
                                    <Link onClick={() => { pickData(value) }} to={'/view'}>
                                        <button>View</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={'/'}>
                                        <button>Update</button>
                                    </Link>
                                </td>
                                <td>
                                    {/* <Link onClick={()=>{onDelete(value._id)}} to={'/'}> */}
                                    <button onClick={() => { onDelete(value._id) }}>Delete</button>
                                    {/* </Link> */}
                                </td>
                            </tr>
                        )
                })}
            </tbody>
        </table>
    )
}

export default Admin