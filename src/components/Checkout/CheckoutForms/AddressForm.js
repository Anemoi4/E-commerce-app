import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AddressForm({checkoutToken, next, cart, clearCart}) {
    const [shippingData, setShippingData] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm()

    async function handleSubmit2(data) {
        setShippingData(data);

        try {
            if (cart.line_items !== 0) {
                // Make sure shipping data has updated before redirect
                if (Object.keys(shippingData).length !== 0) {
                const { data } = await axios.post('https://magic-keys.herokuapp.com/create-checkout-session', {
                    items: cart.line_items,
                    shippingData: shippingData
                })
                    window.location = data.url
                    console.log('Clearing the cart')
                    clearCart()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmit2)}>
            <div className="input-row">
                <div className="input-group">    
                    <input {...register('firstName', { required: "This is required"})} type="text" id="firstName" placeholder="First Name"/>
                    <label>First Name</label>
                    {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                </div>
                <div className="input-group">    
                    <input {...register('lastName', { required: "This is required"})} type="text" id="lastName" placeholder="Last Name"/>
                    <label>Last Name</label>
                    {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                </div>
            </div>
            <div className="input-row">
                <div className="input-group">    
                    <input {...register('address1', { required: "This is required"})} type="text" id="address" placeholder="Address"/>
                    <label>Address</label>
                    {errors.address && <p className="form-error">{errors.address.message}</p>}
                </div>
                <div className="input-group">    
                    <input {...register('email', { required: "This is required"})} id="email" placeholder="Email" type="email"/>
                    <label>Email</label>
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
            </div><div className="input-row">
                <div className="input-group">    
                    <input {...register('city', { required: "This is required"})} id="city" placeholder="City"/>
                    <label>City</label>
                    {errors.city && <p className="form-error">{errors.city.message}</p>}
                </div>
                <div className="input-group">    
                    <input type="number" {...register('zip', { required: "This is required"})} id="postalcode" placeholder="ZIP / Postalcode"/>
                    <label>ZIP / Postalcode</label>
                    {errors.postalcode && <p className="form-error">{errors.postalcode.message}</p>}
                </div>
            </div>
            <div className="form-submit">
                <button className="cart-btn"><Link to="/cart">Back to cart</Link></button>
                <button type="submit">Next</button>
            </div>
        </form>
    )
}
