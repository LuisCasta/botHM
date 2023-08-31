const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./router/index')
const {swaggerDocs : swaggerDocsV1} = require("./router/swagger");
const PORT =  3000;//process.env.PORT || 5000;
const HOST = "0.0.0.0"//'https://intestinolimpio.ferringcloud1a.com/backend';

app.get('/node', function (req, res) {
    res.send('Bienvenidos hmApp')
})


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors({origin:"*"}))
app.use("/api/v1", routes());

app.listen(PORT, HOST, () => {
    console.log(`Response from server node hm on host ${HOST} port `+PORT)
    swaggerDocsV1(app,PORT)
});