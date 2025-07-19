
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import DonorData from './Component/DonorData';
function App() {
  return (
   <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/donorlist' element={<DonorData/>}/>
 </Routes>
 </BrowserRouter>
   </>
  );
}

export default App;
