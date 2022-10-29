import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { auth,fs } from '../Config/Config';


export const Signup = () => {

    const navigate = useNavigate();

    const [fullName, setFullName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const [errorMsg, setErrorMsg]= useState(''); 
    const [successMsg, setSuccessMsg]= useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFullName('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }




  return (
    
    <div className='container'>
        <br></br>
        <br></br>
        <h1>Sign Up</h1>
        <hr></hr>
        <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
            <label className="lab1">Full Name</label>
            <input type="text" className='form-control1' required 
            onChange={(e)=>setFullName(e.target.value)} value={fullName}></input>
            <br></br>
            <label className='lab2'>Email</label>
            <input type="email" className='form-control2' required 
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <br></br>
            <label className='lab3'>Password</label>
            <input type="password" className='form-control3' required 
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <br></br>
            <div className='btn-box'>
                <span className='phrase'>Already have an Account ? Log In <Link className="hereS" to='/login'>Here</Link></span>
                <button type="submit" className='btnSignup'>Signup</button>
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
