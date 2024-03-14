process.env.NODE_ENV = "test";

const app = require("./app");
const db = require("./db");
const Book = require("./models/book");
const request = require("supertest");
const isbn = "0691161518";

beforeEach(async function () {
  await db.query("DELETE FROM books");
  await Book.create({
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: 2017,
  });
});

describe("Test Book class", function () {
  test("can find all books", async function () {
    let res = await Book.findAll();
    expect(res.length).toEqual(1);
  });

  test("can add book", async function () {
    let b = await Book.create({
      isbn: "isbn",
      amazon_url: "http://a.co/111111",
      author: "author",
      language: "language",
      pages: 1111,
      publisher: "publisher",
      title: "title",
      year: 2020,
    });
    expect(b.isbn).toBe("isbn");
  });

  test("can update book", async function () {
    let b = await Book.update(isbn, {
      amazon_url: "http://a.co/1111119",
      author: "author9",
      language: "language9",
      pages: 11119,
      publisher: "publisher9",
      title: "title9",
      year: 2019,
    });
    expect(b.year).toEqual(2019);
  });

  test("can delete book", async function () {
    await Book.remove("0691161518");
    let res = await Book.findAll();
    expect(res.length).toEqual(0);
  });
});

describe("Test Book routes", function () {
  test("GET /books", async function () {
    let response = await request(app).get("/books");
    let books = response.body.books;
    expect(response.statusCode).toEqual(200);
    expect(books).toHaveLength(1);
    expect(books[0]).toHaveProperty("isbn");
    expect(books[0]).toHaveProperty("amazon_url");
  });

  test("GET /books/:id", async function () {
    let response = await request(app).get(`/books/${isbn}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.book).toHaveProperty("isbn");
    expect(response.body.book.isbn).toEqual(isbn);
  });

  test("Fail finding book @GET /books/:id", async function () {
    const response = await request(app).get(`/books/999`);
    expect(response.statusCode).toBe(404);
  });

  test("POST /books/", async function () {
    let response = await request(app).post(`/books`).send({
      isbn: "12345678",
      amazon_url: "https://post.com",
      author: "post",
      language: "post",
      pages: 1234,
      publisher: "post",
      title: "post",
      year: 2018,
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body.book).toHaveProperty("isbn");
    expect(response.body.book.year).toEqual(2018);
  });

  test("Fail schema @POST /books/", async function () {
    const response = await request(app).post(`/books`).send({ year: "string" });
    expect(response.statusCode).toBe(400);
  });

  test("PUT /books/:isbn", async function () {
    const response = await request(app).put(`/books/${isbn}`).send({
      isbn: "12345678",
      amazon_url: "https://PUT.com",
      author: "PUT",
      language: "PUT",
      pages: 1234,
      publisher: "PUT",
      title: "PUT",
      year: 2018,
    });
    expect(response.body.book).toHaveProperty("isbn");
    expect(response.body.book.year).toEqual(2018);
  });

  test("Fail schema @PUT /books/:isbn", async function () {
    const response = await request(app).put(`/books/${isbn}`).send({
      isbn: "12345678",
      amazon_url: "https://PUT.com",
      author: "PUT",
      language: "PUT",
      pages: 1234,
      publisher: "PUT",
      title: "PUT",
      year: "2018",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Fail finding book @PUT /books/:isbn", async function () {
    const response = await request(app).put(`/books/69`).send({
      isbn: "12345678",
      amazon_url: "https://PUT.com",
      author: "PUT",
      language: "PUT",
      pages: 1234,
      publisher: "PUT",
      title: "PUT",
      year: 2018,
    });
    expect(response.statusCode).toBe(404);
  });

  test("DELETE /books/:id", async function () {
    const response = await request(app).delete(`/books/${isbn}`);
    expect(response.body).toEqual({ message: "Book deleted" });
  });

  test("Fail finding book @DELETE /books/:id", async function () {
    const response = await request(app).delete(`/books/69`);
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async function () {
  await db.end();
});
