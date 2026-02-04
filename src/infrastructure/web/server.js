const express = require('express');
const path = require('path');
const { predict } = require('../../application/picoPlacaService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "form.html"));
});

app.post('/check', (req, res) => {
    const { plateNumber, date, time, offenseCount } = req.body;

    const result = predict(
        plateNumber,
        date,
        time,
        parseInt(offenseCount || 0)
    );

    res.send(`
        <h2>result</h2>
        <pre>${JSON.stringify(result, null, 2)}</pre>
        <a href="/">Back</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});