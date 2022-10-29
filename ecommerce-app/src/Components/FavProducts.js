import React from 'react'
import { IndivFavProd } from './IndivFavProd'
import './IndivProd.css'


export const FavProducts = ({favProducts}) => {
    return favProducts.map((favProduct)=>(
        <IndivFavProd key={favProduct.ID} favProduct={favProduct}/>
    ))
}