const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("GET/cafes devuelve status 200, tipo de arreglo, no vacio", async () => {
        const response = await request(server).get("/cafes").send()
        const body = response.body
        const status = response.statusCode;

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBeGreaterThan(0)
    })


    it("DELETE/cafes/:id obtener codigo 404 al intentar eliminar un cafe con ID inexistente", async () => {
        const jwt = "token"
        const { statusCode } = await request(server)
            .delete("/cafes/6")
            .set("Authorization", jwt)
            .send()
        expect(statusCode).toBe(404)
    })

    it("POST/cafes agregar nuevo producto y devuelve codigo 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Cappuccino Vainilla" }
        const response = await request(server).post("/cafes").send(nuevoCafe)
        const body = response.body
        const status = response.statusCode;
        console.log(body)
        expect(body).toContainEqual(nuevoCafe)
        expect(status).toBe(201)
    })


    it("PUT/cafes status 400 al intentar actualizar con id diferente al id del payload", async () => {
        const idEntregado = "id entregado";
        const cafe = { id:"Id diferente al id de payload " , nombre: "Nuevo cafe" };
        const { statusCode } = await request(server)
            .put(`/cafes/${idEntregado}`)
            .send(cafe);
        expect(statusCode).toBe(400);
    })
});
