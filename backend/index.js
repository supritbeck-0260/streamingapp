const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const videoStream = require('./Routes/videoStream');
const audioStream = require('./Routes/audioStream');
const audioUpload = require('./Routes/audioUpload');
require('dotenv').config();
require('./Connection/index');
const getAudio = require('./Routes/audioGet');


app.use(cors());
app.use(bodyParser.json());

app.use('/',express.static( __dirname + '/public'));
app.use('/audio',audioStream);
app.use('/video',videoStream);
app.use('/upload',audioUpload);
app.use('/get',getAudio);

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log('Server running...'+PORT));