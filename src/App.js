import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import DonorList from './Component/DonorList';
function App() {
  return (
   <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/donorlist' element={<DonorList/>}/>
 </Routes>
 </BrowserRouter>
   </>
  );
}

export default App;
