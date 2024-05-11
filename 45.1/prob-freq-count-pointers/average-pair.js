// add whatever parameters you deem necessary
function averagePair(arr, avg) { 
    // Pointer 1: arr[left]
    let left= 0
    // Pointer 2: arr[right]
    let right = arr.length-1
    while (left<right){
        let tempAvg = (arr[left]+arr[right])/2
  
        if (tempAvg===avg) return true

        // Left pointer moves right to increase average 
        if (tempAvg<avg){
            left++;
        }
        // Right pointer moves left to decrease average 
        else {right--}
    }
    return false


}
