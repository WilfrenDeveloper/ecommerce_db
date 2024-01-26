const request = require('supertest');
const app = require('../app.js');
const Category = require('../models/Category.js');
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

test('GET /products debe retornar todos los productos', async () => {
    const res = await request(app).get('/products');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products debe crear un producto', async () => {
    const newCategory = await Category.create({
        name: "categoria"
    });
    console.log(newCategory.id);
    const newProduct = {
        title: "Samsung Galaxy s7",
        description : "telefono celular",
        brand: "Samsung",
        price: 500.20,
        categoryId: newCategory.id,
    };
    const res = await request(app).post('/products').send(newProduct).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
    await newCategory.destroy();
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
    expect(res.body.id).toBeDefined();
});

test('GET /products/:id debe retornar todos los productos', async () => {
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
});

test('PUT /products/:id debe actualizar un producto', async () => {
    const updateProduct = {
        title: "Samsung Galaxy s5",
    };
    const res = await request(app).put(`/products/${id}`).send(updateProduct).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updateProduct.title);
});

test('DELETE /products/:id debe eliminar un producto', async () => {
    const res = await request(app).delete(`/products/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});