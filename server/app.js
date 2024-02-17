const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
// const corsOptions = {
//     origin: true,
//     methods: "GET,PUT,POST,OPTIONS,DELETE",
//     allowedHeaders: "Origin,X-Requested-With,Content-type,Accept,X-Access-Token,X-Key,cache-control",
//     credentials: true,
//     maxAge: 3600
// };

//const cors = require('cors')(corsOptions);
app.use(cors());
// app.options('*', cors(corsOptions));


app.use(indexRoutes);

app.listen(3000, () => {
    console.log('Listen Port 3000')
})