import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LayOut from "./LayOut";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="edit/:id" element={<EmployeeForm />} />
          <Route path="create" element={<EmployeeForm/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
} 