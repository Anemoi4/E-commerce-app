import React, { useState, useEffect } from 'react'
import AddressForm from './CheckoutForms/AddressForm'

import { commerce } from '../../lib/commerce'

export default function Checkout({ cart, order, onCaptureCheckout, error, clearCart }) {
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        async function generateToken() {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }

        // Making sure cart is not empty
        const isCartEmpty = Object.entries(cart).length === 0
        if (!isCartEmpty) generateToken()
    }, [cart])

    function next(data) {
        setShippingData(data)
    }

    function Form() {
       return(
           <AddressForm next={next} checkoutToken={checkoutToken} cart={cart} clearCart={clearCart}/>
       )
    }

    return (
        <div className="container">
            <div className="checkout-container">
                <h1 className="title">Checkout</h1>
                <ul className="progressbar">
                    <li className="step">Step 1</li>
                </ul>
                { checkoutToken && <Form /> }
            </div>
        </div>
    )
}
