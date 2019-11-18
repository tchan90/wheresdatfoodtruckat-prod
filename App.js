const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');
const helmet = require('helmet');

const app = express();
app.use(helmet())

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
require('./routes')(app)
//connect to dist folder
app.use(express.static(__dirname + '/public/'));
app.get(/.*/, (req,res)=>res.sendFile(__dirname + '/public/index.html'))

sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 8081)
    console.log(`Server start on port ${config.port}`)

})

