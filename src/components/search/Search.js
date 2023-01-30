import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Search.module.scss'
import {Link} from "react-router-dom";
// import {FcSearch} from "react-icons/fc";

const Search = ({results = [], renderItem, value, onChange, onSelect,}) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const resultContainer = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [defaultValue, setDefaultValue] = useState("");

    const handleSelection = (selectedIndex) => {
        const selectedItem = results[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        onSelect && onSelect(selectedItem);
        resetSearchComplete();
    };

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(-1);
        setShowResults(false);
    }, []);

    const handleKeyDown = (e) => {
        const {key} = e;
        let nextIndexCount = 0;

        // move down
        if (key === "ArrowDown") nextIndexCount = (focusedIndex + 1) % results.length;

        // move up
        if (key === "ArrowUp") nextIndexCount = (focusedIndex + results.length - 1) % results.length;

        // hide search results
        if (key === "Escape") {
            resetSearchComplete();
        }

        // select the current item
        if (key === "Enter") {
            e.preventDefault();
            handleSelection(focusedIndex);
        }

        setFocusedIndex(nextIndexCount);
    };

    const handleChange = (e) => {
        setDefaultValue(e.target.value);
        onChange && onChange(e);
    };

    useEffect(() => {
        if (!resultContainer.current) return;

        resultContainer.current.scrollIntoView({
            block: "center",
        });
    }, [focusedIndex]);

    useEffect(() => {
        if (results.length > 0 && !showResults) setShowResults(true);

        if (results.length <= 0) setShowResults(false);
    }, [results]);

    useEffect(() => {
        if (value) setDefaultValue(value);
    }, [value]);

    return (<div className={styles.selectSearchContainer}>
        <div
            tabIndex={1}
            onBlur={resetSearchComplete}
            onKeyDown={handleKeyDown}
            className={styles.selectSearchIsMultiple}
        >
            <input
                value={defaultValue}
                onChange={handleChange}
                type="text"
                className={styles.selectSearchInput}
                placeholder="Пошук продуктів..."
            />

            {/* Search Results Container */}
            {showResults && (<div
                className={styles.selectSearchRow}>
                {results.map((item, index) => {
                    return (<Link
                        to={''}
                        key={index}
                        onMouseDown={() => handleSelection(index)}
                        ref={index === focusedIndex ? resultContainer : null}
                        style={{
                            backgroundColor: index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                        }}
                        className={styles.selectSearchOption}
                    >
                        {renderItem(item)}
                    </Link>);
                })}
            </div>)}
        </div>
    </div>);
};


export default Search;

//  <div className={styles.search}>
//             <FcSearch size={22} className={styles.icon}/>
//             <input type="text" placeholder='Пошук' value={value} onChange={onChange}/>
//         </div>