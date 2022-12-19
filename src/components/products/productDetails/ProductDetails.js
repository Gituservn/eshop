import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase/Config";

const ProductDetails = () => {
    const {id}=useParams()
    console.log(id)
    const [product, setProduct] = useState(null);
    useEffect(()=>{
        getProduct()
    },[])

    //https://firebase.google.com/docs/firestore/query-data/get-data
    const getProduct = async () => {
        console.log('get product')
        const docRef = doc(db, "products", id);
        const docSnap  = await  getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }



    return (
        <div><p>{id}</p></div>
    );
}




export default ProductDetails;