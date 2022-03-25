import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import AuthPage from "page/AuthPage";
import Login from "components/Login/Login";
import Registration from "components/Registration/Registration";
import PhoneBookPage from "page/PhoneBookPage/PhoneBookPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import {logAct} from 'redux/contacts/contacts-actions'
import {useGetUserQuery} from 'services/authApi'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state);
  const { data } = useGetUserQuery(token);
  
  useEffect(() => {
    if (token !== "") {
      data && navigate('/contacts')
      dispatch(logAct(true));
    }
  }, [token, data, navigate, dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<AuthPage />} >
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
