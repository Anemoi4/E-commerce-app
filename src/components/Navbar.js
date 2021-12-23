import React from 'react'
import shoppingCart from './../images/shopping_cart_black_24dp.svg'
import smiley from './../images/hymy.png'
import { Link } from 'react-router-dom'

export default function Navbar({ cart }) {

    return (
        <nav className="main-nav">
            <Link to="/">
                <div className="brand-logo">
                    <img src={smiley} alt="brand-logo" />
                    <h3>Magic Keys</h3>
                </div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <div className="shopping-cart-amount">{cart?.total_items}</div>
                    <img src={shoppingCart} alt="shopping cart" />
                </div>
            </Link>
        </nav>
    )
}
