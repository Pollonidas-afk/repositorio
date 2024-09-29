const stripe = Stripe('tu_clave_publica_de_stripe'); // Reemplaza con tu clave pública de Stripe
const botonesCompra = document.querySelectorAll('.btn-buy');

botonesCompra.forEach(boton => {
    boton.addEventListener('click', async (event) => {
        const amount = event.target.getAttribute('data-amount'); // Obtener el precio del producto

        // Crear un PaymentIntent en el servidor
        const respuesta = await fetch('/crear-carta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        const { clientSecret } = await respuesta.json();

        // Confirma el pago
        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: {
                    // Aquí puedes incluir un formulario para que el usuario ingrese los detalles de su tarjeta
                    // Pero para simplificar, vamos a suponer que ya tienes el método de pago listo
                }
            }
        });

        if (error) {
            console.error('Error al procesar el pago:', error);
            alert('Error en el pago: ' + error.message);
        } else {
            alert('¡Gracias por tu compra!');
        }
    });
});
