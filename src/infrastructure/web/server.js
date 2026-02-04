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
    console.log(req.body);

    const result = predict(
        plateNumber,
        date,
        time,
        parseInt(offenseCount || 0)
    );

    res.send(`
    <html>
    <body style="font-family: Arial; background:#f4f4f4; padding:40px;">
      <div style="background:white;padding:20px;border-radius:8px;max-width:400px;margin:auto">
        <h2>Result</h2>
        <p><strong>Can drive:</strong> ${result.canDrive}</p>
        <p><strong>Reason:</strong> ${result.message}</p>
        <p><strong>Penalty:</strong> ${result.penalty || "None"}</p>
        <a href="/">Back</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});