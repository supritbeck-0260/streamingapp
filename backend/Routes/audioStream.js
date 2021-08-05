const express = require('express');
const router= express.Router();
const fs = require('fs');
const url = require('url');

router.get('/stream',(req,res)=>{
    const {range} = req.headers;
    const {audio} = url.parse(req.url,true).query;

    if(!range) return res.status(400).send('Requires range header');
    const filePath = `./public/media/${audio}`;
    const audioSize = fs.statSync(filePath).size;

    const CHUNK_SIZE =  10 ** 5 * 3;
    const start = Number(range?.replace(/\D/g,"") || 0);
    const end = Math.min(start + CHUNK_SIZE,audioSize - 1);
    const contentLenght = end - start + 1;
    const headers = {
        "Content-Range" : `bytes ${start}-${end}/${audioSize}`,
        "Accept-Ranges":"bytes",
        "Content-Length":contentLenght,
        "Content-Type":"video/mp4"
    }

    res.writeHead(206,headers)

    const audioStream = fs.createReadStream(filePath,{ start , end });
    audioStream.pipe(res)
})

module.exports = router;