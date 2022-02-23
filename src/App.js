import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from 'components/Layout/Layout';
import AuthPage from "page/AuthPage";
import Login from "components/Login/Login";
import Registration from "components/Registration/Registration";
import PhoneBookPage from "page/PhoneBookPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthPage />} >
          {/* <Route index element={<Layout />} /> */}
          <Route path='login' element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="contacts" element={<PhoneBookPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
