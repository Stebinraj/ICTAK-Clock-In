import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import AdminNavbar from './AdminNavbar';

const UpdateEmployee = () => {

    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setId(sessionStorage.getItem('UpdateId'));
        setName(sessionStorage.getItem('UpdateName'))
        setUsername(sessionStorage.getItem('UpdateUsername'))
        setPassword(sessionStorage.getItem('UpdatePassword'));
        setRole(sessionStorage.getItem('UpdateRole'));
    }, [])

    const updateEmployee = async () => {
        let updated = await axios.put(`http://localhost:5000/users/${_id}`, { name, username, password, role });
        if (updated) {
            alert('Updated Successfull');
            navigate('/admin', { replace: true });
        }
        else {
            alert('Updation failed');
        }
    }


    return (
        <>
            <AdminNavbar />

            <Grid textAlign='center' style={{ height: '80vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header color='blue' textAlign='center'>
                        <h2>Update Employee</h2>
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value) }} value={name} />
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} value={username} />
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                            <Form.Input fluid icon='universal access' iconPosition='left' placeholder='Role' type='text' onChange={(e) => { setRole(e.target.value) }} value={role} />
                            <button onClick={updateEmployee} className="ui primary button" style={{ width: '100%' }}>Update</button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default UpdateEmployee