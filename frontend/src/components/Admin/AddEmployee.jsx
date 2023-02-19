import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import AdminNavbar from './AdminNavbar';

const AddEmployee = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    // creating an employee, navigation
    const addEmployee = async () => {
        let added = await axios.post('http://localhost:5000/register', { name, username, password, role });
        if (added) {
            alert("Employee Added Successfull");
            navigate('/admin', { replace: true });
        }
        else {
            alert('Employee Cannot Added');
        }
    };

    return (
        <>
            {/* admin navbar */}
            <AdminNavbar />

            {/* Add employee start */}

            <Grid textAlign='center' style={{ height: '80vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header color='blue' textAlign='center'>
                        <h2>Add Employee</h2>
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value) }} />
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} />
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
                            <Form.Input fluid icon='universal access' iconPosition='left' placeholder='Role' type='text' onChange={(e) => { setRole(e.target.value) }} />
                            <button onClick={addEmployee} className="ui primary button" style={{ width: '100%' }}>Submit</button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>

            {/* Add employee End */}
        </>
    )
}

export default AddEmployee