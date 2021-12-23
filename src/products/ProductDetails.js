import React from 'react'
import addToCart from './../images/add_shopping_cart_black_24dp.svg'

export default function ProductDetails({ product, onAddToCart }) {
    // Make description into text
    const desc = product.description.replace(/<p>|<\/p>/g, '')
    return (
        <div className="product-container">
            <div className="product-top-section">
                <img className="product-image" src={product.media.source} alt={product.name} />
            </div>
            <div className="product-bottom-section">
                <div className="product-left">
                    <h5>{product.name}</h5>
                    <p>{desc}</p>
                </div>
                <div className="product-right">
                    <p>{product.price.formatted}</p>
                    <div className="product-actions">
                        <button onClick={() => onAddToCart(product.id, 1)}>
                            <img className="filter-gray" src={addToCart} alt="Add to cart" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
