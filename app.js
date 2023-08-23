require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./router/index')
const {swaggerDocs : swaggerDocsV1} = require("./router/swagger")

//var CronJob = require('cron').CronJob;
const users = require('./services/UserService');




const PORT =  3000;//process.env.PORT || 5000;
const HOST = "127.0.0.1"//'https://intestinolimpio.ferringcloud1a.com/backend';

app.get('/', function (req, res) {
    res.send('Bienvenidos hmApp')
  })

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors({origin:"*"}))
app.use("/api/v1", routes());

/*var job = new CronJob(
  '10/10 * * * * *',
  async function() {
      console.log('You will see this message every second');
      await users.SendWhatsapp();
  },
  null,
  true,
  'America/Mexico_City'
);*/

console.log(`Job ${job}`)

app.listen(PORT, () => {
    console.log(`Response from server node hm on host ${HOST} port `+PORT)
    swaggerDocsV1(app,PORT)
});