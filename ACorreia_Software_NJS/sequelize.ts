// sequelize.ts

import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    database: 'PopCornOpinion',
    username: 'popcornuser',
    password: '1234',
    host: 'localhost', // Généralement 'localhost' si le serveur PostgreSQL est sur la même machine
    dialect: 'postgres', // Le dialecte de la base de données
});

export default sequelize;
