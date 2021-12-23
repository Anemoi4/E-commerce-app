import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductList from './products/ProductList'
import { commerce } from './lib/commerce'
import Cart from './components/cart/Cart'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import Checkout  from './components/Checkout/CheckoutForm'
import CheckoutSuccess from './components/Checkout/SuccessfullCheckout'
import CheckoutFail from './components/Checkout/CheckoutFail'

export default function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    async function fetchProducts() {
        try {  
            const { data: items } = await commerce.products.list()
            setProducts(items)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchCart() {
        try {
            setCart(await commerce.cart.retrieve())
        } catch (error) {
            console.log(error)
        }
    }
    
    async function handleAddToCart(productId, quantity) {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart)
    }

    async function handleUpdateCartQty(productId, quantity) {
        const { cart } = await commerce.cart.update(productId, {quantity})

        setCart(cart)
    }

    async function handleRemoveFromCart(productId) {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart)
    }    

    async function handleEmptyCart() {
        const { cart } = await commerce.cart.empty()

        setCart(cart)
    }

    async function clearCart() {
        try {
            const newCart = await commerce.cart.refresh()

            setCart(newCart)
        } catch (error) {
            console.log(error)            
        }
    }

    async function handleCaptureCheckout(checkoutTokenId, newOrder) {
        try {
            console.log('Handling checkout...', newOrder)
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

            setOrder(incomingOrder)
            clearCart()
        } catch (error) {
            console.log('Something went wrong creating checkout...', error)
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])
    
    return(
        <BrowserRouter>
            <div>
                <Navbar cart={cart}/>
                <Switch>
                    <Route path="/" exact>
                        <ProductList products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route path="/cart">
                        <Cart cart={cart} onEmptyCart={handleEmptyCart} onRemoveFromCart={handleRemoveFromCart} onChangeCartQty={handleUpdateCartQty}/>
                    </Route>
                    <Route path="/checkout" exact>
                        <Checkout 
                            cart={cart} 
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                            clearCart={clearCart}
                        />
                    </Route>
                    <Route path="/checkout-success">
                            <CheckoutSuccess clearCart={clearCart}/>
                    </Route>
                    <Route path="/checkout-fail">
                            <CheckoutFail />
                    </Route>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

