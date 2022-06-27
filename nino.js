const express = require('express');
const app = express();
const port = 7878;
app.get('/', (req, res) => res.send('Nino is Alive!'));

app.listen(port, () => console.log(`Nino is listening to http://localhost:${port}`));