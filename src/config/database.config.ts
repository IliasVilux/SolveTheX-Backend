import { Sequelize } from "sequelize";

const db = new Sequelize('solvethex', 'root', 'toor', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

export default db