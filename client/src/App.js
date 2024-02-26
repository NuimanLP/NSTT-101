import './App.css';
import { Routes,Route,BrowserRouter } from "react-router-dom"
import Admin from './Components/Admin/admin';
import { LoginForm } from './Components/temporatylogin';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Admin/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
