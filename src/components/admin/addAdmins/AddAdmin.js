import React, {useEffect} from 'react';
import styles from '../addProduct/AddProduct.module.scss'
import style from '../viewProduct/ViewProducts.module.scss'
import {useState} from "react";
import Card from "../../card/Card";
import {addDoc, collection, deleteDoc, doc, } from "firebase/firestore";
import {db} from "../../../firebase/Config";
import {Link, useNavigate} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import Notiflix from "notiflix";
import useFetch from "../../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {selectAdmins, STORE_ADMINS} from "../../../redux/slice/adminSlice";

const AddAdmin = () => {
    const [admin, setAdmin] = useState({
            email: '',
            name: '',
        }
    );
    // const [adminView, setAdminView] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {data,} = useFetch("admins","email")
    const admins = useSelector(selectAdmins)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            STORE_ADMINS({
                admins:data}))
    }, [dispatch,data]);

    const navigate = useNavigate()



    const handleInputChange = (e) => {
        const {name, value} = e.target
        setAdmin({...admin, [name]: value})
    }


    const addAdmin = (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const docRef = addDoc(collection(db, "admins"), {
                email: admin.email,
                name: admin.name,

            })
            setIsLoading(false)
            setAdmin(admin)
            navigate('/admin/add-Admins')
        } catch (error) {
            console.log('error')
            setIsLoading(false)
        }
    }


    const deleteAdmin = async (id) => {
        try {
            await deleteDoc(doc(db, "admins", id))
            navigate('/admin/add-Admins')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const confirmDeleteAdmin = (id) => {
        Notiflix.Confirm.show(
            'Видалення адміністратора',
            'Ви хочете видалити адміністратора?',
            'видалити',
            'ні',
            function okCb() {
                deleteAdmin(id)
            },
            function cancelCb() {

            },
            {
                width: '320px',
                borderRadius: '8px',
                titleColor: 'orangered',
                okButtonBackground: 'orangered',
                cssAnimationStyle: 'zoom',
                cssAnimationDuration: '500'
                // etc...
            },
        );
    }


    return (
        <>
            <div className={style.table}>
                {admins.length === 0 ? (
                    <p>Адміністраторів не найдено</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {admins.map((product, index) => {
                            const {id, name, email} = product;
                            return (

                                <tr key={id}>
                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {name}
                                    </td>
                                    <td>{email}</td>
                                    <td className={style.icons}>

                                        <Link to='/admin/add-Admins'>
                                            &nbsp;
                                            <FaTrash color='red' size={20} className={style.icons}
                                                     onClick={() => confirmDeleteAdmin(id)}/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )}
            </div>
            {/*{isLoading && <Loader/>}*/}
            <div className={styles.product}>
                <h1>Добавити адміністратора</h1>
                <Card cardClass={styles.card}>
                    <form onSubmit={addAdmin}>
                        <label> Емейл нового адміністратора</label>
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            required
                            defaultValue={admin.email}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <label> Емейл нового адміністратора</label>
                        <input
                            type="text"
                            placeholder="Ім'я Адміністратора"
                            name='name'
                            required
                            defaultValue={admin.name}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <button className='--btn --btn-primary'>Добавити</button>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default AddAdmin;