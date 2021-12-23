import React from 'react'
import { Link } from 'react-router-dom'

export default function SuccessfullCheckout() {
    return (
        <div className="center">
            <p className="empty-shopping-cart h3 light-gray">Something went wrong in the checkout try again</p> 
            <span className="home-page-redirect">
                <Link to="/checkout">
                    Back to checkout
                </Link>
            </span>
        </div>
    )
}
