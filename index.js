const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();


// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));



// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ycwr0tu.mongodb.net/?retryWrites=true&w=majority`;
const option =   { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))



// import routes
const authRouters = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const verifyToken = require('./routes/validate-token');



// route middlewares
app.use('/api/user', authRouters);
app.use('/api/admin', verifyToken, adminRoutes);

// app.get('/', (req, res) => {
//     res.json({
//         estado: true,
//         mensaje: 'funciona!'
//     })
// });

const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})