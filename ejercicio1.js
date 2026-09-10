//ejercicio 1
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/impuestos/:monto', (req, res) => {
    const monto = parseFloat(req.params.monto);


    if (isNaN(monto) || monto <= 0) {
        // Responde con el mensaje de error exacto
        return res.status(400).json({
            error: "El salario debe ser un número mayor a cero" //[cite: 1]
        });
    }


    const iva = monto * 0.13;
    const renta = monto * 0.10;

    res.json({
        monto: monto,
        iva: iva,
        renta: renta
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
