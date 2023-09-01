const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');

const app = express()
const routes = require('./router/index')
const {swaggerDocs : swaggerDocsV1} = require("./router/swagger");
const PORT =  3000;//process.env.PORT || 5000;
const HOST = "0.0.0.0"//'https://intestinolimpio.ferringcloud1a.com/backend';

app.get('/node', function (req, res) {
    res.send('Bienvenidos hmApp')
})

app.get('/node/test', async function (req, res) {

    const resultado2 = await axios({
        method: 'post',
        url: "https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+528714353747",//'https://api.landbot.io/v1/customers/297652403/send_template/',
        //responseType: 'json',
        headers: {
            'Authorization': 'Token 5046a0bf7add2c578e59ac8713fff7fe8300a589',
            'Content-Type' : 'application/json'
        }
    });

    if(resultado2.status == 200){
        res.send({estatus:"success"})
    }else{
        res.send({estatus:"error"})
    }
    
})



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors({origin:"*"}))
app.use("/node/api/v1", routes());

app.listen(PORT, HOST, () => {
    console.log(`Response from server node hm on host ${HOST} port `+PORT)
    swaggerDocsV1(app,PORT)
});