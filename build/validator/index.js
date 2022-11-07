"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class RopaValidator {
    checkCreateRopa() {
        return [
            (0, express_validator_1.body)('name')
                .notEmpty()
                .withMessage('No se ha indicado el nombre de la prenda'),
            (0, express_validator_1.body)('price')
                .notEmpty()
                .withMessage('No se ha indicado el precio de la prenda')
                .isFloat({ min: 0.1 })
                .withMessage('El precio debe ser mayor que 0')
        ];
    }
}
exports.default = new RopaValidator();
