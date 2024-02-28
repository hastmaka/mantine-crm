const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const fs = require('fs');
const path = require('path')
const http = require('http');
const https = require('https');
const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs','private.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs','certificate.crt')),
};

// Define a route to serve the auth file
/* app.get('/.well-known/pki-validation/1D20AEC25AD81B62ACE2AD7EE0D82F1E.txt', (req, res) => {
  // Set the path to your auth file
  const filePath = path.join(__dirname, 'certs', '1D20AEC25AD81B62ACE2AD7EE0D82F1E.txt');

  // Send the file as a response
  res.sendFile(filePath);
}); */

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: true,
    methods: "GET,PUT,POST,OPTIONS,DELETE",
    allowedHeaders: "Origin,X-Requested-With,Content-type,Accept,X-Access-Token,X-Key,cache-control,X-Voice-Token",
    credentials: true,
    maxAge: 3600
};
app.use(cors(corsOptions));

if (app.get('env') === 'development') {}

app.use(indexRoutes);

const serverHTTPS = https.createServer(options, app);
const serverHTTP = http.createServer(app);

serverHTTPS.listen(443, () => {
    console.log('Server running on https://localhost:443/');
});

/* serverHTTP.listen(80, () => {
  console.log('Server running on https://localhost:8080/');
}); */