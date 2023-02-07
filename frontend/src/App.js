import { Route, Routes } from 'react-router-dom';
import './App.css';
import Start from './components/Start';
import Tracker from './components/Tracker';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Start />}></Route>
            <Route path='/track' element={<Tracker />}></Route>
        </Routes>
    );
}

export default App;
