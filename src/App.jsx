import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import Toaster from 'react-hot-toast'

function App() {

  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/logout' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/dashboard' element={<Home/>}></Route>
            <Route path='/income' element={<Income/>}></Route>
            <Route path='/expense' element={<Expense/>}></Route>
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions = {{
          className:"",
          style:{
            fontSize:'13px'
          },
        }}
      />
    </UserProvider>
  )
}

const Root = ()=>{
  const isAuthenticated =!!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"/>

  ):(
    <Navigate to = "/login"/>
  ) 
}

export default App
