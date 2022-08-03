const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.get('/',(req,res,next)=>{
    let index = {
        //EXAMPLE
        "endpoints" : [
            {
                "ruta" : '365',
                "description" : 'Dynamics 365 retail database querys',
                "subroutes" : [
                    {"ruta": 'products',"description": 'return all products'}
                ]
            },
            //{"ruta" : [RUTA],"description" : [DESCRIPCION]},
        ]
    }
    res.json(index)
    return index
})

module.exports = router