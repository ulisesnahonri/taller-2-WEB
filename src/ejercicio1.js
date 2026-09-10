const express = require('express');
const app = express();
const port = 3000;

// La API recibe un monto mediante parámetros de la URL
app.get('/api/impuestos/:monto', (req, res) => {
    let montoIngresado = parseFloat(req.params.monto);

    // Validaciones: Si el salario no es numérico, es igual a 0, o es negativo
    if (isNaN(montoIngresado) || montoIngresado <= 0) {
        // Debe responder con el JSON de error exacto[cite: 2]
        return res.json({
            error: "El salario debe ser un número mayor a cero" //[cite: 2]
        });
    }

    // Cálculo de IVA (13%) y Renta (10%) para SV[cite: 2]
    let totalIva = montoIngresado * 0.13;
    let totalRenta = montoIngresado * 0.10;

    // Devolver los resultados en formato JSON[cite: 2]
    res.json({
        monto: montoIngresado,
        iva: totalIva,
        renta: totalRenta
    });
});

app.listen(port, () => {
    console.log("Ejercicio 1 corriendo en el puerto " + port);
});