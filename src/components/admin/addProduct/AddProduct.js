import React from 'react';
import {useState} from "react";
import styles from './AddProduct.module.scss';
import Card from "../../card/Card";

const categories =[
    {id: 1, name: 'Постільна білизна'},
    {id: 2, name: 'Подушки'},
    {id: 3, name: 'Ковдри'},
    {id: 4, name: 'Наматрацники'}
]
const brands =[
    {id:1,name:"Комфорт-текстиль"},
    {id:2,name:"Idea"},
    {id:3, name:'Billerbeck'}
]

const sizes=[
    {id: 1, name: 'Євро'},
    {id: 2, name: 'Півтораспальний'},
    {id: 3, name: 'Двоспальний'},

]

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        imageURL: '',
        price: null,
        category: '',
        brand: '',
        material: '',
        desc: '',
        size: "",
        elastic: "",
        pillowcases: ""
    });
    const handleInputChange = (e) => {
    };
    const handleImageChange = (e) => {
    };
    return (
        <div className={styles.product}>
            <h1>Добавити новий товар</h1>
            <Card cardClass={styles.card}>
                <form>
                    <label>Назва продукту</label>
                    <input
                        type="text"
                        placeholder="назва продукту"
                        name="name"
                        required
                        value={product.name}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <label>Зображення продукту</label>
                    <Card cardClass={styles.group}>
                        <div className={styles.progress}>
                            <div className={styles["progress-bar"]}style={{width: '50%'}}>
                                50%
                            </div>
                        </div>
                        <input
                            type="file"
                            placeholder="Зображення товару"
                            accept="image/*"
                            name="image"
                            onChange={(e)=>handleImageChange(e)}
                        />
                        <input type="text" required name='imageURL' disabled value={product.imageURL}/>
                    </Card>
                    <label>Ціна продукту</label>
                    <input
                        type="number"
                        placeholder="Ціна продукту"
                        name="price"
                        required
                        value={product.price}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <label>Категорія</label>
                    <select
                        required
                        name="category"
                        value={product.category}
                        onChange={(e=>handleInputChange(e))} >
                        <option
                            value=""
                            disabled>
                            --Виберіть категорію продукту--
                        </option>
                        {categories.map((cat)=>{
                            return(
                                <option
                                    key={cat.id}
                                    value={cat.name}
                                >
                                    {cat.name}
                                </option>
                            )
                        })}
                    </select>

                    <label>Бренд</label>
                    <select
                        required
                        name="Brand"
                        value={product.brand}
                        onChange={(e=>handleInputChange(e))} >
                        <option
                            value=""
                            disabled>
                            --Виберіть бренд--
                        </option>
                        {brands.map((brand)=>{
                            return(
                                <option
                                    key={brand.id}
                                    value={brand.name}
                                >
                                    {brand.name}
                                </option>
                            )
                        })}

                    </select>


                    <label>Розмір</label>
                    <select
                        required
                        name="Brand"
                        value={product.brand} onChange={(e=>handleInputChange(e))} >
                        <option
                            value=""
                            disabled>
                            --Виберіть розмір(и)--
                        </option>
                        {sizes.map((size)=>{
                            return(
                                <option
                                    key={size.id}
                                    value={size.name}
                                >
                                    <div> <input
                                        type="checkbox"
                                        id={size.id}
                                        name={size.name}
                                    />
                                        <label>{size.name}</label></div>

                                </option>
                            )
                        })}

                    </select>

                </form>

            </Card>
        </div>
    );
};

export default AddProduct;