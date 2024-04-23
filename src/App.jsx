import './App.css'
import {Route,Routes} from "react-router-dom";
import AddProductPage from './Pages/AddProductPage';
import AuthenticationPage from './Pages/AuthenticationPage';
import BillingPage from './Pages/BillingPage';
import DashboardPage from './Pages/DashboardPage';
function App() {
 

  return (
   <Routes>
       <Route exact path='/' element={<AuthenticationPage/>}/>
       <Route path='/dashboard' element={<DashboardPage/>}/>
       <Route path='/addtoproduct' element={<AddProductPage/>}/>
       <Route path='/billing' element={<BillingPage/>}/>
       <Route path='/reset/:id' element={<AuthenticationPage/>}/>
   </Routes>
  )
}

export default App
