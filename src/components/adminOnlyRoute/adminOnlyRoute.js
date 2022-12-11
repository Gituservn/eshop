import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectEmail} from "../../redux/slice/authSlice";
import {Link} from 'react-router-dom'
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../firebase/Config";
import {toast} from "react-toastify";


const AdminOnlyRoute = ({children}) => {
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
        getAdmins()
    }, []);


    const getAdmins = () => {

        try {
            const adminsRef = collection(db, 'admins');

            const q = query(adminsRef, orderBy('email'))

            onSnapshot(q, (snapshot) => {

                const allAdmins = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setAdmin(allAdmins)

            })
        } catch (error) {
            toast.error(error.message)
        }
    }
         admin.map((admins, index) => {
             const { email} = admins
             console.log(email)
         })


    const userEmail = useSelector(selectEmail)


    if (userEmail === 'test@gmail.com') {
        return children
    }
    return (
        <section style={{height: "80vh"}}>
            <div className="container">
                <h2>У дозволі відмовлено</h2>
                <p>Цю сторінку можна переглядати лише з правами адміністратора</p>
                <br/>
                <Link to='/'>
                    <button className='--btn'>&larr; Повернутись на головну сторінку</button>
                </Link>

            </div>
        </section>
    )
};

export const AdminOnlyLink = ({children}) => {
    const userEmail = useSelector(selectEmail)
    if (userEmail === 'test@gmail.com') {
        return children
    }
    return null
};

export default AdminOnlyRoute;