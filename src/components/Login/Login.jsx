import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Spiner from "components/Spiner/Spiner"
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'services/authApi';
import {tokenAct, logAct} from 'redux/contacts/contacts-actions'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import s from './Login.module.css'

function Login() {    
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');    
    const [login,{ data, isError, isLoading, isSuccess, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast.success('You are loggined.');
            dispatch(tokenAct(data.token));
            dispatch(logAct(true));
            navigate('/contacts')   
        }
        if (isError) {            
            switch (error.status) {
                case 400:
                    return toast.error('Incorrect email or password.');
                default:
                    return toast.error('Unknworn error.');
            }
        }
    }, [data, isSuccess, isError, error, dispatch, navigate]);

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {            
            case 'email':
                setUserEmail(value);
                break;
            case 'password':
                setUserPassword(value);
                break;
            default:
                return;
        }
    };
    
    const submitForm = e => {
        e.preventDefault();        
        const user = {
            "email": userEmail,
            "password": userPassword,
        };
        login(user);    
        setUserEmail('');
        setUserPassword('');
    }
    return (<Form className={s.form} onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={userEmail}
                placeholder="Enter email"
                onChange={handleChange}
            />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                name="password"
                value={userPassword}
                placeholder="Password"
                onChange={handleChange}
            />
            </Form.Group>    
            <div className={s.btnList}>
                <Button variant="primary" type="submit" >
                    login                    
                </Button>
            </div>
            <div className={s.link}>
            {isLoading ? <Spiner size={25} />:<Link to="/register" >no account? Register</Link>}
            </div>            
        </Form>
    )
    
}    

export default Login