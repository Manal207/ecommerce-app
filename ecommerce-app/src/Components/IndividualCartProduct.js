import React from 'react'
import './IndivProd.css'
import trashLogo from '../Images/trashLogo.png'
import { fs, auth } from '../Config/Config'

export const IndividualCartProduct = ({cartProduct}) => {


    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                    alert('successfully deleted');
                })
            }
        })
    }

  return (


    <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} height={300} alt="product-img"/>
            </div>
            <div className='product-description'>{cartProduct.description}</div>
            <div className='pch'>
            <div className='product-price'>${cartProduct.price}</div>
            <div className='btn-trash'><img src={trashLogo} alt="trash-logo" height={23} onClick={handleCartProductDelete} /></div>  
            </div>
                     
        </div>  
    
  )
}
