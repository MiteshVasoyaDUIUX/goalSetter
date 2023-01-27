import { useState, useEffect, React } from 'react';
import { FaUser } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {

    const [formData, setFormData] = useState({
        uname : '',
        email : '',
        password : '', 
        password2 : ''
    }); 

    
    const {uname, email, password, password2} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {user, isError, isLoading, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(()=>{
        if(isError){
            toast.error(message);
        }

        if(isSuccess || user){
            navigate('/');
        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    if(isLoading){
        return <Spinner/>
    }

    const onChange = (e) =>{
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    };

    const onSubmit = (e) =>{
        e.preventDefault();

        if(password !== password2){
            toast.error("Password not Matched...");
        } else{
            const userData = {
                uname,
                email,
                password
            };

            dispatch(register(userData));
            
        }
    }

    return <>
        <section className="heading">
            <FaUser/> Registration
        </section>    
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input type="text" className="form-control" value={uname} placeholder = "Enter Name" onChange={onChange} id='uname' name='uname' required/>
                <input type="email" className="form-control" value={email} placeholder = "Enter Email" onChange={onChange} id='email' name='email' required/>
                <input type="password" className="form-control" value={password} placeholder = "Enter Password" onChange={onChange} id='password' name='password' required maxLength={12} minLength={4}/>
                <input type="password" className="form-control" value={password2} placeholder = "ReType Password" onChange={onChange} id='password2' name='password2' required maxLength={12} minLength={4}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block"> Submit </button>
                </div>
            </form>
        </section>
        </>
    
}

export default Register