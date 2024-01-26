const request = require('supertest');
const app = require('../app.js');
require('../models')

let token;

beforeAll(async () => {
    const credentials = {
        email: "oscar@gmail.com",
        password: "oscar",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /purchases debe retornar todos las compras', async () => {
    const res = await request(app).get('/purchases').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /purchases debe crear una compra', async () => {
    const newPurchase = {
        quantity: 3
    };
    const res = await request(app).post('/purchases').send(newPurchase).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newPurchase.quantity);
    expect(res.body.id).toBeDefined();
});