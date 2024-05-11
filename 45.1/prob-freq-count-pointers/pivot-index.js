// add whatever parameters you deem necessary
function pivotIndex(arr) {
    // arr -> returns index where sum left = sum right
    let lsum = 0
    // R sum starts as total sum
    let rsum = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
    // Pointer arr[i] 
    for (let i=0;i<arr.length;i++){
        // L sum calculation
        lsum = lsum + arr[i]
        // R sum already calculated, first index r sum is overall sum
        // Checks if sums equal
        if (lsum===rsum) return i 
        // Prepares rsum for next index
        rsum = rsum- arr[i]
    }
    return -1
}
