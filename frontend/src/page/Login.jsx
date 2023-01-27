import { useState, useEffect, React } from 'react';
import { FaSignInAlt } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

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
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault();    
    const userData = {
      email,
      password
  };

  dispatch(login(userData));
  }


  return <>
    <section className="heading">
      <FaSignInAlt /> Login
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <input type="email" value={email} placeholder="Enter Email" name="email" onChange={onChange} required/>
        <input type="password" value={password} placeholder="Enter Password" name="password" onChange={onChange} required/>
      </div>
      
      <div className="form-group">
        <button type="submit" className="btn btn-block">Submit</button>
      </div>
      </form>
      <ToastContainer 
      autoClose={5000}/>
    </section>
  </>
}

export default Login