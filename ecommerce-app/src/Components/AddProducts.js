import React, { useState } from 'react'
import { storage, fs } from '../Config/Config';

export const AddProducts = () => {
    const [description, setDescription]=useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory]=useState('');
    const [image, setImage]= useState('');

    const [imageError, setImageError]=useState('');

    const [successMsg, setSuccessMsg]=useState('');
    const [uploadError, setUploadError]=useState('');

    const types =['image/jpg','image/jpeg','image/png','image/PNG'];

    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }

    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(description, price);
        // console.log(image);
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Products').add({
                    description,
                    category,
                    price: Number(price),
                    url
                }).then(()=>{
                    setSuccessMsg('Product added successfully');
                    setDescription('');
                    setCategory('');
                    setPrice('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch(error=>setUploadError(error.message));
            })
        })
    }


  return (

    <div className='container'>
        <br></br>
        <br></br>
        <h1>Add Products</h1>
        <hr></hr>        
        <form autoComplete='off' className='form-group' onSubmit={handleAddProducts}>
            <label className='lab1'>Description of the product</label>
            <input type="text" className='form-control1' required value={description} 
            onChange={(e)=>setDescription(e.target.value)}></input>
            <br></br>
            <label className='lab2'>Price of the product</label>
            <input type="number" className='form-control2' required value={price} 
            onChange={(e)=>setPrice(e.target.value)}></input>
             <br></br>
                <label className='lab4'>Product Category</label>
                <select className='form-control4' required
                value={category} onChange={(e)=>setCategory(e.target.value)}>                                    
                    <option value="">Select Product Category</option>                   
                    <option>Jackets</option>
                    <option>Skirts</option>
                    <option>Accessories</option>
                    <option>bags</option>
                    <option>shoes</option>
                    <option>pants</option>
                    <option>Clothing sets</option>
                    <option>Others</option>
                </select>
                <br></br>

            <label className='lab3'>Image of the product</label>
            <input type="file" id='file' className='form-control3' required 
            onChange={handleProductImg}></input>
            <br></br>
            <button type="submit" className='btn-submitAP'>Submit</button>
        </form>
        {successMsg&&<>
                <div className='success-msgAP'>{successMsg}</div>
                <br></br>
            </>} 
        {imageError&&<>
                <br></br>
                <div className='error-msgAP'>{imageError}</div>
                   
        </>}
        {uploadError&&<>
                <br></br>
                <div className='error-msgAP'>{uploadError}</div>
                    
        </>}


    
    </div>
  )
}
