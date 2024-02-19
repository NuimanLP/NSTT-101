import logo from './logo.svg';
import './App.css';
import { Routes,Route,BrowserRouter } from "react-router-dom"
import Admin from './Components/Admin/admin';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
