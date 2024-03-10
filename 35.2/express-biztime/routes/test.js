process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCompany;
let testInvoice;

beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO companies (code, name, description) VALUES ('dell', 'Dell Computer', 'yeah dell') RETURNING code, name, description`
  );
  testCompany = result.rows[0];

  const invoiceResult = await db.query(
    `INSERT INTO invoices (comp_code, amt, paid) VALUES ('dell', '1000', false ) RETURNING id, add_date, comp_code, amt, paid, paid_date`
  );
  testInvoice = invoiceResult.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM companies`);
  await db.query(`DELETE FROM invoices`);
  await db.query("SELECT setval('invoices_id_seq', 1, false)");
});

afterAll(async () => {
  await db.end();
});

describe("GET /companies", () => {
  test("Get a list with one company", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ companies: [testCompany] });
  });
});

describe("GET /companies/:code", () => {
  test("Gets a single company", async () => {
    const res = await request(app).get(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ company: testCompany });
  });
  test("Responds with 404 for invalid id", async () => {
    const res = await request(app).get(`/companies/0`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /companies", () => {
  test("Creates a single company", async () => {
    const res = await request(app)
      .post("/companies")
      .send({ code: "BillyBob", name: "staff", description: "yes" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      company: { code: "BillyBob", name: "staff", description: "yes" },
    });
  });
  //   Failure route, name taken already
  test("Creates a single company", async () => {
    const res = await request(app)
      .post("/companies")
      .send({ code: "BillyBob", name: "Dell Computer", description: "yes" });
    expect(res.statusCode).toBe(500);
  });
});

describe("PUT /companies/:code", () => {
  test("Updates a single company", async () => {
    const res = await request(app)
      .put(`/companies/${testCompany.code}`)
      .send({ name: "staff", description: "yes" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      company: { code: "dell", name: "staff", description: "yes" },
    });
  });
  test("Responds with 404 for invalid id", async () => {
    const res = await request(app)
      .put(`/companies/0`)
      .send({ name: "staff", description: "yes" });
    expect(res.statusCode).toBe(404);
  });
});
describe("DELETE /companies/:code", () => {
  test("Deletes a single company", async () => {
    const res = await request(app).delete(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ msg: "DELETED!" });
  });

  test("try to delete company not existing", async () => {
    const res = await request(app).delete(`/companies/nothing`);
    expect(res.statusCode).toBe(404);
  });
});

// Invoice testing

describe("GET /invoices", () => {
  test("Get a list with one invoice", async () => {
    const res = await request(app).get("/invoices");
    expect(res.statusCode).toBe(200);

    // response is converting date to string
    expect(res.body).toEqual({
      invoices: [
        {
          add_date: "2024-03-10T05:00:00.000Z",
          amt: 1000,
          comp_code: "dell",
          id: 1,
          paid: false,
          paid_date: null,
        },
      ],
    });
  });
});

describe("GET /invoices/:id", () => {
  test("Gets a single invoice", async () => {
    const res = await request(app).get(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      invoice: {
        add_date: "2024-03-10T05:00:00.000Z",
        amt: 1000,
        id: 1,
        paid: false,
        paid_date: null,
        company: {
          code: "dell",
          name: "Dell Computer",
          description: "yeah dell",
        },
      },
    });
  });
  test("Responds with 404 for invalid code", async () => {
    const res = await request(app).get(`/invoices/0`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /invoices", () => {
  test("Creates a single invoice", async () => {
    const res = await request(app)
      .post("/invoices")
      .send({ amt: 2000, comp_code: "dell" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      invoice: {
        add_date: "2024-03-10T05:00:00.000Z",
        amt: 2000,
        comp_code: "dell",
        id: 2,
        paid: false,
        paid_date: null,
      },
    });
  });
});

describe("PUT /invoices/:id", () => {
  test("Updates a single invoice", async () => {
    const res = await request(app)
      .put(`/invoices/${testInvoice.id}`)
      .send({ amt: 6969 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      invoice: {
        add_date: "2024-03-10T05:00:00.000Z",
        amt: 6969,
        comp_code: "dell",
        id: 1,
        paid: false,
        paid_date: null,
      },
    });
  });
  test("Responds with 404 for invalid id", async () => {
    const res = await request(app)
      .put(`/invoices/0`)
      .send({ name: "staff", description: "yes" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /invoices/:code", () => {
  test("Deletes a single invoice", async () => {
    const res = await request(app).delete(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ msg: "DELETED!" });
  });

  test("try to delete invoice not existing", async () => {
    const res = await request(app).delete(`/invoices/69`);
    expect(res.statusCode).toBe(404);
  });
});
