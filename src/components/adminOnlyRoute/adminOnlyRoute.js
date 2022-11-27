import React from 'react';
import {useSelector} from "react-redux";
import {selectEmail} from "../../redux/slice/authSlice";
import {Link} from 'react-router-dom'

const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectEmail)
   if(userEmail === 'test@gmail.com'){
       return children
   }
   return (
       <section style={{height:"80vh"}}>
           <div className="container">
               <h2>У дозволі відмовлено</h2>
               <p>Цю сторінку можна переглядати лише з правами адміністратора</p>
               <br/>
               <Link to='/'>
                   <button  className='--btn'>&larr; Повернутись на головну сторінку</button>
               </Link>

           </div>
       </section>
   )
};

export const AdminOnlyLink = ({children}) => {
    const userEmail = useSelector(selectEmail)
    if(userEmail === 'test@gmail.com'){
        return children
    }
    return null
};

export default AdminOnlyRoute;