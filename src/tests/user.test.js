const request = require('supertest');
const app = require('../app.js');

let token;
let id;

test('POST /users debe crear un usuario', async () => {
    const user = {
        firstName: "Wilfren", 
        lastName: "Quintero", 
        email: "wilfren@gmail.com", 
        password: "wilfren", 
        phone: "3212041857"
    }
    const res = await request(app).post('/users').send(user);
    id =  res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login con credenciales correctas ', async () => {
    const credential = {
        email: "wilfren@gmail.com", 
        password: "wilfren",
    };
    const res = await request(app).post('/users/login').send(credential);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credential.email);
    expect(res.body.token).toBeDefined();
});

test('GET /users debe retornar todo los usuarios', async () => {
    const res = await request(app).get('/users').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const updateUser = {
        firstName: "Oscar"
    };
    const res = await request(app).put(`/users/${id}`).send(updateUser).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateUser.firstName);
});

test('POST /users/login con credenciales incorrectas ', async () => {
    const credential = {
        email: "credenciales incorrectas", 
        password: "aaaaaa",
    };
    const res = await request(app).post('/users/login').send(credential);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await request(app).delete(`/users/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});
