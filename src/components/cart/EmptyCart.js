import React from 'react'
import { Link } from 'react-router-dom'
import shopIcon from './../../images/shopping_bag_black_24dp.svg'

export default function EmptyCart() {
    return (
        <div className="center">
            <p className="empty-shopping-cart h3 light-gray">You have no items yet in your shopping cart.</p> 
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
