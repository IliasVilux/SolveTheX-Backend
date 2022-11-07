import express, { NextFunction, Request, Response } from 'express'
import RopaValidator from '../validator/index'
import { validationResult } from 'express-validator'
import RopaController from '../controller'
import jwt from 'jsonwebtoken'

const router = express.Router()
var userToken = null

router.post('/login', (req, res) => {
    const user = {id: 1}
    jwt.sign({user}, 'tokenAccess', (err, token) => {
        res.json({
            token
        })
    })
})

function verifyToken(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader?.split(" ")[1]
        userToken = bearerToken

        jwt.verify(userToken, 'tokenAccess', (err, data) => {
            if(err){
                res.sendStatus(403)
            } else { next() }
        })
    } else { res.sendStatus(403) }
}

router.get('/protected',
verifyToken,
(req, res) => {
    res.json({
        text: 'hola protected'
    })
})

router.post('/create',
verifyToken,
RopaValidator.checkCreateRopa(),
(req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(error)
    }
    next()
}, RopaController.create)

router.get('/get', RopaController.read)

router.put('/update/:id', verifyToken, RopaController.update)

router.delete('/delete/:id',
verifyToken,
(req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(error)
    }
    next()
}, RopaController.delete)

export default router