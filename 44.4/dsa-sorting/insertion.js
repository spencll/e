function insertionSort(arr) {

// result array starting with first arr element 
let resArr = [arr[0]]

// arr[i] is the pointer in unsorted
for (let i = 1;i<arr.length;i++){

    // resArr[j] is the pointer in sorted
for (let j=0;j<resArr.length;j++){
    // if arr[i] less than resArr[j]
    if (arr[i] < resArr[j]) {
        // insert arr[i] right before that element in the sorted array
        resArr.splice(j, 0, arr[i]);
        break; // Break out of the loop after insertion and move on to the next arr element 
    }
      // If we reach the end, then arr[i] is biggest, insert at end of resArr
      if (j === resArr.length-1) {
        resArr.push(arr[i]);
        break;
    }
    }
   
}
    
return resArr
}




module.exports = insertionSort;