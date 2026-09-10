const express = require('express');
const app = express();
const port = 3000;

app.get('/api/impuestos/:monto', (req, res) => {
    let montoIngresado = parseFloat(req.params.monto);

    if (isNaN(montoIngresado) || montoIngresado <= 0) {
        return res.json({
            error: "El salario debe ser un número mayor a cero" 
        });
    }

    let totalIva = montoIngresado * 0.13;
    let totalRenta = montoIngresado * 0.10;

    res.json({
        monto: montoIngresado,
        iva: totalIva,
        renta: totalRenta
    });
});

app.listen(port, () => {
    console.log("Ejercicio 1 corriendo en el puerto " + port);
});