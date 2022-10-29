import React from 'react'
import { Navbar } from './Navbar'
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, fs } from '../Config/Config';
import { FavProducts } from './FavProducts';
import './IndivProd.css';


export const Fav = () => {

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

//state of fav products
const [favProducts, setFavProducts]= useState([]);

// getting cart products from firestore collection and updating the state
useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Favorites ' + user.uid).onSnapshot(snapshot=>{
                const newFavProduct = snapshot.docs.map((doc)=>({
                    ID: doc.id,
                    ...doc.data(),
                }));
                setFavProducts(newFavProduct);                    
            })
        }
        else{
            console.log('user is not signed in to retrieve favorites');
        }
    })
},[])

// console.log(cartProducts);


// console.log(qty);




// console.log(price);

const [totalProductsFav, setTotalProductsFav]=useState(0);
// getting cart products   
useEffect(()=>{        
    auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('Favorites ' + user.uid).onSnapshot(snapshot=>{
                const qty = snapshot.docs.length;
                setTotalProductsFav(qty);
            })
        }
    })       
},[]) 







  return (
    
    <>
            <Navbar user={user} totalProductsFav={totalProductsFav} />           
            <br></br>
            {favProducts.length > 0 && (
                <div className='container-fluid'>
                    <div className='text-prod'>Favorites</div>
                    <div className='products-box'>
                        <FavProducts favProducts={favProducts}/>
                    </div>
                    
                </div>
            )}
            {favProducts.length < 1 && (
                <div className='container-fluid'>No products fav to show</div>
            ) }           
    </>
  )
}
