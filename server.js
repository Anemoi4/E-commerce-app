require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { makeid } = require('./utils/utilFunctions')
const User = require('./models/User')
const sgMail = require('@sendgrid/mail')

app.use((cors({
    origin: '*'
})))

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const PORT = process.env.PORT || 3000;

const dbURI = `mongodb+srv://eemeli123:${process.env.MONGO_DB_PASSWORD}@cluster0.3ujv5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log('Connection to DB successfull, listening at port 3000....')))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Testing...')
})

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    const payload = req.body
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_ENDPOINT_SECRET)
        console.log('event was created successfully')
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        const clientId = session.client_reference_id
        const userEmail = session.customer_details.email
        console.log(userEmail)

        try {
            // Find the user from DB
            const user = await User.findOne({clientId})
            console.log('User has been found: ', user)

            // Send email message to the shop owner and the customer
            const messageToCustomer = {
                to: userEmail,
                from: 'wallaton100@gmail.com',
                subject: 'Magic keys purchase',
                text: 'Hello from Magic Keys! Thank you alot for using Magic Keys, your order has been received and will be shipped soon.',
                html: `<h1>Hello from Magic Keys!</h1>
                <p>Thank you alot for using Magic Keys, your order has been received and will be shipped soon.</p>`
            }

            const messageToOwner = {
                to: 'wallaton100@gmail.com',
                from: 'wallaton100@gmail.com',
                subject: 'Magic keys purchase',
                text: `
                customers address is ${user.address},
                customers zipcode is ${user.zip}`
            }

            const res1 = await sgMail.send(messageToCustomer)
            const res2 = await sgMail.send(messageToOwner)

            // Remove the document from the DB
            await User.findOneAndDelete({clientId})
            console.log('User has been deleted successfully from the DB')
        } catch (error) {
            console.log(error)
        }
    }

    res.status(200)
})

// Stripe body must be recieved raw
app.use(express.json()) 

app.post('/create-checkout-session',async (req, res) => {
    let count = 0;
    let maxTries = 10;

    // in case there happens to be same client id try again 
    while(true) {
        try {
            const { shippingData, items } = req.body
            console.log('Reciving shipping data...', shippingData)
            let clientId = shippingData.firstName + '_' + makeid(10)
    
            // Create user
            const user = await User.create({
                userId: clientId, 
                address: shippingData.address1,
                zip: shippingData.zip
            })
            console.log('user created successfully')
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                customer_email: shippingData.email,
                line_items: items.map(item => {
                    return {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: item.name
                            },
                            // Unit amount needs to be in cents
                            unit_amount: item.line_total.raw * 100
                        },
                        quantity: item.quantity
                    }
                }),
                client_reference_id: clientId,
                success_url: `${process.env.CLIENT_URL}/checkout-success`,
                cancel_url: `${process.env.CLIENT_URL}/checkout-fail`
            })
            res.json({ url: session.url })
            return
        } catch (e) {
            // Handle dublicate clientId
            if (e.code == 11000) {
                console.log('same client id identified trying again...')
            } else {
                res.status(500).json({ error: e.message })
            }
            if (++count == maxTries)
                return res.status(500).json({ error: e.message })
        }
    }  
})

