import React, {useState} from 'react';
import styles from './ProductFilter.module.scss'
import {brands} from "../../admin/addProduct/consts";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts} from "../../../redux/slice/productSlice";
import {FILTER_BY_CATEGORY} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
    const [priceRange, setPriceRange] = useState(100);
    const [category, setCategory] = useState('Всі');
    const products = useSelector(selectProducts)
const dispatch = useDispatch()
    const allCategories = [
        "Всі",
        ...new Set(products.map((products)=>products.category))
    ]
   const filterProducts = (cat) => {
        setCategory(cat)
       dispatch(FILTER_BY_CATEGORY({products, category: cat}))
   }

    return (
        <div className={styles.filter}>
            <h4>Категорії</h4>
            <div className={styles.category}>
                {allCategories.map((cat,index)=>{
                    return <button key={index} type='button' className={`${category}`===cat ? `${styles.active}`: null} onClick={()=>filterProducts(cat)}>&#8250;{cat}</button>
                })}

            </div>
            <h4 className={styles.brand}>Виробник</h4>
            <div className={styles.brand}>
                <select name="brand">
                    <option>All</option>
                    {brands.map((brand) => {
                        return (<>

                                <option value={brand.name} key={brand.id}>{brand.name}</option>
                            </>
                        )
                    })}
                </select>

            </div>
            <h4>Ціна</h4>
            <p>{priceRange}</p>
            <div className={styles.price}>
                <input type="range" name='price' min='100' max='10000'
                       onChange={(event) => setPriceRange(event.target.value)}/>
            </div>
            <br/>
            <button className='--btn --btn-danger'>Скинути фільтри</button>
        </div>
    );
}

export default ProductFilter;