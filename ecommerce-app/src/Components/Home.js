import React from 'react'
import { Products } from './Products'
import { Navbar } from './Navbar'
import { useState, useEffect } from 'react'
import { auth, fs } from '../Config/Config'
import { useNavigate } from 'react-router-dom'
import './IndivProd.css'
import { Footer } from './Footer'
import { IndividualFilteredProduct } from './IndividualFilteredProduct'

export const Home = () => {

    const navigate = useNavigate();

    //getting current user uid
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();


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

//state of products;
const [products, setProducts]= useState([]);

//getting products function
const getProducts = async ()=>{
    const products = await fs.collection('Products').get();
    const productsArray = [];
    for (var snap of products.docs){
        var data = snap.data();
        data.ID = snap.id;
        productsArray.push({
            ...data
        })
        if(productsArray.length === products.docs.length){
            setProducts(productsArray);
        }
    }
}

useEffect(()=>{
    getProducts();
},[])


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



let Product;
    const addToCart = (product)=>{
        
        if(uid!==null){

            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
                alert('successfully added to cart');

            })

        }
        else{
            navigate('/login');
        }
        
    }

    

    const addToFavorites = (product)=>{
        if(uid!==null){
            // console.log(product);
            Product=product;
            fs.collection('Favorites ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to favorites');
                alert('successfully added to favorites');

            })

        }
        else{
            navigate('/login');
        }
        
    }





    // categories list rendering using span tag
    const [spans]=useState([
        {id: 'All', text: 'All Products'},
        {id: 'Jackets', text: 'Jackets'},
        {id: 'Skirts', text: 'Skirts'},
        {id: 'Accessories', text: 'Accessories'},
        {id: 'bags', text: 'bags'},
        {id: 'shoes', text: 'shoes'},
        {id: 'pants', text: 'pants'},
        {id: 'ClothingSets', text: `Clothing sets`},
                     
    ])

    // active class state
    const [active, setActive]=useState('');

    // category state
    const [category, setCategory]=useState('');

    // handle change ... it will set category and active states
    const handleChange=(individualSpan)=>{
        setActive(individualSpan.id);
        setCategory(individualSpan.text);
        filterFunction(individualSpan.text);
    }

    // filtered products state
    const [filteredProducts, setFilteredProducts]=useState([]);

    // filter function
    const filterFunction = (text)=>{
        if(products.length>1){
            const filter=products.filter((product)=>product.category===text);
            setFilteredProducts(filter);
        }
        else{
            console.log('no products to filter')
        } 
    }

    // return to all products
    const returntoAllProducts=()=>{
        setActive('');
        setCategory('');
        setFilteredProducts([]);
    }




  return (
    <>
        <Navbar user={user} totalProducts={totalProducts}/>           
            <br></br>
            <div className='filter-products-main-box'>
                <div className='filter-box'>
                    
                    {spans.map((individualSpan,index)=>(
                        <span key={index} id={individualSpan.id}
                        onClick={()=>handleChange(individualSpan)}
                        className={individualSpan.id===active ? active:'desactive'}>{individualSpan.text}</span>
                    ))}
                </div>
                {filteredProducts.length > 0&&(
                  <div className='my-products'>
                      <div className='text-prod'>{category}</div>
                      <div className='products-box'>
                          {filteredProducts.map(individualFilteredProduct=>(
                              <IndividualFilteredProduct key={individualFilteredProduct.ID}
                              individualFilteredProduct={individualFilteredProduct}
                              addToCart={addToCart} addToFavorites={addToFavorites} />
                          ))}
                      </div>
                      <br></br>
                      <Footer/>
                  </div>  
                )}
                {filteredProducts.length < 1&&(
                    <>
                        {products.length > 0&&(
                            <div className='my-products'>
                                <div className='text-prod'>All Products</div>
                                <div className='products-box'>
                                    <Products products={products} addToCart={addToCart} addToFavorites={addToFavorites} />
                                </div>
                                <br></br>
                                <br></br>
                                <Footer/>
                                
                            </div>
                            
                        )}
                        {products.length < 1&&(
                            <div className='my-products please-wait'>Please wait...</div>
                        )}
                        
                    </>
                    
                )}
                

            </div>       

    </>
  )
}
