import { Route, Routes } from 'react-router-dom';
import './App.css';
import Start from './components/Start';
import Tracker from './components/Employee/Tracker';
import Login from './components/Home/Login';
import Employee from './components/Employee/Employee';
import Admin from './components/Admin/Admin';

function App() {
    return (
        <Routes>
            {/* <Route path='/' element={<Start />}></Route>
            <Route path='/track' element={<Tracker />}></Route> */}
            <Route path='/' element={<Login />}></Route>
            <Route path='/employee' element={<Employee />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
        </Routes>
    );
}

export default App;
