import React from 'react'
import { IndividualProduct } from './IndividualProduct';

export const Products = ({products, addToCart, addToFavorites}) => {


  console.log(products);


  return products.map((individualProduct)=>(
    <IndividualProduct key= {individualProduct.ID} individualProduct={individualProduct}
    addToCart={addToCart} addToFavorites={addToFavorites} 
    />
    
  ))
  
}
