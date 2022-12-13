import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/Config";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";


const useFetch = (collectionName) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = () => {
        setIsLoading(true)

        try {
            const docRef = collection(db, collectionName);
            const q = query(docRef, orderBy("category", "desc"));
            onSnapshot(q, (snapshot) => {

                const allData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(allData)
                setData(allData)
                setIsLoading(false)
            });

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getData()
    }, []);

    return{data,isLoading}

}

export default useFetch