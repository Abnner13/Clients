const express = require('express')
const router = express.Router()
const Client = require('../Domain/Client')

router.get('/Clients', (req, res) => {
    Client.findAll()
        .then(clients => {
            res.json(clients)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

router.get('/Clients/:Id', (req, res) => {
    var reqParams = req.params
    if(!reqParams){
        res.status(400)
        res.json({ error: "Missing Id" })
    }
    else {
        Client.findByPk(reqParams.Id)
            .then(client => {
                res.status(200)
                res.json(client)
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})

router.post('/Clients', (req, res) => {
    let requestBody = req.body
    if(!requestBody){
        res.status(400)
        res.json({ error: 'Bad Data' })
    }
    else {
        Client.create(requestBody)
            .then(() => {
                res.send('Client added successfully')
                console.log(requestBody)
            })
            .catch( err => {
                res.send(err)
            })
    }
})

router.put('/Clients/:Id', (req, res) => {
    /*Problema esta na requisiçao que nao muda os campos Created and Update*/

    let reqBody = req.body
    let reqParams = req.params

    if(!reqBody || !reqParams){
        res.status(400)
        res.json({error: 'Bad Data'})
    }
    else{
        Client.update(
            { firstName: reqBody.firstName },
            { returning: true, where: { id: reqParams.Id } } 
        )
        .then( ([rowsUpdate, [clientUpdate]]) => {
            res.json(clientUpdate)
        })
        .catch(err => {
            res.send('error:' + err)
        })
    }
})

router.delete('/Delete/:Id', (req, res) => {
    //Delete nao funciona

    let reqParams = req.params
    if(!reqParams) {
        res.status(400)
        res.json({ error: 'Bad Data'})
    }
    else {
        Client.destroy({ where: { id: reqParams.Id } })
            .then(() => {
                res.send('Client Delete Successfully')
            })
            .catch(err => {
                res.send('error: ' + err)
            }) 
    }
})

module.exports = router
