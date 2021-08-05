const express = require('express');
const router = express.Router();
const Audio = require('../Schema/audio');

router.get('/audio',async (req,res)=>{
    try {
        const getAudio = await Audio.find();
        if(getAudio.length) res.json({musics:getAudio,message:'Musics found.'})
        else res.status(201).json({musics:[],message:'Musics not found.'})  
    } catch (error) {
        res.status(201).json({musics:[],message:'Server Error'})
    }

})

module.exports = router;