const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');
//var CronJob = require('cron').CronJob;
const app = express()
const routes = require('./router/index')
const {swaggerDocs : swaggerDocsV1} = require("./router/swagger");
const PORT =  3000;//process.env.PORT || 5000;
const HOST = "0.0.0.0"//'https://intestinolimpio.ferringcloud1a.com/backend';
const presService = require("./services/PrescService")

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

/*
var job = new CronJob(
    '* 1/1 * * *',
    async function() {
        console.log('You will see this message every second');

        const result = await presService.GetToma();
        console.log(`results ${result}`)

        const datos = await result.data.rows;

        if(datos.length > 0){

            datos.forEach(async h => {
                console.log(`Hidratación ${h.phone} ${h.peso} ${h.estatus} ${h.mensaje}`)

                if(h.peso >= 28){

                    if(h.mensaje == '1' || h.mensaje == '2'){

                        await axios({
                            method: 'post',
                            url: `https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+52${h.phone}`,//'https://api.landbot.io/v1/customers/297652403/send_template/',
                            //responseType: 'json',
                            headers: {
                                'Authorization': 'Token 5046a0bf7add2c578e59ac8713fff7fe8300a589',
                                'Content-Type' : 'application/json'
                            }
                        });
                    }else if(h.mensaje == '3'){

                        await axios({
                            method: 'post',
                            url: `https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+52${h.phone}`,//'https://api.landbot.io/v1/customers/297652403/send_template/',
                            //responseType: 'json',
                            headers: {
                                'Authorization': 'Token 5046a0bf7add2c578e59ac8713fff7fe8300a589',
                                'Content-Type' : 'application/json'
                            }
                        });
                    }else{
                        console.log(`Mensaje inválido`)
                    }
                }
            });


        }else{
            console.log(`No hay notificaciones por enviar`)
        }
    },
    null,
    true,   
    'America/Mexico_City'
);*/


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors({origin:"*"}))
app.use("/node/api/v1", routes());

app.listen(PORT, () => {
    console.log(`Response from server node hm on host ${HOST} port `+PORT)
    swaggerDocsV1(app,PORT)
});