const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app.js');

const main = async () => {
    try {
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const newUser = {
            firstName: "Oscar",
            lastName: "Quintero",
            email: "oscar@gmail.com",
            password: "oscar",
            phone: "3212041857"
        }
        await request(app).post('/users').send(newUser);


        process.exit();
    } catch (error) {
        console.log(error);
    }
}

main();