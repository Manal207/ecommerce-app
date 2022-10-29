import React from 'react'
import { Navbar } from './Navbar'
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, fs } from '../Config/Config';
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import './IndivProd.css';



export const Cart = () => {

    // getting current user function
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}

const user = GetCurrentUser();
// console.log(user);

//state of cart products
const [cartProducts, setCartProducts]= useState([]);

// getting cart products from firestore collection and updating the state
useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                const newCartProduct = snapshot.docs.map((doc)=>({
                    ID: doc.id,
                    ...doc.data(),
                }));
                setCartProducts(newCartProduct);                    
            })
        }
        else{
            console.log('user is not signed in to retrieve cart');
        }
    })
},[])

// console.log(cartProducts);

//getting the qty from cartProducts in a separate array
const qty = cartProducts.map(cartProduct=>{
    return cartProduct.qty;
});
// console.log(qty);

 // reducing the qty in a single value
 const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

 const totalQty = qty.reduce(reducerOfQty,0);

//  console.log(totalQty);

// getting the TotalProductPrice from cartProducts in a seperate array
const price = cartProducts.map((cartProduct)=>{
    return cartProduct.TotalProductPrice;
})
// console.log(price);

 // reducing the price in a single value
 const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

 const totalPrice = price.reduce(reducerOfPrice,0);
 console.log(totalPrice);



 // state of totalProducts
const [totalProducts, setTotalProducts]=useState(0);
// getting cart products   
useEffect(()=>{        
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                const qty = snapshot.docs.length;
                setTotalProducts(qty);
            })
        }
    })       
},[]) 



const handleToken = async(token)=>{
    console.log(token);
}

  return (
    
    <>
            <Navbar user={user} totalProducts={totalProducts} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <div className='text-prod'>Cart</div>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}/>
                    </div>
                    <div className='summary-box'>
                        <h3>Cart Summary</h3>
                        <br></br>
                        <div className='tp'>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div className='tp'>
                        Total Price to Pay: <span>${totalPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout
                        stripeKey='pk_test_51Lro2nE9zzdwXv6HXVwVMlDGmzKsqo3wnvfbjDBCb61MFbB1uLJ0TzleT9KIAbzTKuPnjRuAnyW1ezKPJk7BuofL00KtrcXyno'
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        name='All Products'
                        amount={totalPrice * 100}
                        >
                        </StripeCheckout>
                    </div>   
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
    </>
  )
}
