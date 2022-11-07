import { body } from "express-validator";

class RopaValidator {
    checkCreateRopa() {
        return [
            body('name')
            .notEmpty()
            .withMessage('No se ha indicado el nombre de la prenda'),
            body('price')
            .notEmpty()
            .withMessage('No se ha indicado el precio de la prenda')
            .isFloat({ min: 0.1})
            .withMessage('El precio debe ser mayor que 0')
        ]
    }
}

export default new RopaValidator()