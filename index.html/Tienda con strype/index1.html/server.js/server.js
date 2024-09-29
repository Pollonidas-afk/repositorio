const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const app = express();
const stripe = Stripe('tu_clave_secreta_de_stripe'); // Reemplaza con tu clave secreta de Stripe

app.use(bodyParser.json()); // Permite que el servidor maneje JSON en las solicitudes

// Ruta para crear un PaymentIntent
app.post('/crear-carta', async (req, res) => {
    try {
        const { amount } = req.body; // Obtener la cantidad del cuerpo de la solicitud
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Monto en centavos
            currency: 'usd', // Moneda
        });
        res.send({
            clientSecret: paymentIntent.client_secret, // Enviar el client_secret al frontend
        });
    } catch (error) {
        console.error('Error al crear el PaymentIntent:', error);
        res.status(500).send({ error: error.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
