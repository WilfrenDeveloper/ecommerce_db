const request = require('supertest');
const app = require('../app.js');

let id;
let token;

test('GET /categories debe retornar todas las categorias', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe crear una categoría', async () => {
    const category = {
        name: "prueba"
    };
    const res = await request(app).post('/categories').send(category);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /categories/:id debe actualizar una categoría', async () => {
    const updateCategory = {
        name: "prueba actualizado"
    };
    const res = await request(app).put(`/categories/${id}`).send(updateCategory);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateCategory.name);
});

test('DELETE /categories/:id debe eliminar una categoría', async () => {
    const res = await request(app).delete(`/categories/${id}`);
    expect(res.status).toBe(204);
});