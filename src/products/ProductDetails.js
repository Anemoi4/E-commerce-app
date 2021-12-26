import React from 'react'
import addToCart from './../images/add_shopping_cart_black_24dp.svg'

export default function ProductDetails({ product, onAddToCart }) {
    function handleMouseDown(e) {
        let cartIconBG;
        e.target.matches('.cart-icon') ? cartIconBG = e.target :  cartIconBG = e.target.parentElement
        cartIconBG.style.background = 'hsl(0, 0%, 45%, .3)';
    }

    function handleMouseUp(e) {
        let cartIconBG;
        e.target.matches('.cart-icon') ? cartIconBG = e.target :  cartIconBG = e.target.parentElement
        cartIconBG.style.background = 'none';

        // Handle added to cart text
        const tooltip = cartIconBG.children[0]
        tooltip.style.opacity = '1'

        setTimeout((e) => {
            tooltip.style.opacity = '0'
        }, 500)  
    }

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
                        <button onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} className="cart-icon" onClick={(e) => onAddToCart(product.id, 1, e)}>
                            <span className='cart-action'>Added To Cart</span>
                            <img className="filter-gray" src={addToCart} alt="Add to cart" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
