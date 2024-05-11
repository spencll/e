// add whatever parameters you deem necessary


function countPairs(arr, sum) {
// array of integers, number -> number of pairs that sum to numbers
const map = new Map()
let counter = 0
for (let num of arr){
    // map of {num=>needed pair, ...}
    map.set(num, sum-num)
    // If needed pair is not equal to original number and needed pair already a key, counter goes up
    if (num!==sum-num && map.has(sum-num)) counter ++
}
return counter

}
