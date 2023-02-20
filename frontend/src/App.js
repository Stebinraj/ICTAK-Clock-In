import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Home/Login';
import Employee from './components/Employee/Employee';
import Admin from './components/Admin/Admin';
import ViewAll from './components/Admin/ViewAll';
import AddEmployee from './components/Admin/AddEmployee';
import UpdateEmployee from './components/Admin/UpdateEmployee';
import UpdateTracker from './components/Admin/UpdateTracker';
import Analysis from './components/Admin/Analysis';
import AddProject from './components/Admin/AddProject';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/employee' element={<Employee />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/view' element={<ViewAll />}></Route>
                <Route path='/addemployee' element={<AddEmployee />}></Route>
                <Route path='/updateemployee' element={<UpdateEmployee />}></Route>
                <Route path='/updatetracker' element={<UpdateTracker />}></Route>
                <Route path='/analysis' element={<Analysis />}></Route>
                <Route path='/project' element={<AddProject />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
