import React, {useCallback, useEffect} from 'react';
import {useState} from "react";
import NovaPoshta from 'novaposhta';
import Card from "../../components/card/Card";
import styles from './CheckoutDetails.module.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/semantic-ui.css'

const initialAddressState = {
    name: '',
    phone: '',
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
    const [warehouses, setWarehouses] = useState([]);

    const getRegionList = useCallback(() => {
        api.address
            .getAreas()
            .then(({data}) => setRegionList(data))
    }, [api.address])

    const getCitiesList = useCallback(() => {
        api.address
            .getCities()
            .then(({data}) => setCitiesList(data))
    }, [api.address])

    const getWarehouses = useCallback(() => {
        api.address
            .getWarehouses()
            .then(({data}) => setWarehouses(data))
    }, [api.address])

    let citiesOfTheRegion = citiesList.filter(city => city.AreaDescription.includes(shippingAddress.region)
    )
    let warehousesOfTheCity = warehouses.filter(warehouse => warehouse.CityDescription.includes(shippingAddress.city)
    )


    useEffect(() => {
        getRegionList()
        getCitiesList()
        getWarehouses()
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
                                <PhoneInput
                                    name='phone'
                                    value={shippingAddress.phone}
                                    country={'ua'}
                                    onlyCountries={['ua']}
                                    // onChange={(e) => handleShipping(e)}
                                />

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
                                <option
                                    value=""
                                    disabled>
                                    --Виберіть область--
                                </option>
                                {regionList.map((areas) => {
                                    return (<option value={areas.Description}>
                                        {areas.Description}
                                    </option>)
                                })}
                            </select>
                            <label >Виберіть населений пунк</label>
                            <input type="text" list='cities' name='city' value={shippingAddress.city} onChange={(e) => handleShipping(e)}/>
                            <datalist id='cities'>

                                {citiesOfTheRegion.map((city) => {
                                    return (<option value={city.Description}>
                                        {city.Description}
                                    </option>)
                                })}
                            </datalist>

                            <label >Виберіть відділення / поштомат</label>
                            <input type="text" list='warehouse' name='warehouses' value={shippingAddress.warehouses} onChange={(e) => handleShipping(e)}/>
                            <datalist id='warehouse'>

                                {warehousesOfTheCity.map((warehouse) => {
                                    return (<option value={warehouse.Description}>
                                        {warehouse.Description}
                                    </option>)
                                })}
                            </datalist>
                        </Card>
                    </div>
                </form>
            </div>

        </section>);
}

export default CheckoutDetails;