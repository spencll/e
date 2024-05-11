// add whatever parameters you deem necessary
function longestFall(arr) {
    // arr -> length of longest decrease order 
    // max tracker
    let max = 0
    // counter for count of descending numbers
    let counter =1 

    // Pointer: arr[i]
    for (let i=0;i<arr.length;i++){
        // Counter goes up 
        if (arr[i]>arr[i+1]) {
            counter++
        }
        // Counter resets, updates max
        else {
            max = Math.max(counter, max)
            counter = 1
        }
    }
    return max
}
