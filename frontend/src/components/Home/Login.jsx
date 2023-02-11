import React, { useState } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [empId, setEmpId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const authenticate = async () => {
        let response = await axios.post('http://localhost:5000/login', { empId, username, password });
        if (response.data.role === "user") {
            sessionStorage.setItem('Id', response.data._id);
            sessionStorage.setItem('EmpId', response.data.empId);
            sessionStorage.setItem('Username', response.data.username);
            sessionStorage.setItem('Role', response.data.role);
            navigate('/employee', { replace: true });
            alert("Login Successfull!!!");
        }
        else {
            if (response.data.role === "admin") {
                alert("admin");
            }
        }
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color='blue' textAlign='center'>
                    <h2>Login</h2>
                </Header>
                <Form size='large'>
                    <Segment>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setEmpId(e.target.value) }} />
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} />
                        <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='text' onChange={(e) => { setPassword(e.target.value) }} />
                        <button onClick={authenticate} className="ui primary button" style={{ width: '100%' }}>Login</button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Login