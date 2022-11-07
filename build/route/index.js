"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../validator/index"));
const express_validator_1 = require("express-validator");
const controller_1 = __importDefault(require("../controller"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
var userToken = null;
router.post('/login', (req, res) => {
    const user = { id: 1 };
    jsonwebtoken_1.default.sign({ user }, 'tokenAccess', (err, token) => {
        res.json({
            token
        });
    });
});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")[1];
        userToken = bearerToken;
        jsonwebtoken_1.default.verify(userToken, 'tokenAccess', (err, data) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                next();
            }
        });
    }
    else {
        res.sendStatus(403);
    }
}
router.get('/protected', (req, res) => {
    res.json({
        text: 'hola protected'
    });
});
router.post('/create', index_1.default.checkCreateRopa(), (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.json(error);
    }
    next();
}, controller_1.default.create);
router.get('/get', controller_1.default.read);
router.put('/update/:id', controller_1.default.update);
router.delete('/delete/:id', (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.json(error);
    }
    next();
}, controller_1.default.delete);
exports.default = router;
