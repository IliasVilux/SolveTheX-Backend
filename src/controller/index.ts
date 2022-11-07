import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { RopaInstance } from '../model'

class RopaController {
    async create(req: Request, res: Response) {
        const id = uuidv4()
        try {
            const record = await RopaInstance.create({ ...req.body, id })
            return res.json({ record, msg: 'Ha funcionado, se ha creado' })
        } catch (e) {
            return res.json({ msg: 'No ha funcionado, no se ha creado', status: 500, route: '/create' })
        }
    }

    async read(req: Request, res: Response) {
        try{
            const records = await RopaInstance.findAll()
            return res.json(records)
        } catch(e){
            return res.json({msg:'No ha funcionado, no se han obtenido datos', status:500, route: '/create'})
        }
    }

    async update(req: Request, res: Response) {
        try{
            const { id } = req.params
            const { price } = req.body
            const record = await RopaInstance.findOne({ where: {id} })
            if(!record){
                return res.json({msg: `No ha funcionado, no se ha encontrado la prenda con el id ${id}`})
            }
            const updatedRecord = await record.update({ price: price })
            return res.json(updatedRecord)
        } catch(e){
            return res.json({msg:'No ha funcionado, no se han odificado los datos', status:500, route: '/update/:id'})
        }
    }

    async delete(req: Request, res: Response) {
        try{
            const { id } = req.params
            const record = await RopaInstance.findOne({ where: {id} })
            if(!record){
                return res.json({msg: `No ha funcionado, no se ha encontrado la prenda con el id ${id}`})
            }
            const deleteRecord = await record.destroy()
            return res.json({ record: deleteRecord })
        } catch(e){
            return res.json({msg:'No ha funcionado, no se ha eliminado el registro', status:500, route: '/delete/:id'})
        }
    }
}
export default new RopaController()