import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'

export default function FilledCart({cart, onEmptyCart, onRemoveFromCart, onChangeCartQty}) {
    return (
        <>
            <h1 className="cart-title">Your Shopping Cart</h1>
            <div className="cart-items-container">
                {cart.line_items.map((item) => {
                    return( <CartItem item={item} key={item.id} onRemoveFromCart={onRemoveFromCart} onChangeCartQty={onChangeCartQty}/> )
                })}
            </div>
            <div className="cart-total-and-action">
                <p className="product-subtotal">Subtotal: <span className="cart-final-price">{cart.subtotal.formatted_with_symbol}</span></p>
                <div className="cart-action-btns">
                    <button onClick={onEmptyCart} className="btn btn-empty" type="button">Empty the cart</button>
                    <button className="btn check-out-btn" type="button"><Link to="/checkout">Check out</Link></button>
                </div>
            </div>
        </>
    )
}
