import React, {useEffect, useState} from 'react';
import styles from './Search.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    FILTER_BY_SEARCH,
    selectFilteredProduct
} from "../../redux/slice/filterSlice";
import {selectProducts} from "../../redux/slice/productSlice";
import {Link} from "react-router-dom";

const Search = () => {
    const [inFocused, setInFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [linkClicked, setLinkClicked] = useState(false);
    const filteredProducts = useSelector(selectFilteredProduct);
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    const handleFocus = () => {
        setInFocused(true);
    };

    const handleBlur = () => {
        if (!linkClicked) {
            setTimeoutId(setTimeout(()=>{
                setInFocused(false)
            },200))
        }
        setInFocused(false);
    };

    const handleMouseEnter=()=>{
        clearTimeout(timeoutId)
    }

    const handleContainerClick = () => {
        setLinkClicked(false);
    }

    const handleLinkClick = () => {
        setLinkClicked(true);
    }

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({
            products, search

        }));
    }, [dispatch, products, search]);


    return (
        <div onClick={handleContainerClick}
             onFocus={handleFocus}>
            <input
                className={styles.search__input}
                type="text"
                placeholder="пошук"
                value={search}
                onChange={(e) => setSearch(e.target.value)}

            />
            {inFocused ? <div className={styles.search__result}
            onMouseEnter={handleMouseEnter}
            >
                {filteredProducts.map((product) => {
                    const {id,name,imageURL}=product
                    return (
                        search.length < 2 ? null : (
                            <Link to={`/product-details/${id}`}
                            onClick={handleBlur}>
                                <div className={styles.search__result_item}
                                     key={product.id}>
                                    <img className={styles.img}
                                         src={imageURL} alt=""/>
                                    <p className={styles.name}>{name}</p>
                                </div>
                            </Link>)
                    );
                })}
            </div> : null}
        </div>
    );
};

export default Search;