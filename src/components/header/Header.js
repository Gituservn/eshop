import React from "react";
import './Header.module.scss';
import {Link} from "react-router-dom";

const spanStyle={
    color:'orangered'
}
const Header = () => {
    return (
        <header>
            <div className="header">
                <div className="logo">
                    <Link to="/">
                        <h2>
                            <span style={spanStyle} >Willow</span>.
                        </h2>

                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
