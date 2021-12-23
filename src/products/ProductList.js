import React from 'react'
import ProductDetails from './ProductDetails'

export default function ProductList({ products, onAddToCart }) {
    return (
        <main className="product-list-container container">
            { products.map((product) => {
                return(<ProductDetails product={product} onAddToCart={onAddToCart} key={product.id}/>)
            })}
        </main>
    )
}
