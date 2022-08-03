require('dotenv').config()
const express = require('express');
const cors = require('cors');
const createHttpError = require('http-errors');
const res = require('express/lib/response');

//Convierte en json los valores de body
const bodyParser = require("body-parser");
const app = express();

//TOKEN CONTROLLER
const tokenController = require('./src/controller/token.controller');

//PRINCIPAL ROUTER
const principalRouter = require('./src/router/principal.router');

const estatus = process.env.ENVIROMENT

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

//token validation
app.use((req,res,next)=>{
    if(req.headers.token == undefined){
        res.json(
            {
                url:req.url,
                method: req.method,
                message:createHttpError(401).message + ' / token not found'
            }
        )
    }
    else{
        if(tokenController.authentication(req)){
            next();
        }else{
            res.json(
                {
                    url:req.url,
                    method: req.method,
                    message:createHttpError(401).message + ' / invalid token'
                }
            ) 
        }
    }
})

//Get Status
app.get(
    '/status',(req,res,next)=>{
        res.json({"app" : process.env.APP_NAME,"estatus" : estatus});
    }
)
//Router
app.use(`/${process.env.APP_NAME}`,principalRouter)
//If route does not exists, it will be enter here
app.use(function(req,res,next){
    let json_res = {
        url:req.url,
        method: req.method,
        message:createHttpError(404).message
    }
    res.json(json_res);
    //next()
    //next();
})


if(process.env.ENVIROMENT == 'DEV'){
    port = process.env.DEV_PORT
}else if(process.env.ENVIROMENT == 'PROD'){
    port = process.env.PROD_PORT
}

app.listen(
    port,() => {
        console.log(`application listening on port ${port}`);
        //console.log('Limit file size: '+limit);
    }
);