import { Routes,Route,BrowserRouter } from "react-router-dom"
import Interface from "./components/interface.jsx";
import './App.css';
import Transaction from "./components/transaction.jsx";
import PaidPayment from "./components/paidPayment.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/payment' element={<Interface/>}></Route>
        <Route path="/transaction" element={<Transaction/>}></Route>
        <Route path="/paidPayment" element={<PaidPayment/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
