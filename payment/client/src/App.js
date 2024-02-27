import { Routes,Route,BrowserRouter } from "react-router-dom"
import Interface from "./components/interface.jsx";
import './App.css';
import Transaction from "./components/transaction.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Interface/>}></Route>
        <Route path="/transaction" element={<Transaction/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
