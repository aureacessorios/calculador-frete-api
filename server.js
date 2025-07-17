const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/frete', async (req, res) => {

app = Flask(__name__)

@app.route('/frete', methods=['POST'])
def calcular_frete():
    data = request.get_json()

    # Extraia os dados
    cep_origem = data.get('cep_origem')
    cep_destino = data.get('cep_destino')
    peso = data.get('peso')
    comprimento = data.get('comprimento')
    altura = data.get('altura')
    largura = data.get('largura')

    # Aqui você pode chamar o cálculo de frete real
    resultado = {
        "cep_origem": cep_origem,
        "cep_destino": cep_destino,
        "frete": 19.90  # valor fictício
    }

    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)


  
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
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao calcular frete' });
  }
});

app.get('/', (req, res) => {
  res.send('API de Frete funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
