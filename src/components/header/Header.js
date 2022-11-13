import React, { Component } from "react";
import { Link } from 'react-router-dom';
//imgs
import logoIcon from '../../icons/a-logo.png'
import cartIcon from '../../icons/Empty Cart.png'


class Header extends Component {
    render() {
        return(
            <header className="header">
            <nav className="header__nav">
                <Link to='./women'>ALL</Link>
                <Link to='./men'>CLOTHES</Link>
                <Link to='./kids'>TECH</Link>
            </nav>
            <div className="header__logo-container">
                <img src={logoIcon} alt="logo"/>
            </div>
            <div className="header__cart-icon-container">
                <img src={cartIcon} alt="cart icon"/>
            </div>
        </header>
        )
    }
}

export default Header