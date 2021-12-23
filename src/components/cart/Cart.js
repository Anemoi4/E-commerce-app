import React from 'react'
import EmptyCart from './EmptyCart'
import FilledCart from './FilledCart'

export default function Cart({ cart, onEmptyCart, onRemoveFromCart, onChangeCartQty }) {
    const isEmpty = !cart?.line_items?.length

    return (
        <div className="container">
            { isEmpty ? <EmptyCart /> : <FilledCart  cart={cart} onEmptyCart={onEmptyCart} onRemoveFromCart={onRemoveFromCart} onChangeCartQty={onChangeCartQty}/> }
        </div>
    )
}
