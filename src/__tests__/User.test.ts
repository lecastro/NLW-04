import { response } from 'express';
import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Users", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("testando a crianção de um novo user", async () => {
        const response = await request(app).post("/users").send({
            name: "User exemple",
            email: "exemple@hotmail.com"
        });

        expect(response.status).toBe(201);
    });

    it("verificando se email existe", async () => {
        const response = await request(app).post("/users").send({
            name: "User exemple",
            email: "exemple@hotmail.com"
        });

        expect(response.status).toBe(400);
    });
});