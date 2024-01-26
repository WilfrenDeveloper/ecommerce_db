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

let id;

test('GET /productCarts debe retornar todos los productos del carrito', async () => {
    const res = await request(app).get('/productCarts').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /productCarts debe crear un producto del carrito', async () => {
    const newProductCart = {
        quantity: 5
    };
    const res = await request(app).post('/productCarts').send(newProductCart).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newProductCart.quantity);
    expect(res.body.id).toBeDefined();
});

test('PUT /productCarts/:id debe actualizar un producto del carrito', async () => {
    const updateProductCart = {
        quantity: 3
    };
    const res = await request(app).put(`/productCarts/${id}`).send(updateProductCart).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(updateProductCart.quantity);
});

test('DELETE /productCarts/:id debe eliminar un producto del carrito', async () => {
    const res = await request(app).delete(`/productCarts/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});