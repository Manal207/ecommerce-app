import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'
import { auth } from '../Config/Config'
import {cart} from 'react-icons-kit/icomoon/cart'
import {Icon} from 'react-icons-kit'
import {heart} from 'react-icons-kit/fa/heart'
import { useState } from 'react'




export const Navbar = ({user, totalProducts, totalProductsFav}) => {

  
  const navigate = useNavigate();
  const[navbar, setNavbar]=useState(false);

  const handleLogout=()=>{
      auth.signOut().then(()=>{
          navigate('/login');
      });



      
  }
  const goToHome=()=>{
    navigate('/');
  }

  const changeBackground = () => {
    // console.log(window.scrollY)
    if (window.scrollY > 10){
        setNavbar(true);
    }
    else{
        setNavbar(false);
    }

  }
  window.addEventListener('scroll', changeBackground);


  
  return (

    <div className={navbar ? 'navbar active' : 'navbar'}>
    <div className='leftside'>
        <div className='logo' >
            <img src={logo} height={30} alt="logo" onClick={goToHome}/>
        </div>
    </div>
    <div className='rightside'>

        {!user&&<>
                    <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
        </>} 

        {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div></div>
                    <div className='vl'></div>
                    <div></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                            <Icon icon={cart} size={30}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                    <div className='heart-menu-btn'>
                        <Link className='navlink' to="/fav">
                            <Icon icon={heart} size={30}/>
                        </Link>
                        <span className='cart-indicator'>{totalProductsFav}</span>
                    </div>

                    <div></div>
                    <div><input type="button" className='navbtn' value="Log Out" onClick={handleLogout} /></div>
                
                    
        </>} 


                      
    </div>
</div>
  )
}
