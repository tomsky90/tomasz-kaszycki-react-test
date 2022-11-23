import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getCurrencies } from "../../actions/currencyAction";
import { connect } from "react-redux";
import { setSelectedCurrency } from "../../actions/currencyAction";
//imgs
import logoIcon from '../../icons/a-logo.png'
import cartIcon from '../../icons/Empty Cart.png'
import currencyArrow from '../../icons/Vector.png'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionsActive: false,
        }
    }


    componentDidMount() {
        this.props.getCurrencies()
    }

    toggleOptionsActive = () => {
        this.setState({
            isOptionsActive: !this.state.isOptionsActive
        })
    }
    
    render() {
        return(
            <header className="header">
            <nav className="header__nav">
                <Link to='./category/all'>ALL</Link>
                <Link to='./category/clothes'>CLOTHES</Link>
                <Link to='./category/tech'>TECH</Link>{}
            </nav>
            <div className="header__logo-container">
                <img src={logoIcon} alt="logo"/>
            </div>
            <div className="header__cart-icon-currency-switcher-wrapper"> 
                <div className="header__currency-switcher-container" >
                    <div className="currency-switcher__select-bar">
                        <div className="currency-switcher__icon" onClick={this.toggleOptionsActive}>
                            <span>$</span><img className={this.state.isOptionsActive ? 'currenccy-switcher__arrow active' : 'currenccy-switcher__arrow'} src={currencyArrow} />
                        </div>
                        <div className="header__cart-icon-container" >
                            <img src={cartIcon} alt="cart icon" />
                        </div>
                    </div> 
                    <div className={this.state.isOptionsActive ? 'currency-switcher__options-wrapper active' : 'currency-switcher__options-wrapper'}>
                        {this.props.currencies.currencies.currencies !== undefined ? this.props.currencies.currencies.currencies.map((currency) => (
                            <div onClick={() => {this.props.setSelectedCurrency(currency)}} key={currency.label} className="option"><span>{currency.symbol}</span><span>{currency.label}</span></div>
                        )) : null}
                    </div>
                </div>
            </div>
           
        </header>
        )
    }
}



export default connect(
    (state) => ({ currencies: state.currencies, products: state.products}),
    {
      getCurrencies,
      setSelectedCurrency,
    }
  )(Header);