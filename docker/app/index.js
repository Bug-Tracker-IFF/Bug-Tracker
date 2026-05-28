const express = require('express');

const app = express();

const PORT = 8080;

app.get("/", (req,res) => {
    res.send("Servidor em funcionamento dentro do Docker");
});

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});