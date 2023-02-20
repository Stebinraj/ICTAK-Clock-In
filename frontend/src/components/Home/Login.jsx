import React, { useState } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // login credentials check, storing sessions and redirection start
    const authenticate = async () => {
        let response = await axios.post('http://localhost:5000/login', { username, password });
        
        if (response.data.token && response.data.user.role === "user") {
            sessionStorage.setItem('Id', response.data.user._id);
            sessionStorage.setItem('Name', response.data.user.name);
            sessionStorage.setItem('Username', response.data.user.username);
            sessionStorage.setItem('Role', response.data.user.role);
            sessionStorage.setItem('Token', response.data.token);
            navigate('/employee', { replace: true });
            alert("Login Successfull!!!");
        }
        else if (response.data.token && response.data.user.role === "admin") {
            sessionStorage.setItem('adminId', response.data.user._id);
            sessionStorage.setItem('Name', response.data.user.name);
            sessionStorage.setItem('Username', response.data.user.username);
            sessionStorage.setItem('Role', response.data.user.role);
            sessionStorage.setItem('Token', response.data.token);
            navigate('/admin', { replace: true });
            alert("Admin Login Successfull!!!");
        }
        else {
            if (response.data === 'User does not exist' || response.data === 'Invalid Password') {
                alert(response.data);
            }
        }
    }
    // login credentials check, storing sessions and redirection end

    return (
        <>
            {/* Login Page Start */}

            {/* navbar */}
            <HomeNavbar />

            <Grid textAlign='center' style={{ height: '90vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header color='blue' textAlign='center'>
                        <h2>Login</h2>
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} />
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
                            <button onClick={authenticate} className="ui primary button" style={{ width: '100%' }}>Login</button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>

            {/* Login page End */}
        </>
    )
}

export default Login