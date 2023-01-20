import React, {useCallback, useEffect} from 'react';
import {useState} from "react";
import NovaPoshta from 'novaposhta';
import Card from "../../components/card/Card";
import styles from './CheckoutDetails.module.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/semantic-ui.css'

const initialAddressState = {
    name: '',
    phone: null,
    delivery_service: '',
    region: '',
    city: '',
    warehouses: '',
}

const __ApiKey = '421852b3235e42445b33038dadf21808';
const api = new NovaPoshta(__ApiKey);


const CheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState({
        ...initialAddressState
    });
    const [regionList, setRegionList] = useState([]);
    const [citiesList, setCitiesList] = useState([]);

    const getRegionList = useCallback(() => {
        api.address
            .getAreas()
            .then(({data}) => setRegionList(data))
    }, [api.address])

    const getCitiesList = useCallback(() => {
        api.address
            .getCities({AreaRef: '150812a-9b87-11de-822f-000c2965ae0e'})
            .then(({data}) => setCitiesList(data))
    }, [api.address])

    console.log(regionList)
    console.log(citiesList)

    useEffect(() => {
        getRegionList()
        getCitiesList()
    }, [])
    const handleShipping = (e) => {
        const {name, value} = e.target
        setShippingAddress({...shippingAddress, [name]: value})
    }

    console.log(shippingAddress)

    const handleSubmit = () => {

    }
    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Оформлення замовлення</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <label>Ім'я Одержувача</label>
                            <input
                                type="text"
                                placeholder="Прізвище, імя"
                                name='name'
                                value={shippingAddress.name}
                                onChange={(e) => handleShipping(e)}
                                required
                            />
                            <label>Номер телефону</label>
                            <div className={styles.phoneInput}>
                                <PhoneInput

                                    country={'ua'}
                                    onlyCountries={['ua']}
                                    onChange={(e) => handleShipping(e)}/>
                            </div>
                            <label>Виберіть службу доставки</label>
                            <select
                                required
                                name='delivery_service'
                                value={shippingAddress.delivery_service}
                                onChange={(e) => handleShipping(e)}
                            >
                                <option value="newpost">Нова пошта</option>
                                <option value="newpost">Укрпошта</option>
                            </select>
                            <label>Виберіть область</label>
                            <select
                                required
                                name='region'
                                value={shippingAddress.region}
                                onChange={(e) => handleShipping(e)}
                            >
                                {regionList.map((areas) => {
                                    return (<option value={areas.Description}>
                                        {areas.Description}
                                    </option>)
                                })}
                            </select>

                        </Card>
                    </div>
                </form>
            </div>

        </section>);
}

export default CheckoutDetails;