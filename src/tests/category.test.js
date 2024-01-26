const request = require('supertest');
const app = require('../app.js');

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

test('GET /categories debe retornar todas las categorias', async () => {
    const res = await request(app).get('/categories');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe crear una categoría', async () => {
    const category = {
        name: "prueba"
    };
    const res = await request(app).post('/categories').send(category).set("Authorization", `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /categories/:id debe actualizar una categoría', async () => {
    const updateCategory = {
        name: "prueba actualizado"
    };
    const res = await request(app).put(`/categories/${id}`).send(updateCategory).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateCategory.name);
});

test('DELETE /categories/:id debe eliminar una categoría', async () => {
    const res = await request(app).delete(`/categories/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});