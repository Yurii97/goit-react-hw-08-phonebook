import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate, } from "react-router-dom";
import { useGetUserQuery } from 'services/authApi';
import { useSelector } from 'react-redux';
import s from './Layout.module.css'

function Layout() {
    const navigate = useNavigate();
    const token = useSelector(state=>state.token)
    const { data } = useGetUserQuery(token);
    console.log(data);
    const user = data;
    useEffect(() => {
        user && navigate('/contacts')
        !user && navigate('/login')
},[user])

    return (<>
    <Toaster />    
        <div>
            <nav className={s.nav}>
                {!user?(<div >
                <NavLink to='/login' className={s.navLinc}>Login</NavLink>
                <NavLink to='/register' className={s.navLinc}>Registration</NavLink>
                </div>) : (<div>
                        <button tupe='button'>LogOut</button>
                </div>)}
                
            </nav>
        </div>
        
    </>
    );
}

export default Layout