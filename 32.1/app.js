const express = require("express");
const ExpressError = require("./expressError")

const app = express();

app.get("/", (req, res) => {
  debugger;
  res.send("HOMEPAGE!");
});

// Each route takes a query key of nums which is a comma-separated list of numbers.
//  /mean?nums=1,3,5,7.
// query is nums

app.get("/mean", (req, res, next ) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }


  let str = req.query.nums.split(",");
  let nums = str.map((str) => parseInt(str));

  try {
    let sum = nums.reduce((a, c) => a + c, 0);
    if (!sum) throw new ExpressError('not all numbers',400)}

   catch (err){
      next(err)

   }  

  let mean = sum / nums.length;
  res.json({ operation: "mean", result: mean });
});

app.get("/median", (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }

  let str = req.query.nums.split(",");
  let nums = str.map((str) => parseInt(str));
  nums.sort((a, b) => a - b);
  try {
    nums.sort((a, b) => a - b);
    if (!nums) throw new ExpressError('not all numbers',400)}
    
   catch (err){
      next(err)

   }  

  let mid = Math.floor(nums.length / 2);
  let median;
  // Even
  if (nums.length % 2 === 0) {
    median = (nums[mid - 1] + nums[mid]) / 2;
  } else {
    median = nums[mid];
  }
  res.json({ operation: "median", result: median });
});

app.get("/mode", (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }

  let str = req.query.nums.split(",");
  let nums = str.map((str) => parseInt(str));

  // object storage
  let count = {};

  try {
      // counter, number is key, count[num] value increase by 1 if num shows up again
  nums.forEach((num) => {
    count[num] = (count[num] || 0) + 1;
  });

    if (!nums) throw new ExpressError('not all numbers',400)}
   catch (err){
      next(err)
   }  

  // values
  let counts = Object.values(count);
  let mode = nums[Math.max(...counts)];
  //Making values
  res.json({ operation: "mode", result: mode });
});

/** general error handler */

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });
  

// Specific error handler 
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
