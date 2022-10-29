import React from 'react'
import logo from '../Images/logo.png'
import fb from '../Images/fb.png'
import insta from '../Images/insta.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className='part1'>
            <div className='social media'>
                <h3 className='gt'>Visit our social media</h3>
                <br></br>
                <div className='smlogos'>
                <div className='facebook'><img src={fb} height={35} alt='logo' /></div>
                <div className='instagram'><img src={insta} height={35} alt='logo' /></div>
                </div>
                
            </div>
            <div className='logoWeThrift'><img src={logo} height={100} alt='logo' /></div>
            <div className='contact us'>
                <h3 className='gt'>Contact Us</h3>
                <br></br>
                <div className='telephone'>Tel: +21254439318</div>
                <div className='email'> Email: thrift@gmail.com</div>
            </div>
            
        </div>
        <br></br>
        <br></br>

        <div className='part2'>Realized by Manal Ahmadi</div>
    </div>

  )
}
