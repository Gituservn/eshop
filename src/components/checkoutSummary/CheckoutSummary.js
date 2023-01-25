import React from 'react';
import {useSelector} from "react-redux";

import styles from './CheckOutSummary.module.scss'
import {selectCartItems,selectCartTotalAmount,selectCartTotalQuantity} from "../../redux/slice/cartSlice";
import {Link} from "react-router-dom";
import Card from "../card/Card";
const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const cartTotalAmount=useSelector(selectCartTotalAmount)
    const cartTotalQuantity=useSelector(selectCartTotalQuantity)
    return (
        <div>
            <h3>Ваше замовлення</h3>
            <div>
                {
                    cartItems.length===0 ? (
                        <>
                            <p>Товарыв немає в вашому кошику</p>
                            <button className='--btn'>
                                <Link to='/#products'></Link>
                                Головна
                            </button></>
                    ):(<div>
                        <p>
                            <b>{`Товарів в кошику: ${cartTotalQuantity}`}</b>
                        </p>
                        <div className={styles.text}>
                            <h4>{`Загальна вартість:`}</h4>
                            <h3> {`${cartTotalAmount} грн`}</h3>
                        </div>
                        {cartItems.map((item, index)=>{
                            console.log(item);

                            return(
                              <Card id={index} cardClass={styles.card}>
                                  <h4>
                                      <b>{item.product.category}, {item.product.name} {item.currentSize===''? null : item.currentSize } {item.currentSizePillow===''? null : item.currentSizePillow }</b>
                                  </h4>
                                  <p>Кількість: <b>{item.cartQuantity}</b></p>
                                  <p>Вартість одиниці: <b>{item.currentPrice === '' ? null : item.currentPrice}{item.currentPillowPrice===''? null : item.currentPillowPrice}</b></p>
                                  <p>Загальна вартість: <b>{item.currentPrice !==null ? item.currentPrice * item.cartQuantity : item.currentPillowPrice * item.cartQuantity}</b> </p>
                              </Card>
                            )
                        })}
                    </div>)
                }
            </div>
        </div>
    );
};

export default CheckoutSummary;