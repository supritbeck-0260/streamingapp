const express = require('express');
const router= express.Router();
const multer = require('multer');
const Audio = require('../Schema/audio');
//file upload 
const storage = multer.diskStorage({
    destination:'./public/media',
    filename : (req,file,cb)=>cb(null,file.originalname)
});
const upload = multer({ storage: storage }).array('file',10)


router.post('/audio',upload, async (req,res)=>{
    try {
        const {files} = req;
        const {host} = req.headers;
        const protocol = req.protocol + '://';
        const formatedAudioSchema = files.map(item=>(
            {
            name:item.filename,
            date:new Date(),
            path: `${protocol+host}/audio/stream?audio=${item.filename}`
            }
        ));
        const audio = await Audio.insertMany(formatedAudioSchema);
        if(audio) res.status(200).json({message:'Uploaded Successfully'});
        else  res.status(201).json({message:'Upload failed'});  
    } catch (error) {
       res.status(201).json({message:'Server Error'});
    }

})

module.exports = router;