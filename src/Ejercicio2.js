const express = require('express');
const app = express();
const port = 3000;

const tarifas = {
    elsalvador: 1.50,
    guatemala: 2.00,
    honduras: 2.25,
    nicaragua: 2.50,
    costarica: 3.00,
    panama: 3.50
};


function calcularEnvio(pais, peso) {

    if (!tarifas[pais]) {
        throw new Error('País no permitido');
    }

    const tarifa = tarifas[pais];
    const costoBase = peso * tarifa;

    let descuento = 0;
    let recargo = 0;

    if (peso > 20) {
        descuento = costoBase * 0.10;
    }

    if (peso < 1) {
        recargo = 5;
    }

    const total = costoBase - descuento + recargo;

    return {
        pais: pais,
        peso: peso,
        tarifaPorKg: tarifa,
        costoBase: costoBase,
        descuento: descuento,
        recargo: recargo,
        total: total
    };
}


app.get('/envio/:pais/:peso', (req, res) => {

    try {

        const pais = req.params.pais;
        const peso = Number(req.params.peso);

        const resultado = calcularEnvio(pais, peso);

        res.json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});