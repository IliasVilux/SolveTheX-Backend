import { DataTypes, Model } from "sequelize"
import db from '../config/database.config'

interface RopaAttributes {
    id: string,
    name: string,
    price: Float32Array
}

export class RopaInstance extends Model<RopaAttributes> {}

RopaInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: false,
    },
},
{
    sequelize: db,
    tableName: 'solvethex',
})