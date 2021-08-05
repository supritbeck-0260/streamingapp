const express = require('express');
const router= express.Router();
const fs = require('fs');
const url = require('url');

router.get('/stream',(req,res)=>{
    const {range} = req.headers;
    const {video} = url.parse(req.url,true).query;

    if(!range) return res.status(400).send('Requires range header');
    const filePath = `./public/media/${video}`;
    const videoSize = fs.statSync(filePath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range?.replace(/\D/g,"") || 0);
    const end = Math.min(start + CHUNK_SIZE,videoSize - 1);
    const contentLenght = end - start + 1;
    const headers = {
        "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":"bytes",
        "Content-Length":contentLenght,
        "Content-Type":"video/mp4"
    }

    res.writeHead(206,headers)

    const videoStream = fs.createReadStream(filePath,{ start , end });
    videoStream.pipe(res)
})

module.exports = router;