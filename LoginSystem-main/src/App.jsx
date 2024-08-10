
import './App.css'

import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Login from './Components/Login';
import { Home } from './Components/Home';
import { useNavigate } from "react-router-dom"
import Register from './Components/register';

function App() {
  
  // const navigate=useNavigate()
  // const home=false;
  return (
    <>
    <Router>

      <Routes>
       {/* { !localStorage.getItem('id')?<Route path='/login' element={<Login />}></Route>: ''} */}
        <Route path='/' element={<Login/>} > </Route>
       <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </Router>
     

  
    </>
  )
}

export default App
