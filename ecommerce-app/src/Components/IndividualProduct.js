import React from 'react'
import './IndivProd.css'
import cartLogo from '../Images/cartLogo.png'
import heartLogo from '../Images/heartLogo.png'

export const IndividualProduct = ({individualProduct, addToCart, addToFavorites}) => {


  



    // console.log(individualProduct);

    const handleAddToCart=()=>{
      addToCart(individualProduct);
    }

    const handleAddToFavorites=()=>{
      addToFavorites(individualProduct);
    }
    

    
    
  return (

    

    <div className='product'>
            <div className='product-img'>
                <img src={individualProduct.url} height={300}  alt="product-img"  />
            </div>
            
            <div className='product-description'>{individualProduct.description}</div>
            
            <div className='pch'>
              <div className='product-price'>${individualProduct.price}</div>
            
            
            
              <div className='btn-cart' title='add to cart'><img src={cartLogo} alt="cart-logo" height={23} onClick={handleAddToCart} title='add to cart' /></div>
              <div className='btn-heart' title='add to favorites'><img src={heartLogo} alt="heart-logo" height={23} onClick={handleAddToFavorites} /></div>
            </div>

            
            
            
            
        </div> 
  )
}
