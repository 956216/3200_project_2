const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ ok: true });
});

app.listen(3000);
