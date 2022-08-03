// const express = require('express');
// const router = express.Router();
//const cawi = require('../controller/cawi.controller')
const security = require('../utils/security')

function verfiyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}

exports.authentication = (req,res,next)=>{
    //console.log(req.headers.token);
    try {
        let decryptToken = security.Decrypt(req.headers.token)
        // console.log(
        //     {
        //         Reqtoken : JSON.parse(decryptToken),
        //         ResTokenValues : security.validateToken2(JSON.parse(decryptToken))
        //     }
        // )
        //console.log(JSON.parse(decryptToken));
        if(security.validateToken(JSON.parse(decryptToken))){
            return true;
        }else{
            return false;
        }  
    } catch (error) {
        return false;
    }
}

function authentication_test(req,res,next){
    let decryptToken = security.Decrypt(req.headers.token)
    res.json(
        {
            Reqtoken : JSON.parse(decryptToken),
            ResTokenValues : security.validateToken2(JSON.parse(decryptToken))
        }
    );
}