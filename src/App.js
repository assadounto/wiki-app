import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Country from './components/Country';

function App() {
  return (
      <div>
          <Routes>
             <Route path='/' element={<Mainpage/>}/>
             <Route  path='/:country/:lat/:lon/' element={<Country/>}/>
          </Routes>
  
      </div>
  )  
}

export default App;
