import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate= useNavigate();


    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const [errorMsg, setErrorMsg]= useState(''); 
    const [successMsg, setSuccessMsg]= useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log(email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successfull. You will now automatically get redirected to Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                navigate('/');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    }
    



  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>Log In</h1>
        <hr></hr>
        <form className='form-group' autoComplete="off" onSubmit={handleLogin}>
            <label className='lab1'>Email</label>
            <input type="email" className='form-control1' required 
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <br></br>
            <label className='lab2'>Password</label>
            <input type="password" className='form-control2' required 
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <br></br>
            <div className='btn-box'>
                <span className='phrase2'>Don't have an Account ? Sign Up <Link className='hereS' to="/signup">Here</Link></span>
                <button type="submit" className='btnLogin'>Login</button>
            </div>
        </form>
        {successMsg&&<>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                
                

                <div className='success-msg'>{successMsg}</div>
        </>}
        
        {errorMsg&&<>
            <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className='error-msg'>{errorMsg}</div>                
        </>}

    </div>
  )
}
