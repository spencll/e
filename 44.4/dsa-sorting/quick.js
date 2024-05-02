/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/
// makes left lower than pivot point 
// returns new index of pivot point 

function pivot(arr, start = 0, end = arr.length - 1) {
    console.log(arr)
    let pivotIndex = start;
    let pivotValue = arr[start];

    // arr[i] pointer
    for (let i = start + 1; i <= end; i++) {
        // Switch pivot with arr[i] if pivot greater
        if (arr[i] < pivotValue) {
            // Moving pivot index -> to maintain integrity of array
            pivotIndex++;
            // Swap arr[i] with arr[pivotIndex]
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        }
    }

     // Final swap to put pivot into updated position at pivotIndex
     [arr[start], arr[pivotIndex]] = [arr[pivotIndex], arr[start]];

    return pivotIndex;
}



/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      //index of where pivot ends up 
      let pivotIndex = pivot(arr, left, right);
    //sorting left of pivot   
      quickSort(arr, left, pivotIndex - 1);
    //sort right of pivot 
      quickSort(arr, pivotIndex + 1, right);
    }
    // Base case, left > right or basically, array is empty or has one element 
    return arr;
  }

module.exports = {pivot, quickSort}