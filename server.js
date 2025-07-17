const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['https://seudominio.myshopify.com']; // substitua pelo domínio real da sua loja
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(bodyParser.json());

app.post('/frete', async (req, res) => {
  const { to, product } = req.body;

  const token = process.env.MELHOR_ENVIO_TOKEN;
  const isSandbox = process.env.MELHOR_ENVIO_SANDBOX === 'true';

  const apiURL = isSandbox
    ? 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate'
    : 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate';

  const body = {
    from: { postal_code: process.env.FROM_POSTAL_CODE || '01001000' },
    to: { postal_code: to },
    products: [
      {
        width: product.width,
        height: product.height,
        length: product.length,
        weight: product.weight,
        quantity: product.quantity,
      },
    ],
    options: {
      own_hand: false,
      receipt: false,
      insurance_value: product.price,
    },
    services: [],
  };

  try {
    const response = await axios.post(apiURL, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error('Erro ao calcular frete:', errorMessage);
    res.status(500).json({ error: 'Erro ao calcular frete', details: errorMessage });
  }
});

app.get('/', (req, res) => {
  res.send('API de Frete funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
