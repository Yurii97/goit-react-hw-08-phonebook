import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation, useLoginMutation } from 'services/authApi';
import s from './AuthForm.module.css'
import {tokenAct} from 'redux/contacts/contacts-actions'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';

function AuthForm({ text }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [addUser, result] = useAddUserMutation();
    const [login, { data, isError, isLoading, isSuccess, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {token} = useSelector(state=>state.authUser)

    // console.log(result.data);
    useEffect(() => {
        // console.log(data);
        if (isSuccess) {
            // console.log(data);
            // console.log(isSuccess);
            toast.success('You are loggined.');
            dispatch(tokenAct(data.token));
            navigate('/contacts')
            //   return;
    }

    // if (isError) {
    //   switch (error.status) {
    //     case 400:
    //       return toast.error('Incorrect email or password.');
    //     default:
    //       return toast.error('Unknworn error.');
    //   }
    // }
  }, [data, isSuccess]);

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
            "email": userEmail,
            "password": userPassword,
        };        
        if (userName.trim()) {
            user.name = userName;
            addUser(user);
        } else {
            login(user);
        }
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        // navigate('/contacts')
    }
    return (
        <Form className={s.form} onSubmit={submitForm}>
            {text === 'Register'&& <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={userName} placeholder="Your name" onChange={handleChange}/>
                <Form.Text className="text-muted">
                    What is your name.
                </Form.Text>
            </Form.Group>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={userEmail} placeholder="Enter email" onChange={handleChange}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={userPassword} placeholder="Password" onChange={handleChange}/>
            </Form.Group>    
            <div className={s.btnList}>
                <Button variant="primary" type="submit" className={s.buttonSubm}>
                {text}
                </Button>
            </div>
            {text === "Login" && 
            <Link to="/register" className={s.link}>no account? Register</Link>
            }
        </Form>)
}

    export default AuthForm;