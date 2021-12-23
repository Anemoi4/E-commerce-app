import React from 'react'
import shopIcon from './../../images/shopping_bag_black_24dp.svg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function SuccessfullCheckout({ clearCart }) {

    useEffect(() => {
        clearCart()
    })

    return (
        <div className="center">
            <p className="empty-shopping-cart h3 light-gray">Thank you alot for choosing to shop at magic keys we hope to see you soon again!</p> 
            <span className="home-page-redirect">
                <Link to="/">
                    Back to shopping
                </Link>
                <div className="icon-wrapper">
                    <img className="icon" src={shopIcon} alt="shopping-icon" />
                </div>
            </span>
        </div>
    )
}
