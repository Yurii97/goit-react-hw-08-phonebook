import { Link } from 'react-router-dom';
import s from './HomePage.module.css'

function HomePage() {
    
    return (
        <div className={s.container}>
            <div>
            <h1 className={s.h1}>Hello friend! </h1>
            <h2 className={s.h2}>Welcome to the phonebook app</h2>
            <p className={s.text}>To enter - <Link to="/login" >Login</Link></p>
            <p className={s.text}>no account? - <Link to="/register" >Register</Link></p>
            </div>
        </div>);
};
export default HomePage