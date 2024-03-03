
// Localize to test environment 
process.env.NODE_ENV = "test";

// Allows test requests 
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

// Set up

let spinach = { name: "spinach", price: 3.50 };

beforeEach(function () {
  items.push(spinach);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

// GET tests: status code, response, error handling

// POST tests: status code, response, error handling

// PATCH tests: status code, response, error handling

// DELETE tests, status code, response, error handling


describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [spinach] })
  })
})

describe("GET /items/:name", () => {
  test("Get item by name", async () => {
    const res = await request(app).get(`/items/${spinach.name}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(spinach)
  })
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/icecube`);
    expect(res.statusCode).toBe(404)
  })
})

describe("POST /items", () => {
  test("Creating a item", async () => {
    const res = await request(app).post("/items").send({ name: "onion", price: 1.50 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "onion", price: 1.50 } });
  })
  test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
  })
})

describe("/PATCH /items/:name", () => {
  test("Updating a item's name", async () => {
    const res = await request(app).patch(`/items/${spinach.name}`).send({ name: "pepper", price: 2.50 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "pepper", price: 2.50 } });
  })
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app).patch(`/items/Piggles`).send({ name: "Monster" });
    expect(res.statusCode).toBe(404);
  })
})

describe("/DELETE /items/:name", () => {
  test("Deleting a item", async () => {
    const res = await request(app).delete(`/items/${spinach.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
  })
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/hamface`);
    expect(res.statusCode).toBe(404);
  })
})

