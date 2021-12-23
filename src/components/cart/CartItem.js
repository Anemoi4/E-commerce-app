import React from 'react'

export default function CartItem({ item, onRemoveFromCart, onChangeCartQty }) {
    return (
        <div className="cart-item-container product-container">
            <div className="product-top-section">
                <img src={item.media.source} alt={item.name} className="cart-item-image product-image"/>
            </div>
            <div className="item-bottom-section">
                <div className="product-price-and-name">
                    <p className="product-name">{item.name}</p>
                    <p className="product-price">{item.line_total.formatted_with_symbol}</p>
                </div>
                <div className="product-bottom-row">
                    <button type="button" className="btn" onClick={() => onChangeCartQty(item.id, item.quantity - 1)}>-</button>
                    <p className="product-quantity">{item.quantity}</p>
                    <button type="button" className="btn" onClick={() => onChangeCartQty(item.id, item.quantity + 1)}>+</button>
                    <button type="button" className="btn btn-delete" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}
