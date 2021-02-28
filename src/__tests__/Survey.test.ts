import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Surveys", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("testando a crianção de um novo surveys", async () => {
        const response = await request(app).post("/surveys").send({
            title: "title exemple",
            description: "test description",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("testando a show surveys", async () => {
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(1);
    });
});