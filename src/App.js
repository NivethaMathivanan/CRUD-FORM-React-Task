
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Form from './Pages/Form';
import Table from './Pages/Table';
import Loading from './loading/Loading';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"



function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to='/Form' />} />
        <Route path='/Form' element={<Form />} />
        <Route path='/form:id?' element={<Form />} />
        <Route path='/Table' element={<Table />} />
        <Route path='/loader' element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
