const express = require('express');
const app = express();
const port = 3000;

function calcularImpuestos(pais, salario) {

    let iva;
    let renta = salario * 0.10;

    if (pais == 'elsalvador') {
        iva = salario * 0.13;
    }
    else if (pais == 'guatemala') {
        iva = salario * 0.12;
    }
    else if (pais == 'costarica') {
        iva = salario * 0.13;
    }
    else if (pais == 'honduras') {
        iva = salario * 0.15;
    }
    else if (pais == 'panama') {
        iva = salario * 0.07;
    }
    else if (pais == 'nicaragua') {
        iva = salario * 0.15;
    }
    else {
        throw new Error('País no permitido');
    }

    return {
        pais: pais,
        salarioBruto: salario,
        iva: iva,
        renta: renta,
        salarioNeto: salario - iva - renta
    };
}

app.get('/impuestos/:pais/:salario', (req, res) => {

    try {
        const pais = req.params.pais;
        const salario = Number(req.params.salario);

        const resultado = calcularImpuestos(pais, salario);

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