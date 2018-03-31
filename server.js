const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(`${__dirname}/dist`));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
});
app.listen(8181, () => {
    console.log('App listening on port 8181!');
});
module.exports = app;
