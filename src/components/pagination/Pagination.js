import React, {useState} from 'react';
import styles from './Pagination.module.scss'

const Pagination = ({productsPerPage, setCurrentPage, currentPage, totalProducts}) => {
    const pageNumbers = []
    const totalPages = totalProducts/productsPerPage;
    // обмеженя кількісті сторінок, що відображаються
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    //пагінація

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

    // наступна сторінка
    const paginateNext =()=>{
        setCurrentPage(currentPage+1)
            //показуэм номера сторінок
        if(currentPage+1 >maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
        }
    }
    // попередня сторінка
const paginationPrev = () => {
  setCurrentPage(currentPage-1)

    if ((currentPage-1) %pageNumberLimit==0){
        setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit)
        setMinPageNumberLimit((minPageNumberLimit-pageNumberLimit))
    }
}


    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.pagination}>
            <li className={currentPage===pageNumbers[0] ? `${styles.hidden}`:null} onClick={paginationPrev}>Назад</li>
            {pageNumbers.map((number)=>{
                if (number < maxPageNumberLimit +1 && number >minPageNumberLimit) {
                    return (
                        <li className={currentPage === number ? `${styles.active}`: null} key={number} onClick={()=>paginate(number)}>
                            {number}
                        </li>
                    )
                }

            })}

            <li className={currentPage==pageNumbers[pageNumbers.length-1] ? `${styles.hidden}`:null}   onClick={paginateNext}>Далі</li>
            <p>
                <b className={styles.page}>
                    {`Сторінка ${currentPage}`}
                </b>
                <span> з</span>
                <b>{` ${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    );
}

export default Pagination;