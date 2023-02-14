import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Home/Login';
import Employee from './components/Employee/Employee';
import Admin from './components/Admin/Admin';
import ViewAll from './components/Admin/ViewAll';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/employee' element={<Employee />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/view' element={<ViewAll />}></Route>
        </Routes>
    );
}

export default App;
