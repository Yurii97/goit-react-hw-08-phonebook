import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation} from 'services/authApi';
import { useSelector, useDispatch } from 'react-redux';
import { logAct, tokenAct } from 'redux/contacts/contacts-actions';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import s from './Layout.module.css'

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token, isLoggedIn} = useSelector(state=>state)
    const { data } = useGetUserQuery(token);
    const [logout] = useLogoutMutation();

    useEffect(() => {        
        !data && navigate('/login')
},[data])

    const logoutUser = (token) => {
        logout(token)
        dispatch(logAct(false));
        dispatch(tokenAct(''));
        toast.success('You are logged out.')
        navigate('/login')
    }
    
    return (<>
    <Toaster />    
        <div>
            <nav className={s.nav}>
                {!data || !isLoggedIn ?(<div >
                <NavLink to='/login' className={s.navLinc}>Login</NavLink>
                <NavLink to='/register' className={s.navLinc}>Registration</NavLink>
                </div>) : (<div className={s.userData}><span >Hello {data.name}</span>
                        <Button variant="primary" tupe='button' onClick={()=>logoutUser(token)} className={s.button}>LogOut</Button>
                </div>)}
                
            </nav>
        </div>
        
    </>
    );
}

export default Layout