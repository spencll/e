// imports
const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();

// db import
const db = require("../db");

// Add ***routes/invoices.js***. All routes in this file should be prefixed by ***/invoices.***

// **GET /invoices :** Return info on invoices: like `{invoices: [{id, comp_code}, ...]}`

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({ invoices: results.rows });
  } catch (e) {
    return next(e);
  }
});

// **GET /invoices/[id] :** Returns obj on given invoice.
// If invoice cannot be found, returns 404. Returns `{invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}`

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query(
      "SELECT id, amt, paid, add_date, paid_date, code, name, description FROM invoices INNER JOIN companies ON invoices.comp_code=companies.code WHERE id = $1 ",
      [id]
    );

    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find user with id of ${id}`, 404);
    }
    const data = results.rows[0];
    const response = {
      invoice: {
        id: data.id,
        amt: data.amt,
        paid: data.paid,
        add_date: data.add_date,
        paid_date: data.paid_date,
        company: {
          code: data.code,
          name: data.name,
          description: data.description,
        },
      },
    };
    return res.send(response);
  } catch (e) {
    return next(e);
  }
});

// **POST /invoices :** Adds an invoice. Needs to be passed in JSON body of: `{comp_code, amt}`
// Returns: `{invoice: {id, comp_code, amt, paid, add_date, paid_date}}`

router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const results = await db.query(
      "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [comp_code, amt]
    );
    return res.status(201).json({ invoice: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

// **PUT /invoices/[id] :** Updates an invoice. If invoice cannot be found, returns a 404.
// Needs to be passed in a JSON body of `{amt}` Returns: `{invoice: {id, comp_code, amt, paid, add_date, paid_date}}`

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt, paid } = req.body;
    const invoice = await db.query(
      `SELECT paid
       FROM invoices
       WHERE id = $1`,
      [id]
    );

    let paidDate;
    const dayPaid = invoice.rows[0].paid_date;

    // Paid today
    if (!dayPaid && paid) {
      paidDate = new Date();
    } 
    // Not paid yet 
    else if (!paid) {
      paidDate = null
    } 
    // 
    else {
      paidDate = dayPaid;
    }

    if (results.rows.length === 0) {
      throw new ExpressError(`Can't update invoice with id of ${id}`, 404);
    }

    const results = await db.query(
      `UPDATE invoices
       SET amt=$1, paid=$2, paid_date=$3
       WHERE id=$4
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [amt, paid, paidDate, id]
    );

    return res.send({ invoice: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

// **DELETE /invoices/[id] :** Deletes an invoice.If invoice cannot be found, returns a 404. Returns: `{status: "deleted"}` Also, one route from the previous part should be updated:

router.delete("/:id", async (req, res, next) => {
  try {
    const results = await db.query("DELETE FROM invoices WHERE id = $1", [
      req.params.id,
    ]);
    if (results.rowCount === 0) {
      throw new ExpressError("Invoice not found", 404);
    }
    return res.send({ msg: "DELETED!" });
  } catch (e) {
    return next(e);
  }
});

// **GET /companies/[code] :** Return obj of company: `{company: {code, name, description, invoices: [id, ...]}}` If the company given cannot be found, this should return a 404 status response.

router.get("/inv/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results = await db.query("SELECT * FROM companies WHERE code = $1 ", [
      code,
    ]);
    // array
    const invResult = await db.query(
      `SELECT id
         FROM invoices
         WHERE comp_code = $1`,
      [code]
    );
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find company with code of ${code}`, 404);
    }
    const data = results.rows[0];
    return res.send({ company: data, invoices: invResult.rows });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
