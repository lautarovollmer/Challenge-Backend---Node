import app from './src/app';
require('dotenv').config();

const { conn } = require('./src/db')

const PORT = process.env.PORT || 3001;

conn.sync({force: true}).then(() => {
    app.listen(PORT, () => {
        console.log('Server listen at ' + PORT);
    });
})