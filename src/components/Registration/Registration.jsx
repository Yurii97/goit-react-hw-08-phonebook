import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Spiner from "components/Spiner/Spiner"
import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation } from 'services/authApi';
import {tokenAct, logAct} from 'redux/contacts/contacts-actions'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import s from './Registration.module.css'

function Registration() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [addUser,{ data, isError, isLoading, isSuccess, error }] = useAddUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast.success('You have successfully registered.');
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
            case 'name':
                setUserName(value);
                break;
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
            "name": userName,
            "email": userEmail,
            "password": userPassword,
        };        
        addUser(user);
        setUserName('');
        setUserEmail('');
        setUserPassword('');
    }
    return (
        <Form className={s.form} onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={userName}
                    placeholder="Your name"
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                />
                <Form.Text className="text-muted">
                    What is your name.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email"
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
                    // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                />
            </Form.Group>    
            <div className={s.btnList}>
                <Button variant="primary" type="submit" className={s.buttonSubm}>
                {isLoading && <Spiner size={12}/>}
                    Register
                </Button>
            </div>
            <div className={s.link}>
            {isLoading ? <Spiner size={25} />:<Link to="/login" >You have account? Login</Link>}
            </div>
        </Form>    
    )
}

export default Registration