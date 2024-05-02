// Helper function to get the digit at a specific position (from right to left)
function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Helper function to count the number of digits in a number
function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// Helper function to determine the number of digits in the largest number in an array
function mostDigits(arr) {
    let maxDigits = 0;
    for (let num of arr) {
        maxDigits = Math.max(maxDigits, digitCount(num));
    }
    return maxDigits;
}

// Radix sort function
function radixSort(arr) {
    const maxDigits = mostDigits(arr);
    for (let k = 0; k < maxDigits; k++) {
        // Create 10 buckets (0-9)
        const buckets = Array.from({ length: 10 }, () => []);

        // Distribute numbers into buckets based on the current digit
        for (let num of arr) {
            buckets[getDigit(num, k)].push(num);
        }

        // Spread buckets back into original array 
        arr = [].concat(...buckets);
    }
    return arr;
}



module.exports = {radixSort, getDigit, digitCount, mostDigits}