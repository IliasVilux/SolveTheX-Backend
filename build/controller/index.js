"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = require("../model");
class RopaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const record = yield model_1.RopaInstance.create(Object.assign(Object.assign({}, req.body), { id }));
                return res.json({ record, msg: 'Ha funcionado, se ha creado' });
            }
            catch (e) {
                return res.json({ msg: 'No ha funcionado, no se ha creado', status: 500, route: '/create' });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield model_1.RopaInstance.findAll();
                return res.json(records);
            }
            catch (e) {
                return res.json({ msg: 'No ha funcionado, no se han obtenido datos', status: 500, route: '/create' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { price } = req.body;
                const record = yield model_1.RopaInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: `No ha funcionado, no se ha encontrado la prenda con el id ${id}` });
                }
                const updatedRecord = yield record.update({ price: price });
                return res.json(updatedRecord);
            }
            catch (e) {
                return res.json({ msg: 'No ha funcionado, no se han odificado los datos', status: 500, route: '/update/:id' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.RopaInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: `No ha funcionado, no se ha encontrado la prenda con el id ${id}` });
                }
                const deleteRecord = yield record.destroy();
                return res.json({ record: deleteRecord });
            }
            catch (e) {
                return res.json({ msg: 'No ha funcionado, no se ha eliminado el registro', status: 500, route: '/delete/:id' });
            }
        });
    }
}
exports.default = new RopaController();
