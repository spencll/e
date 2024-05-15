// **Curried Add**

// Write a function called ***curriedAdd***. If you give this function a number, it returns a new function to you. If you give this function no arguments, it returns the total of all the numbers you’ve passed to it so far.

function curriedAdd(total) {
    // No numbers passed in function, sum is 0
    if (!total) return 0;
    // Returning new function that increments total if num provided. That new function returns the inner function 
    return function Inner(num) {
      if (!num) return total;
      total += num;
      return Inner;
    };
  }
  

module.exports = { curriedAdd };
