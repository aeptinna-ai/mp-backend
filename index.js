const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-1402150561898771-122415-166211f3cad4f80d7d8bbeb6b85ccdbc-3091019609"
});

app.post("/crear-preferencia", async (req, res) => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: req.body.title,
            quantity: 1,
            unit_price: Number(req.body.price)
          }
        ],
        back_urls: {
          success: "https://tutienda.com/success",
          failure: "https://tutienda.com/failure"
        },
        auto_return: "approved"
      }
    });

    res.json({ id: result.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

app.listen(3000, () => {
  console.log("Backend Mercado Pago activo en puerto 3000");
});
