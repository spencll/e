function merge(arr1, arr2) {
    // Takes two sorted array and makes one sorted array

    // Base case, array emptied out, add rest of other array
    if (arr1.length === 0) return arr2;
    if (arr2.length === 0) return arr1;

        // Compare the first elements of the two arrays
        if (arr1[0] < arr2[0]) {
            // append smaller to result array, recurse without that first element and all of the other array. Continue spreading
            return [arr1[0], ...merge(arr1.slice(1), arr2)];

        } else {
           // append smaller to result array, recurse without that first element and all of the other array. Continue spreading
            return [arr2[0], ...merge(arr1, arr2.slice(1))];
        }
}

function mergeSort(arr) {

// Sorts one array using merging via binary search 
// Base case, arr has one element 
if (arr.length<=1) return arr
const mid = Math.floor(arr.length/2)
// 0 to mid
const left = mergeSort(arr.slice(0,mid))
// Mid onwards 
const right = mergeSort(arr.slice(mid))

return merge(left,right)

}

module.exports = { merge, mergeSort};