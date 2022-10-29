import React from 'react'
import './IndivProd.css'
import trashLogo from '../Images/trashLogo.png'
import { fs, auth } from '../Config/Config'

export const IndivFavProd = ({favProduct}) => {


    const handleFavProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Favorites ' + user.uid).doc(favProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                    alert('successfully deleted');
                })
            }
        })
    }

  return (


    <div className='product'>
            <div className='product-img'>
                <img src={favProduct.url} height={300} alt="product-img"/>
            </div>
            <div className='product-description'>{favProduct.description}</div>
            <div className='pch'>
            <div className='product-price'>${favProduct.price}</div>
            <div className='btn-trash'><img src={trashLogo} alt="trash-logo" height={23} onClick={handleFavProductDelete} /></div>  
            </div>
                     
        </div>  
    
  )
}