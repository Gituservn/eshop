import React, {useEffect} from 'react';
import styles from '../addProduct/AddProduct.module.scss'
import style from '../viewProduct/ViewProducts.module.scss'
import {useState} from "react";
import Card from "../../card/Card";
import {addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query,} from "firebase/firestore";
import {db} from "../../../firebase/Config";
import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";

const AddAdmin = () => {
    const [admin, setAdmin] = useState({
            email: '',
            name: '',
        }
    );
    const [adminView, setAdminView] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate()

    useEffect(() => {
        getAdmins()
    }, [])

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

    const getAdmins = () => {
        setIsLoading(true)
        try {
            const adminsRef = collection(db, 'admins');

            const q = query(adminsRef, orderBy('email'))

            onSnapshot(q, (snapshot) => {

                const allAdmins = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(allAdmins)
                setAdminView(allAdmins)
            })
        } catch (error) {
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
    return (
        <>
            <div className={style.table}>
                {adminView.length === 0 ? (
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
                        {adminView.map((product, index) => {
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
                                        <Link to='/admin/all-product'>
                                            <FaEdit color='green' size={20}/>
                                        </Link>
                                        <Link to='/admin/all-product'>
                                            &nbsp;
                                            <FaTrash color='red' size={20} className={style.icons} onClick={()=>deleteAdmin(id)}/>
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